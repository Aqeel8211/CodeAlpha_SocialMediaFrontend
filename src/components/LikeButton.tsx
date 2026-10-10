import { useLikePost, useUnlikePost } from '../hooks/useLikes';

interface LikeButtonProps {
  postId: number;
  isLiked: boolean;
  likesCount: number;
}

const LikeButton = ({ postId, isLiked, likesCount }: LikeButtonProps) => {
  const likeMutation = useLikePost();
  const unlikeMutation = useUnlikePost();

  const handleClick = () => {
    if (isLiked) {
      unlikeMutation.mutate(postId);
    } else {
      likeMutation.mutate(postId);
    }
  };

  const isLoading = likeMutation.isPending || unlikeMutation.isPending;

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg transition ${
        isLiked
          ? 'text-red-500 hover:bg-red-50'
          : 'text-gray-500 hover:text-red-500 hover:bg-red-50'
      } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <span className="text-base">{isLiked ? '❤️' : '🤍'}</span>
      <span>{likesCount}</span>
    </button>
  );
};

export default LikeButton;