import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchPhotoById } from '../services/api';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

/**
 * PhotoDetail component - Displays detailed view of a single photo
 */
const PhotoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetch photo details when component mounts or id changes
   */
  useEffect(() => {
    const loadPhotoDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchPhotoById(id);
        setPhoto(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPhotoDetails();
  }, [id]);

  /**
   * Retry loading photo details
   */
  const handleRetry = () => {
    setError(null);
    setLoading(true);
    fetchPhotoById(id)
      .then(data => {
        setPhoto(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner message="Loading photo details..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Link
            to="/photos"
            className="inline-flex items-center text-blue-500 hover:text-blue-600 mb-6"
          >
            ← Back to Gallery
          </Link>
          <ErrorMessage message={error} onRetry={handleRetry} />
        </div>
      </div>
    );
  }

  if (!photo) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header with back button */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/photos"
            className="inline-flex items-center text-blue-500 hover:text-blue-600 font-medium transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Gallery
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Photo image */}
          <div className="relative bg-gray-900">
            <img
              src={photo.download_url}
              alt={`Photo by ${photo.author}`}
              className="w-full h-auto max-h-[70vh] object-contain"
            />
          </div>

          {/* Photo details */}
          <div className="p-6 sm:p-8">
            <div className="space-y-4">
              {/* Title */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Photo #{photo.id}
                </h1>
                <p className="text-gray-500 text-sm">
                  Beautiful photography from Lorem Picsum
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center space-x-3 py-4 border-y border-gray-200">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {photo.author.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Photographer</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {photo.author}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="py-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Description
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  This stunning photograph captures a moment in time with exceptional composition 
                  and lighting. The image showcases the photographer's artistic vision and technical 
                  skill, making it a perfect addition to any collection.
                </p>
              </div>

              {/* Photo metadata */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-4 border-t border-gray-200">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Image ID</p>
                  <p className="text-lg font-semibold text-gray-900">#{photo.id}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Width</p>
                  <p className="text-lg font-semibold text-gray-900">{photo.width}px</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Height</p>
                  <p className="text-lg font-semibold text-gray-900">{photo.height}px</p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href={photo.download_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium shadow-md hover:shadow-lg"
                >
                  Download Original
                </a>
                {photo.url && (
                  <a
                    href={photo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                  >
                    View on Unsplash
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PhotoDetail;
