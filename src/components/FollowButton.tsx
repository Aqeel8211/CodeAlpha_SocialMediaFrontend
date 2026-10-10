import { useFollowUser, useUnfollowUser } from '../hooks/useFollow';

interface FollowButtonProps {
  userId: number;
  isFollowing: boolean;
}

const FollowButton = ({ userId, isFollowing }: FollowButtonProps) => {
  const followMutation = useFollowUser();
  const unfollowMutation = useUnfollowUser();

  const handleClick = () => {
    if (isFollowing) {
      unfollowMutation.mutate(userId);
    } else {
      followMutation.mutate(userId);
    }
  };

  const isLoading = followMutation.isPending || unfollowMutation.isPending;

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`px-4 py-1.5 rounded-full text-sm font-semibold transition ${
        isFollowing
          ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          : 'bg-blue-600 text-white hover:bg-blue-700'
      } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  );
};

export default FollowButton;