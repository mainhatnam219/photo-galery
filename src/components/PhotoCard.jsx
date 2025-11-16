import React from 'react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../services/api';

/**
 * PhotoCard component - Displays a single photo card with thumbnail and author
 */
const PhotoCard = ({ photo }) => {
  return (
    <Link 
      to={`/photos/${photo.id}`}
      className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="aspect-w-4 aspect-h-3 bg-gray-200 overflow-hidden">
        <img
          src={getImageUrl(photo.id, 400, 300)}
          alt={`Photo by ${photo.author}`}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <p className="text-sm font-semibold text-gray-800 truncate">
          📷 {photo.author}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {photo.width} × {photo.height}
        </p>
      </div>
    </Link>
  );
};

export default PhotoCard;
