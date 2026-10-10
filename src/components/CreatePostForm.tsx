import { useState } from 'react';
import type { FormEvent } from 'react';
import { useCreatePost } from '../hooks/usePosts';
import { useAuth } from '../hooks/useAuth';
import UserAvatar from './UserAvatar';

const CreatePostForm = () => {
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [showImageInput, setShowImageInput] = useState(false);
  const createPost = useCreatePost();
  const { user } = useAuth();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    createPost.mutate(
      {
        content: content.trim(),
        imageUrl: imageUrl.trim() || null,
      },
      {
        onSuccess: () => {
          setContent('');
          setImageUrl('');
          setShowImageInput(false);
        },
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-2xl p-3 sm:p-4 mb-4 sm:mb-5 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex gap-2 sm:gap-3">
        <div className="hidden xs:block sm:block flex-shrink-0">
          {user && <UserAvatar username={user.username} size="md" />}
        </div>

        <div className="flex-1 min-w-0">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            rows={3}
            maxLength={1000}
            className="w-full resize-none border-none focus:outline-none text-gray-800 placeholder-gray-400 text-sm sm:text-base leading-relaxed"
          />

          {showImageInput && (
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Paste image URL here..."
              className="w-full mt-2 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
          )}

          {imageUrl && (
            <div className="mt-2">
              <img
                src={imageUrl}
                alt="preview"
                className="rounded-lg max-h-64 w-full object-cover border border-gray-200"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          )}

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 gap-2">
            <button
              type="button"
              onClick={() => setShowImageInput(!showImageInput)}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-sm text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium"
            >
              <span>🖼️</span>
              <span className="hidden sm:inline">Image</span>
            </button>

            <button
              type="submit"
              disabled={!content.trim() || createPost.isPending}
              className="px-4 sm:px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold rounded-full hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              {createPost.isPending ? 'Posting...' : 'Post'}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreatePostForm;