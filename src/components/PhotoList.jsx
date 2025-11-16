import React, { useState, useEffect, useCallback, useRef } from 'react';
import { fetchPhotos } from '../services/api';
import PhotoCard from './PhotoCard';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

/**
 * PhotoList component - Displays a grid of photos with infinite scroll
 */
const PhotoList = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  
  // Ref for the intersection observer
  const observerRef = useRef(null);
  const loadMoreRef = useRef(null);

  /**
   * Load photos from the API
   */
  const loadPhotos = useCallback(async (pageNumber) => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      setError(null);
      
      const newPhotos = await fetchPhotos(pageNumber, 30);
      
      if (newPhotos.length === 0) {
        setHasMore(false);
      } else {
        setPhotos(prev => [...prev, ...newPhotos]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore]);

  /**
   * Initial load
   * Only runs once to prevent duplicate API calls in StrictMode
   */
  useEffect(() => {
    let isMounted = true;
    
    if (isMounted && photos.length === 0) {
      loadPhotos(1);
    }
    
    return () => {
      isMounted = false;
    };
  }, []);

  /**
   * Set up intersection observer for infinite scroll
   */
  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          setPage(prev => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    observerRef.current = observer;
    observer.observe(loadMoreRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loading, hasMore]);

  /**
   * Load more photos when page changes
   */
  useEffect(() => {
    if (page > 1) {
      loadPhotos(page);
    }
  }, [page]);

  /**
   * Retry loading photos
   */
  const handleRetry = () => {
    setError(null);
    setPhotos([]);
    setPage(1);
    setHasMore(true);
    loadPhotos(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            📸 Photo Gallery
          </h1>
          <p className="text-gray-600 mt-1">
            Explore beautiful photos from Lorem Picsum
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error message */}
        {error && photos.length === 0 && (
          <ErrorMessage message={error} onRetry={handleRetry} />
        )}

        {/* Photo grid */}
        {photos.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {photos.map((photo) => (
              <PhotoCard key={`${photo.id}-${photo.author}`} photo={photo} />
            ))}
          </div>
        )}

        {/* Loading indicator for initial load */}
        {loading && photos.length === 0 && (
          <LoadingSpinner message="Loading photos..." />
        )}

        {/* Loading indicator for infinite scroll */}
        {loading && photos.length > 0 && (
          <div className="mt-8">
            <LoadingSpinner message="Loading more photos..." />
          </div>
        )}

        {/* Observer target for infinite scroll */}
        {hasMore && !loading && photos.length > 0 && (
          <div ref={loadMoreRef} className="h-20 flex items-center justify-center">
            <p className="text-gray-500 text-sm">Scroll for more...</p>
          </div>
        )}

        {/* End of list message */}
        {!hasMore && photos.length > 0 && (
          <div className="mt-8 text-center py-8">
            <p className="text-gray-600 font-semibold">
              🎉 You've reached the end!
            </p>
            <p className="text-gray-500 text-sm mt-2">
              No more photos to load
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default PhotoList;
