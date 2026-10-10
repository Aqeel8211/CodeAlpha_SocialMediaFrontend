import { useState } from 'react';
import { useFeed } from '../hooks/usePosts';
import CreatePostForm from '../components/CreatePostForm';
import PostCard from '../components/PostCard';

const PAGE_SIZE = 5;

const FeedPage = () => {
  const [page, setPage] = useState(1);
  const { data: posts, isLoading, isError } = useFeed(page, PAGE_SIZE);

  const hasMore = posts?.length === PAGE_SIZE;

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-gray-800">Home Feed</h1>
        <p className="text-sm text-gray-500">See what's happening right now</p>
      </div>

      <CreatePostForm />

      {isLoading && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-2xl p-4 animate-pulse"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                <div className="flex-1">
                  <div className="h-3 bg-gray-200 rounded w-24 mb-2"></div>
                  <div className="h-2 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
              <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      )}

      {isError && (
        <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-xl text-center">
          Failed to load posts. Please try again.
        </div>
      )}

      {posts && posts.length === 0 && page === 1 && (
        <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
          <div className="text-5xl mb-3">📝</div>
          <p className="text-gray-700 font-medium mb-1">No posts yet</p>
          <p className="text-sm text-gray-500">Be the first to share something!</p>
        </div>
      )}

      {posts && posts.map((post) => <PostCard key={post.id} post={post} />)}

      {hasMore && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-6 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-full hover:bg-gray-50 hover:border-gray-300"
          >
            Load More
          </button>
        </div>
      )}

      {posts && posts.length > 0 && !hasMore && (
        <p className="text-center text-sm text-gray-400 mt-4">
          You've reached the end.
        </p>
      )}
    </div>
  );
};

export default FeedPage;