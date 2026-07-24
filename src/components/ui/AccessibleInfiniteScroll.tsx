import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from './Button';

interface InfiniteScrollItem {
  id: string;
  content: React.ReactNode;
}

interface AccessibleInfiniteScrollProps {
  items: InfiniteScrollItem[];
  loadMore: () => Promise<InfiniteScrollItem[]>;
  hasMore: boolean;
  loading: boolean;
  error?: string;
  loadMoreThreshold?: number;
  enableManualLoad?: boolean;
  itemsPerPage?: number;
  className?: string;
  ariaLabel?: string;
}

export const AccessibleInfiniteScroll: React.FC<AccessibleInfiniteScrollProps> = ({
  items,
  loadMore,
  hasMore,
  loading,
  error,
  loadMoreThreshold = 200,
  enableManualLoad = true,
  itemsPerPage = 10,
  className = "",
  ariaLabel = "Content list"
}) => {
  const [visibleCount, setVisibleCount] = useState(itemsPerPage);
  const [autoLoadEnabled, setAutoLoadEnabled] = useState(false);
  const [announceText, setAnnounceText] = useState('');
  const displayedItems = items.slice(0, visibleCount);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const lastItemRef = useRef<HTMLDivElement>(null);

  // Handle manual load more
  const handleLoadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    try {
      const previousLength = displayedItems.length;
      const loadedItems = await loadMore();
      const loadedCount = loadedItems.length || itemsPerPage;
      setVisibleCount(prev => prev + loadedCount);
      
      // Announce to screen readers
      setAnnounceText(
        `Loaded ${loadedItems.length} more items. ${
          previousLength + loadedItems.length
        } items shown.`
      );
      
      // Focus management - move focus to first new item
      setTimeout(() => {
        const firstNewItem = containerRef.current?.children[
          previousLength
        ] as HTMLElement;
        if (firstNewItem) {
          firstNewItem.focus();
        }
      }, 100);
      
    } catch {
      setAnnounceText('Failed to load more items. Please try again.');
    }
  }, [loading, hasMore, loadMore, itemsPerPage, displayedItems.length]);

  // Auto-load functionality with intersection observer
  useEffect(() => {
    if (!autoLoadEnabled || !loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasMore && !loading) {
          handleLoadMore();
        }
      },
      {
        rootMargin: `${loadMoreThreshold}px`,
      }
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [autoLoadEnabled, hasMore, loading, handleLoadMore, loadMoreThreshold]);

  // Keyboard navigation
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'End' && event.ctrlKey) {
      event.preventDefault();
      lastItemRef.current?.focus();
    } else if (event.key === 'Home' && event.ctrlKey) {
      event.preventDefault();
      const firstItem = containerRef.current?.children[0] as HTMLElement;
      if (firstItem) {
        firstItem.focus();
      }
    }
  }, []);

  const toggleAutoLoad = () => {
    setAutoLoadEnabled(!autoLoadEnabled);
    setAnnounceText(
      autoLoadEnabled 
        ? 'Automatic loading disabled. Use the Load More button to load additional content.'
        : 'Automatic loading enabled. Content will load automatically as you scroll.'
    );
  };

  const retry = () => {
    setAnnounceText('Retrying to load content...');
    handleLoadMore();
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Screen reader announcements */}
      <div 
        className="sr-only" 
        aria-live="polite" 
        aria-atomic="true"
      >
        {announceText}
      </div>

      {/* Auto-load toggle */}
      <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
        <div>
          <h3 className="font-medium text-gray-900">Loading Preference</h3>
          <p className="text-sm text-gray-600">
            Choose how you want to load more content
          </p>
        </div>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={autoLoadEnabled}
              onChange={toggleAutoLoad}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            Auto-load on scroll
          </label>
        </div>
      </div>

      {/* Content list */}
      <div
        ref={containerRef}
        role="feed"
        aria-label={ariaLabel}
        aria-busy={loading}
        className="space-y-4"
        onKeyDown={handleKeyDown}
      >
        {displayedItems.map((item, index) => (
          <motion.div
            key={item.id}
            ref={index === displayedItems.length - 1 ? lastItemRef : undefined}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
            tabIndex={0}
            role="article"
            aria-posinset={index + 1}
            aria-setsize={hasMore ? -1 : items.length}
          >
            {item.content}
          </motion.div>
        ))}
      </div>

      {/* Load more section */}
      <div className="text-center space-y-4">
        {/* Intersection observer target */}
        <div ref={loadMoreRef} className="h-1" />

        {/* Loading state */}
        {loading && (
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Loading more content...</span>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-red-700 mb-2">
              <AlertCircle className="w-5 h-5" />
              <span className="font-medium">Failed to load content</span>
            </div>
            <p className="text-red-600 text-sm mb-3">{error}</p>
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<RefreshCw className="w-4 h-4" />}
              onClick={retry}
            >
              Try Again
            </Button>
          </div>
        )}

        {/* Manual load more button */}
        {enableManualLoad && hasMore && !loading && !error && (
          <div className="space-y-2">
            <Button
              variant="secondary"
              size="lg"
              onClick={handleLoadMore}
              disabled={loading}
              className="w-full sm:w-auto"
            >
              Load More Content
            </Button>
            <p className="text-sm text-gray-600">
              Showing {displayedItems.length} of {items.length} items
              {hasMore && ' (more available)'}
            </p>
          </div>
        )}

        {/* End of content */}
        {!hasMore && !loading && (
          <div className="text-gray-600 text-sm">
            <p>You've reached the end of the content.</p>
            <p>Showing all {displayedItems.length} items.</p>
          </div>
        )}
      </div>

      {/* Keyboard shortcuts help */}
      <div className="sr-only">
        Press Ctrl+Home to go to the first item, Ctrl+End to go to the last item.
        Use Tab to navigate between items.
      </div>
    </div>
  );
};
