import { useState } from 'react';
import type { Comment } from '../types';
import { formatDate } from '../utils/formatDate';
import UserAvatar from './UserAvatar';
import { useDeleteComment, useUpdateComment } from '../hooks/useComments';
import { useAuth } from '../hooks/useAuth';

interface CommentListProps {
  postId: number;
  comments: Comment[];
}

const CommentList = ({ postId, comments }: CommentListProps) => {
  const { user } = useAuth();
  const deleteComment = useDeleteComment(postId);
  const updateComment = useUpdateComment(postId);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState('');

  const handleStartEdit = (comment: Comment) => {
    setEditingId(comment.id);
    setEditContent(comment.content);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditContent('');
  };

  const handleSaveEdit = (commentId: number) => {
    if (!editContent.trim()) return;
    updateComment.mutate(
      { id: commentId, data: { content: editContent.trim() } },
      { onSuccess: () => setEditingId(null) }
    );
  };

  const handleDelete = (commentId: number) => {
    if (window.confirm('Delete this comment?')) {
      deleteComment.mutate(commentId);
    }
  };

  if (comments.length === 0) {
    return (
      <p className="text-sm text-gray-500 text-center py-4">
        No comments yet. Be the first to comment!
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {comments.map((comment) => {
        const isOwner = user?.userId === comment.userId;
        const isEditing = editingId === comment.id;

        return (
          <div key={comment.id} className="flex gap-2 sm:gap-3">
            <div className="flex-shrink-0">
              <UserAvatar
                username={comment.username}
                profilePictureUrl={comment.profilePictureUrl}
                size="sm"
              />
            </div>

            <div className="flex-1 bg-gray-50 rounded-lg px-3 py-2 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold text-sm text-gray-800 truncate">
                  {comment.username}
                </span>
                <span className="text-xs text-gray-500 flex-shrink-0">
                  {formatDate(comment.createdAt)}
                </span>
              </div>

              {isEditing ? (
                <div className="mt-2">
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    rows={2}
                    maxLength={500}
                    className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 resize-none"
                  />
                  <div className="flex justify-end gap-2 mt-2">
                    <button
                      onClick={handleCancelEdit}
                      className="px-3 py-1 text-xs text-gray-600 border border-gray-200 rounded-md hover:bg-white"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSaveEdit(comment.id)}
                      disabled={!editContent.trim() || updateComment.isPending}
                      className="px-3 py-1 text-xs bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                      {updateComment.isPending ? 'Saving...' : 'Save'}
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-sm text-gray-700 mt-1 break-words">
                    {comment.content}
                  </p>

                  {isOwner && (
                    <div className="flex gap-3 mt-1">
                      <button
                        onClick={() => handleStartEdit(comment)}
                        className="text-xs text-blue-500 hover:text-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(comment.id)}
                        disabled={deleteComment.isPending}
                        className="text-xs text-red-500 hover:text-red-700 disabled:opacity-50"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CommentList;