import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Heart, Repeat2 } from 'lucide-react';
import { ArchivePost, ThemeConfig } from '../types/archive';

interface MasonryGridProps {
  posts: ArchivePost[];
  config: ThemeConfig;
  likedIds: Record<string, boolean>;
  rebloggedIds: Record<string, boolean>;
  onToggleLike: (postId: string) => void;
  onToggleReblog: (postId: string) => void;
  onSelectTag: (tag: string) => void;
  onOpenLightbox: (postId: string, photoIndex: number) => void;
}

function getColumnCount(width: number): number {
  if (width >= 1024) return 3;
  if (width >= 640) return 2;
  return 1;
}

function estimateAspectRatioWeight(post: ArchivePost): number {
  // Base vertical weight per photo in the card to balance columns smoothly before images measure
  return post.photos.length * 1.35 + 0.25;
}

export const MasonryGrid: React.FC<MasonryGridProps> = ({
  posts,
  config,
  likedIds,
  rebloggedIds,
  onToggleLike,
  onToggleReblog,
  onSelectTag,
  onOpenLightbox,
}) => {
  const [columnCount, setColumnCount] = useState<number>(() =>
    typeof window !== 'undefined' ? getColumnCount(window.innerWidth) : 3
  );
  const [measuredHeights, setMeasuredHeights] = useState<Record<string, number>>({});
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});
  const cardRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const handleResize = () => {
      setColumnCount(getColumnCount(window.innerWidth));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const measureAllCards = () => {
    const next: Record<string, number> = {};
    let changed = false;
    for (const post of posts) {
      const el = cardRefs.current[post.id];
      if (el) {
        const h = el.getBoundingClientRect().height;
        if (h > 0) {
          next[post.id] = h;
          if (Math.abs((measuredHeights[post.id] || 0) - h) > 2) {
            changed = true;
          }
        }
      }
    }
    if (changed) {
      setMeasuredHeights((prev) => ({ ...prev, ...next }));
    }
  };

  useEffect(() => {
    const raf = requestAnimationFrame(measureAllCards);
    return () => cancelAnimationFrame(raf);
  }, [posts, columnCount]);

  // Distribute posts left-to-right chronologically into shortest columns
  const distributedColumns = useMemo(() => {
    const cols: ArchivePost[][] = Array.from({ length: columnCount }, () => []);
    const colHeights = Array.from({ length: columnCount }, () => 0);

    posts.forEach((post) => {
      let shortestIdx = 0;
      for (let i = 1; i < columnCount; i++) {
        if (colHeights[i] < colHeights[shortestIdx]) {
          shortestIdx = i;
        }
      }
      cols[shortestIdx].push(post);
      const cardWeight = measuredHeights[post.id]
        ? measuredHeights[post.id] + 24
        : estimateAspectRatioWeight(post) * 320;
      colHeights[shortestIdx] += cardWeight;
    });

    return cols;
  }, [posts, columnCount, measuredHeights]);

  if (posts.length === 0) {
    return (
      <div
        className="py-20 text-center border"
        style={{
          borderColor: config.borderColor,
          backgroundColor: config.surfaceColor,
          color: config.mutedColor,
        }}
      >
        <p className="font-serif text-2xl mb-2" style={{ color: config.textColor }}>
          No archival plates filed under this index.
        </p>
        <button
          type="button"
          onClick={() => onSelectTag('all')}
          className="mt-3 text-xs underline underline-offset-4"
          style={{ color: config.textColor }}
        >
          Return to complete archive
        </button>
      </div>
    );
  }

  return (
    <div
      className="grid items-start gap-6"
      style={{
        gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
      }}
    >
      {distributedColumns.map((columnPosts, colIdx) => (
        <div key={colIdx} className="flex flex-col gap-6 min-w-0">
          {columnPosts.map((post) => {
            const isLiked = !!likedIds[post.id];
            const isReblogged = !!rebloggedIds[post.id];

            return (
              <article
                key={post.id}
                ref={(el) => {
                  cardRefs.current[post.id] = el;
                }}
                className="group flex flex-col border"
                style={{
                  backgroundColor: config.surfaceColor,
                  borderColor: config.borderColor,
                }}
              >
                <div className="relative" style={{ backgroundColor: config.backgroundColor }}>
                  {/* Ultra-minimal monochrome hover controls ({LikeButton} & {ReblogButton}) */}
                  <div
                    className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1 border px-2 py-1 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-180"
                    style={{
                      backgroundColor: 'rgba(250, 250, 250, 0.94)',
                      borderColor: config.borderColor,
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => onToggleLike(post.id)}
                      aria-label={isLiked ? 'Unlike plate' : 'Like plate'}
                      aria-pressed={isLiked}
                      title="Like"
                      className="p-1 transition-opacity duration-150 hover:opacity-70 focus-visible:outline focus-visible:outline-1"
                      style={{ color: config.textColor }}
                    >
                      <Heart
                        size={13}
                        strokeWidth={1.6}
                        fill={isLiked ? config.textColor : 'none'}
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() => onToggleReblog(post.id)}
                      aria-label={isReblogged ? 'Reblogged' : 'Reblog plate'}
                      aria-pressed={isReblogged}
                      title="Reblog"
                      className="p-1 transition-opacity duration-150 hover:opacity-70 focus-visible:outline focus-visible:outline-1"
                      style={{
                        color: config.textColor,
                        opacity: isReblogged ? 1 : 0.72,
                      }}
                    >
                      <Repeat2 size={14} strokeWidth={isReblogged ? 2.1 : 1.6} />
                    </button>
                  </div>

                  {/* Stacked Photoset / Single Photo preserving exact aspect ratio */}
                  <div className="flex flex-col gap-2">
                    {post.photos.map((photo, photoIdx) => {
                      const isBroken = !!brokenImages[photo.id];
                      return (
                        <button
                          key={photo.id}
                          type="button"
                          onClick={() => onOpenLightbox(post.id, photoIdx)}
                          className="block w-full p-0 border-0 bg-transparent text-left cursor-zoom-in focus-visible:outline focus-visible:outline-1"
                          aria-label={`Inspect ${post.firstLineCaption}${
                            post.photos.length > 1 ? ` (Plate ${photoIdx + 1} of ${post.photos.length})` : ''
                          }`}
                        >
                          {isBroken ? (
                            <div
                              className="flex flex-col items-center justify-center p-10 text-center border-b"
                              style={{
                                borderColor: config.borderColor,
                                backgroundColor: config.backgroundColor,
                                color: config.mutedColor,
                              }}
                            >
                              <span className="font-serif text-lg" style={{ color: config.textColor }}>
                                {post.firstLineCaption}
                              </span>
                              <span className="text-[11px] mt-1">{post.fullCaption.accessionId}</span>
                            </div>
                          ) : (
                            <img
                              src={photo.src}
                              alt={photo.alt}
                              referrerPolicy="no-referrer"
                              onLoad={measureAllCards}
                              onError={() =>
                                setBrokenImages((prev) => ({ ...prev, [photo.id]: true }))
                              }
                              className="w-full h-auto block"
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* First line of Caption + clickable #tags */}
                <div
                  className="px-4 pt-3.5 pb-4 border-t flex flex-col gap-2"
                  style={{ borderColor: config.borderColor }}
                >
                  <p
                    className="text-[12px] leading-snug m-0 truncate"
                    title={post.firstLineCaption}
                    style={{ color: config.textColor }}
                  >
                    {post.firstLineCaption}
                  </p>

                  {(config.showTagsOnGrid || config.showPostDates) && (
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px]">
                      {config.showTagsOnGrid && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-x-2.5 gap-y-1">
                          {post.tags.map((tag) => (
                            <button
                              key={tag}
                              type="button"
                              onClick={() => onSelectTag(tag)}
                              className="hover:underline underline-offset-2 text-left transition-colors duration-150"
                              style={{ color: config.mutedColor }}
                            >
                              #{tag}
                            </button>
                          ))}
                        </div>
                      )}
                      {config.showPostDates && (
                        <span
                          className="tabular-nums ml-auto"
                          style={{ color: config.mutedColor }}
                        >
                          {post.date}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      ))}
    </div>
  );
};
