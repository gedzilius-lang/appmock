import React from 'react';
import { Article } from '../types';
import { THUMBNAIL_PATTERNS } from './Thumbnails';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const Thumbnail = THUMBNAIL_PATTERNS[article.id % THUMBNAIL_PATTERNS.length];
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden mb-4 group transition-shadow duration-300 hover:shadow-lg hover:shadow-purple-900/30 flex border border-gray-800">
      <div className="w-1/3 h-auto bg-black overflow-hidden flex-shrink-0">
         <Thumbnail className="w-full h-full object-cover text-purple-900 opacity-30 group-hover:opacity-50 transition-opacity" />
      </div>
      <div className="p-4 flex flex-col justify-between">
        <div>
            <p className="text-xs text-purple-400 font-semibold mb-1 uppercase">{article.source}</p>
            <h3 className="text-md font-bold text-white mb-2 group-hover:text-purple-400 transition-colors leading-tight">{article.title}</h3>
            <p className="text-gray-400 text-sm hidden sm:block">{article.excerpt}</p>
        </div>
        <a href="#" className="inline-block mt-2 text-white font-semibold text-sm hover:text-purple-500 transition-colors">
          Read More &rarr;
        </a>
      </div>
    </div>
  );
};

export default ArticleCard;
