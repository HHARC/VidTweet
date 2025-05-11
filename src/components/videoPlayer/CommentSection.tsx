import React, { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import Button from '../common/Button';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/api';

const CommentSection: React.FC = ({ comments, videoId }: any) => {
  const [commentText, setCommentText] = useState('');

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      try {
        await axios.post(`${API_BASE_URL}/comments/${videoId}`, { content: commentText });
        setCommentText('');
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }
  };

  return (
    <div className="comments-section">
      <h3 className="text-lg font-bold">
        <MessageSquare size={20} className="mr-2" />
        Comments ({comments.length})
      </h3>
      <form className="mb-6 flex gap-4" onSubmit={handleCommentSubmit}>
        <input
          type="text"
          placeholder="Add a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <Button type="submit" variant="primary">
          <Send size={16} className="mr-2" />
          Comment
        </Button>
      </form>

      <div>
        {comments.map((comment: any) => (
          <div key={comment._id} className="comment-item">
            <div>
              <p>{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
