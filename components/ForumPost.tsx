
import React from 'react';
import { ForumPost as ForumPostType } from '../types';

interface ForumPostProps {
  post: ForumPostType;
}

const ForumPost: React.FC<ForumPostProps> = ({ post }) => {
  return (
    <div className="bg-gray-900 p-4 rounded-lg mb-4 border border-gray-800">
      <div className="flex items-start">
        <img src={post.author.avatarUrl} alt={post.author.nickname} className="w-10 h-10 rounded-full mr-4 animate-pulse" />
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold text-white">{post.author.nickname}</p>
              <p className="text-xs text-gray-500">{post.timestamp}</p>
            </div>
          </div>
          <h4 className="font-bold text-purple-400 mt-2">{post.topic}</h4>
          <p className="text-gray-300 mt-1">{post.content}</p>
        </div>
      </div>
    </div>
  );
};

export default ForumPost;
