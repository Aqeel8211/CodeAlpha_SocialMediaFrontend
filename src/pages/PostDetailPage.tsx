import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { usePost, useDeletePost, useUpdatePost } from '../hooks/usePosts';
import { useComments } from '../hooks/useComments';
import { useAuth } from '../hooks/useAuth';
import UserAvatar from '../components/UserAvatar';
import LikeButton from '../components/LikeButton';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import { formatDate } from '../utils/formatDate';

const PostDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const postId = Number(id);
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: post, isLoading: postLoading, isError: postError } = usePost(postId);
  const { data: comments, isLoading: commentsLoading } = useComments(postId);

  const deletePost = useDeletePost();
  const updatePost = useUpdatePost();

  const [menuOpen, setMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState('');
  const [editImageUrl, setEditImageUrl] = useState('');

  const isOwner = user?.userId === post?.userId;

  const handleStartEdit = () => {
    if (!post) return;
    setMenuOpen(false);
    setEditContent(post.content);
    setEditImageUrl(post.imageUrl || '');
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSaveEdit = () => {
    if (!editContent.trim()) return;
    updatePost.mutate(
      {
        id: postId,
        data: {
          content: editContent.trim(),
          imageUrl: editImageUrl.trim() || null,
        },
      },
      {
        onSuccess: () => setIsEditing(false),
      }
    );
  };

  const handleDelete = () => {
    setMenuOpen(false);
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePost.mutate(postId, {
        onSuccess: () => navigate('/feed'),
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
      <Link
        to="/feed"
        className="text-sm text-blue-600 hover:underline mb-4 inline-block"
      >
        ← Back to feed
      </Link>

      {postLoading && (
        <div className="bg-white border border-gray-200 rounded-2xl p-4 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-3"></div>
          <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
        </div>
      )}

      {postError && (
        <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-xl text-center">
          Post not found.
        </div>
      )}

      {post && (
        <>
          <article className="bg-white border border-gray-200 rounded-2xl p-3 sm:p-4 mb-4 shadow-sm">
            {/* Header */}
            <div className="flex items-center gap-3 mb-3">
              <Link to={`/profile/${post.userId}`} className="flex-shrink-0">
                <UserAvatar
                  username={post.username}
                  profilePictureUrl={post.profilePictureUrl}
                  size="md"
                />
              </Link>
              <div className="flex-1 min-w-0">
                <Link
                  to={`/profile/${post.userId}`}
                  className="font-semibold text-gray-900 hover:text-blue-600 block truncate"
                >
                  {post.username}
                </Link>
                <p className="text-xs text-gray-500">{formatDate(post.createdAt)}</p>
              </div>

              {isOwner && !isEditing && (
                <div className="relative flex-shrink-0">
                  <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full"
                    aria-label="Post menu"
                  >
                    ⋯
                  </button>

                  {menuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setMenuOpen(false)}
                      ></div>
                      <div className="absolute right-0 top-full mt-1 w-36 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">
                        <button
                          onClick={handleStartEdit}
                          className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          Edit post
                        </button>
                        <button
                          onClick={handleDelete}
                          disabled={deletePost.isPending}
                          className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
                        >
                          {deletePost.isPending ? 'Deleting...' : 'Delete post'}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Body */}
            {isEditing ? (
              <div>
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  rows={4}
                  maxLength={1000}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 resize-none"
                />
                <input
                  type="text"
                  value={editImageUrl}
                  onChange={(e) => setEditImageUrl(e.target.value)}
                  placeholder="Image URL (optional)"
                  className="w-full mt-2 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
                {editImageUrl && (
                  <img
                    src={editImageUrl}
                    alt="preview"
                    className="mt-2 rounded-lg max-h-64 w-full object-cover border border-gray-200"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                )}
                <div className="flex justify-end gap-2 mt-3">
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 py-1.5 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    disabled={!editContent.trim() || updatePost.isPending}
                    className="px-4 py-1.5 text-sm bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50"
                  >
                    {updatePost.isPending ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="text-sm sm:text-base text-gray-800 mb-3 whitespace-pre-wrap leading-relaxed break-words">
                  {post.content}
                </p>

                {post.imageUrl && (
                  <div className="rounded-xl overflow-hidden mb-3 border border-gray-100">
                    <img
                      src={post.imageUrl}
                      alt="post"
                      className="w-full max-h-72 sm:max-h-96 object-cover"
                    />
                  </div>
                )}

                <div className="flex items-center gap-1 pt-2 border-t border-gray-100">
                  <LikeButton
                    postId={post.id}
                    isLiked={post.isLikedByCurrentUser}
                    likesCount={post.likesCount}
                  />
                  <span className="flex items-center gap-1.5 text-sm font-medium text-gray-500 px-3 py-1.5">
                    <span>💬</span>
                    <span>{post.commentsCount}</span>
                  </span>
                </div>
              </>
            )}
          </article>

          <div className="bg-white border border-gray-200 rounded-2xl p-3 sm:p-4 shadow-sm">
            <h2 className="font-semibold text-gray-800 mb-4 text-sm sm:text-base">
              Comments
            </h2>

            {commentsLoading ? (
              <p className="text-sm text-gray-500 text-center py-4">
                Loading comments...
              </p>
            ) : (
              <CommentList postId={postId} comments={comments || []} />
            )}

            <CommentForm postId={postId} />
          </div>
        </>
      )}
    </div>
  );
};

export default PostDetailPage;