import { useState } from 'react';
import type { FormEvent } from 'react';
import { useAddComment } from '../hooks/useComments';

interface CommentFormProps {
  postId: number;
}

const CommentForm = ({ postId }: CommentFormProps) => {
  const [content, setContent] = useState('');
  const addComment = useAddComment(postId);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    addComment.mutate(
      { content: content.trim() },
      {
        onSuccess: () => setContent(''),
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-3">
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a comment..."
        maxLength={500}
        className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-full focus:outline-none focus:border-blue-400"
      />
      <button
        type="submit"
        disabled={!content.trim() || addComment.isPending}
        className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {addComment.isPending ? '...' : 'Send'}
      </button>
    </form>
  );
};

export default CommentForm;