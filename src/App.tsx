import { useMemo, useState } from 'react';
import { Code2, SlidersHorizontal } from 'lucide-react';
import { AboutPageView } from './components/AboutPageView';
import { ArchivalLightbox, LightboxSlide } from './components/ArchivalLightbox';
import { MasonryGrid } from './components/MasonryGrid';
import { ThemeCodeDrawer } from './components/ThemeCodeDrawer';
import { ARCHIVE_POSTS, DEFAULT_THEME_CONFIG } from './data/archivePosts';
import { ActiveRoute, ThemeConfig } from './types/archive';

const POSTS_PER_PAGE = 6;

export default function App() {
  const [config, setConfig] = useState<ThemeConfig>(DEFAULT_THEME_CONFIG);
  const [route, setRoute] = useState<ActiveRoute>('gallery');
  const [activeTag, setActiveTag] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [likedIds, setLikedIds] = useState<Record<string, boolean>>({});
  const [rebloggedIds, setRebloggedIds] = useState<Record<string, boolean>>({});
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [drawerState, setDrawerState] = useState<{
    isOpen: boolean;
    tab: 'customize' | 'code';
  }>({ isOpen: false, tab: 'code' });

  const filteredPosts = useMemo(() => {
    if (activeTag === 'all') return ARCHIVE_POSTS;
    const normalized = activeTag.toLowerCase();
    return ARCHIVE_POSTS.filter((post) =>
      post.tags.some((t) => t.toLowerCase() === normalized)
    );
  }, [activeTag]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);

  const visiblePosts = useMemo(() => {
    const start = (safePage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(start, start + POSTS_PER_PAGE);
  }, [filteredPosts, safePage]);

  const lightboxSlides: LightboxSlide[] = useMemo(() => {
    const slides: LightboxSlide[] = [];
    visiblePosts.forEach((post) => {
      post.photos.forEach((photo, photoIndex) => {
        slides.push({ post, photo, photoIndex });
      });
    });
    return slides;
  }, [visiblePosts]);

  const handleSelectTag = (tag: string) => {
    setRoute('gallery');
    setActiveTag(tag);
    setCurrentPage(1);
  };

  const handleOpenLightbox = (postId: string, photoIndex: number) => {
    const idx = lightboxSlides.findIndex(
      (s) => s.post.id === postId && s.photoIndex === photoIndex
    );
    if (idx !== -1) {
      setLightboxIndex(idx);
    }
  };

  const handleToggleLike = (postId: string) => {
    setLikedIds((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleToggleReblog = (postId: string) => {
    setRebloggedIds((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const filterTags = [config.tag1, config.tag2, config.tag3].filter(
    (t) => t.trim().length > 0
  );

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundColor: config.backgroundColor,
        color: config.textColor,
      }}
    >
      {/* Studio Utility Strip (separate from the Tumblr theme preview) */}
      <div className="border-b border-[#E5E5E5] bg-white text-[#141414]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4 text-[11px]">
          <span className="text-[#666666] whitespace-nowrap shrink-0">
            Live Tumblr Theme Preview
          </span>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setDrawerState({ isOpen: true, tab: 'customize' })}
              className="inline-flex items-center gap-1.5 border border-[#E5E5E5] bg-[#FAFAFA] px-3 py-1.5 hover:border-[#141414] transition-colors whitespace-nowrap shrink-0"
            >
              <SlidersHorizontal size={12} strokeWidth={1.6} />
              <span>Customize Sidebar</span>
            </button>
            <button
              type="button"
              onClick={() => setDrawerState({ isOpen: true, tab: 'code' })}
              className="inline-flex items-center gap-1.5 border border-[#141414] bg-[#141414] text-white px-3 py-1.5 hover:opacity-90 transition-opacity whitespace-nowrap shrink-0"
            >
              <Code2 size={12} strokeWidth={1.6} />
              <span>Get Tumblr HTML</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tumblr Archival Gallery Shell */}
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 pb-16 flex-1">
        {/* Static Archival Header (scrolls naturally with content) */}
        <header
          className="pt-9 mb-9 border-b"
          style={{ borderColor: config.borderColor }}
        >
          <div className="flex flex-wrap items-end justify-between gap-6 pb-6">
            <div className="max-w-xl">
              <a
                href="#/"
                onClick={(e) => {
                  e.preventDefault();
                  handleSelectTag('all');
                }}
                className="font-serif text-3xl sm:text-[42px] font-medium leading-[1.08] tracking-tight inline-block"
                style={{ color: config.textColor }}
              >
                {config.blogTitle}
              </a>
              {config.showDescription && config.blogDescription.trim().length > 0 && (
                <p
                  className="mt-2.5 text-xs leading-relaxed"
                  style={{ color: config.mutedColor }}
                >
                  {config.blogDescription}
                </p>
              )}
            </div>

            <nav
              aria-label="Primary Navigation"
              className="flex flex-wrap items-center gap-6 text-xs tracking-wide"
            >
              <a
                href="#/"
                onClick={(e) => {
                  e.preventDefault();
                  handleSelectTag('all');
                }}
                className="pb-0.5 border-b transition-colors duration-150 whitespace-nowrap shrink-0"
                style={{
                  color: route === 'gallery' ? config.textColor : config.mutedColor,
                  borderBottomColor:
                    route === 'gallery' ? config.textColor : 'transparent',
                }}
              >
                Archive
              </a>
              <a
                href={`#${config.aboutPageUrl}`}
                onClick={(e) => {
                  e.preventDefault();
                  setRoute('about');
                }}
                className="pb-0.5 border-b transition-colors duration-150 whitespace-nowrap shrink-0"
                style={{
                  color: route === 'about' ? config.textColor : config.mutedColor,
                  borderBottomColor:
                    route === 'about' ? config.textColor : 'transparent',
                }}
              >
                {config.aboutLinkLabel || 'About'}
              </a>
            </nav>
          </div>

          {/* Minimal Tag Filter Bar */}
          <div
            role="navigation"
            aria-label="Archive Tag Filters"
            className="flex flex-wrap items-center gap-5 border-t py-3.5 text-xs"
            style={{ borderColor: config.borderColor }}
          >
            <span style={{ color: config.mutedColor }}>Index:</span>
            <button
              type="button"
              onClick={() => handleSelectTag('all')}
              className="pb-0.5 border-b transition-colors duration-150 whitespace-nowrap shrink-0"
              style={{
                color:
                  route === 'gallery' && activeTag === 'all'
                    ? config.textColor
                    : config.mutedColor,
                borderBottomColor:
                  route === 'gallery' && activeTag === 'all'
                    ? config.textColor
                    : 'transparent',
              }}
            >
              All
            </button>
            {filterTags.map((tag) => {
              const isActive =
                route === 'gallery' &&
                activeTag.toLowerCase() === tag.toLowerCase();
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleSelectTag(tag)}
                  className="pb-0.5 border-b transition-colors duration-150 whitespace-nowrap shrink-0"
                  style={{
                    color: isActive ? config.textColor : config.mutedColor,
                    borderBottomColor: isActive ? config.textColor : 'transparent',
                  }}
                >
                  #{tag}
                </button>
              );
            })}
          </div>
        </header>

        {/* Active Route Content */}
        {route === 'about' ? (
          <AboutPageView
            config={config}
            onReturnToGallery={() => setRoute('gallery')}
          />
        ) : (
          <main>
            {activeTag !== 'all' && (
              <div
                className="flex items-baseline justify-between gap-4 pb-3.5 mb-7 border-b"
                style={{ borderColor: config.borderColor }}
              >
                <h1 className="font-serif text-2xl font-medium">
                  Filed under #{activeTag}
                </h1>
                <button
                  type="button"
                  onClick={() => handleSelectTag('all')}
                  className="text-xs underline underline-offset-4 whitespace-nowrap shrink-0"
                  style={{ color: config.mutedColor }}
                >
                  Clear filter
                </button>
              </div>
            )}

            <MasonryGrid
              posts={visiblePosts}
              config={config}
              likedIds={likedIds}
              rebloggedIds={rebloggedIds}
              onToggleLike={handleToggleLike}
              onToggleReblog={handleToggleReblog}
              onSelectTag={handleSelectTag}
              onOpenLightbox={handleOpenLightbox}
            />

            {/* Archival Pagination ({block:PreviousPage} & {block:NextPage}) */}
            <nav
              aria-label="Pagination"
              className="mt-12 pt-6 border-t flex items-center justify-between text-xs tabular-nums"
              style={{ borderColor: config.borderColor }}
            >
              <div>
                {safePage > 1 ? (
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentPage((p) => Math.max(1, p - 1));
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="border px-3.5 py-2 transition-colors duration-150"
                    style={{
                      borderColor: config.borderColor,
                      backgroundColor: config.surfaceColor,
                      color: config.textColor,
                    }}
                  >
                    &larr; Previous
                  </button>
                ) : (
                  <span
                    className="inline-block border px-3.5 py-2 opacity-40"
                    style={{
                      borderColor: config.borderColor,
                      color: config.mutedColor,
                    }}
                  >
                    &larr; Previous
                  </span>
                )}
              </div>

              <span style={{ color: config.mutedColor }}>
                Page {String(safePage).padStart(2, '0')} of{' '}
                {String(totalPages).padStart(2, '0')}
              </span>

              <div>
                {safePage < totalPages ? (
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentPage((p) => Math.min(totalPages, p + 1));
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="border px-3.5 py-2 transition-colors duration-150"
                    style={{
                      borderColor: config.borderColor,
                      backgroundColor: config.surfaceColor,
                      color: config.textColor,
                    }}
                  >
                    Next &rarr;
                  </button>
                ) : (
                  <span
                    className="inline-block border px-3.5 py-2 opacity-40"
                    style={{
                      borderColor: config.borderColor,
                      color: config.mutedColor,
                    }}
                  >
                    Next &rarr;
                  </span>
                )}
              </div>
            </nav>
          </main>
        )}

        <footer
          className="mt-14 pt-5 border-t flex flex-wrap items-center justify-between gap-3 text-[11px]"
          style={{
            borderColor: config.borderColor,
            color: config.mutedColor,
          }}
        >
          <span>{config.blogTitle} — Archival Collection</span>
          <span>Public Domain &amp; Historical Print</span>
        </footer>
      </div>

      {/* Full-Screen Bright-White Archival Lightbox */}
      <ArchivalLightbox
        slides={lightboxSlides}
        activeIndex={lightboxIndex}
        config={config}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(nextIdx) => setLightboxIndex(nextIdx)}
        onSelectTag={handleSelectTag}
      />

      {/* Slide-Over Tumblr Theme Code & Customize Drawer */}
      <ThemeCodeDrawer
        isOpen={drawerState.isOpen}
        initialTab={drawerState.tab}
        config={config}
        onChangeConfig={setConfig}
        onClose={() => setDrawerState((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
