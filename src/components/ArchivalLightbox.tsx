import React, { useEffect } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { ArchivePhoto, ArchivePost, ThemeConfig } from '../types/archive';

export interface LightboxSlide {
  post: ArchivePost;
  photo: ArchivePhoto;
  photoIndex: number;
}

interface ArchivalLightboxProps {
  slides: LightboxSlide[];
  activeIndex: number | null;
  config: ThemeConfig;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
  onSelectTag: (tag: string) => void;
}

export const ArchivalLightbox: React.FC<ArchivalLightboxProps> = ({
  slides,
  activeIndex,
  config,
  onClose,
  onNavigate,
  onSelectTag,
}) => {
  const isOpen = activeIndex !== null && slides[activeIndex] !== undefined;

  useEffect(() => {
    if (!isOpen || activeIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        onNavigate((activeIndex - 1 + slides.length) % slides.length);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        onNavigate((activeIndex + 1) % slides.length);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, activeIndex, slides.length, onClose, onNavigate]);

  if (!isOpen || activeIndex === null) return null;

  const current = slides[activeIndex];
  const { post, photo, photoIndex } = current;
  const counterLabel = `${String(activeIndex + 1).padStart(2, '0')} / ${String(
    slides.length
  ).padStart(2, '0')}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Archival inspection: ${post.fullCaption.title}`}
      className="fixed inset-0 z-50 flex flex-col p-4 sm:p-6"
      style={{
        backgroundColor: 'rgba(250, 250, 250, 0.96)',
        color: config.textColor,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Top Bar */}
      <div
        className="flex items-center justify-between pb-4 border-b text-xs shrink-0"
        style={{ borderColor: config.borderColor }}
      >
        <div className="flex items-center gap-4 tabular-nums">
          <span>{counterLabel}</span>
          <span style={{ color: config.mutedColor }}>
            {post.fullCaption.accessionId}
            {post.photos.length > 1
              ? ` · Plate ${photoIndex + 1} of ${post.photos.length}`
              : ''}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNavigate((activeIndex - 1 + slides.length) % slides.length)}
            className="inline-flex items-center gap-1.5 border px-3 py-1.5 text-xs transition-colors duration-150 whitespace-nowrap"
            style={{
              borderColor: config.borderColor,
              backgroundColor: config.surfaceColor,
              color: config.textColor,
            }}
            aria-label="Previous plate"
          >
            <ArrowLeft size={13} strokeWidth={1.6} />
            <span>Prev</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate((activeIndex + 1) % slides.length)}
            className="inline-flex items-center gap-1.5 border px-3 py-1.5 text-xs transition-colors duration-150 whitespace-nowrap"
            style={{
              borderColor: config.borderColor,
              backgroundColor: config.surfaceColor,
              color: config.textColor,
            }}
            aria-label="Next plate"
          >
            <span>Next</span>
            <ArrowRight size={13} strokeWidth={1.6} />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 border px-3 py-1.5 text-xs transition-colors duration-150 whitespace-nowrap"
            style={{
              borderColor: config.textColor,
              backgroundColor: config.textColor,
              color: config.surfaceColor,
            }}
            aria-label="Close lightbox"
          >
            <X size={13} strokeWidth={1.6} />
            <span>Close</span>
          </button>
        </div>
      </div>

      {/* Main Stage */}
      <div
        className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-6 lg:gap-10 pt-6 items-center overflow-y-auto lg:overflow-hidden"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <div className="flex items-center justify-center h-full min-h-0">
          <img
            src={photo.src}
            alt={photo.alt}
            referrerPolicy="no-referrer"
            className="max-w-full max-h-[58vh] lg:max-h-[calc(100vh-148px)] w-auto h-auto object-contain border"
            style={{ borderColor: config.borderColor }}
          />
        </div>

        {/* Full Archival Caption Metadata */}
        <aside
          className="lg:h-full lg:overflow-y-auto lg:border-l lg:pl-8 border-t lg:border-t-0 pt-5 lg:pt-0 flex flex-col justify-center gap-5"
          style={{ borderColor: config.borderColor }}
        >
          <div>
            {photo.plateLabel && (
              <p className="text-[11px] mb-2" style={{ color: config.mutedColor }}>
                {photo.plateLabel}
              </p>
            )}
            <h2
              className="font-serif text-2xl sm:text-3xl font-medium leading-snug"
              style={{ color: config.textColor, textWrap: 'balance' }}
            >
              {post.fullCaption.title}
            </h2>
          </div>

          <dl
            className="border-t border-b divide-y text-xs"
            style={{ borderColor: config.borderColor }}
          >
            <div
              className="py-2.5 flex justify-between gap-4"
              style={{ borderColor: config.borderColor }}
            >
              <dt style={{ color: config.mutedColor }}>Creator</dt>
              <dd className="text-right">{post.fullCaption.creator}</dd>
            </div>
            <div
              className="py-2.5 flex justify-between gap-4"
              style={{ borderColor: config.borderColor }}
            >
              <dt style={{ color: config.mutedColor }}>Publisher</dt>
              <dd className="text-right">{post.fullCaption.publisherOrOrigin}</dd>
            </div>
            <div
              className="py-2.5 flex justify-between gap-4 tabular-nums"
              style={{ borderColor: config.borderColor }}
            >
              <dt style={{ color: config.mutedColor }}>Date</dt>
              <dd className="text-right">{post.fullCaption.year}</dd>
            </div>
            <div
              className="py-2.5 flex justify-between gap-4"
              style={{ borderColor: config.borderColor }}
            >
              <dt style={{ color: config.mutedColor }}>Medium</dt>
              <dd className="text-right">{post.fullCaption.medium}</dd>
            </div>
          </dl>

          <p className="text-xs leading-relaxed" style={{ color: config.mutedColor }}>
            {post.fullCaption.notes}
          </p>

          <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-[11px]">
            {post.tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  onSelectTag(tag);
                  onClose();
                }}
                className="hover:underline underline-offset-2"
                style={{ color: config.mutedColor }}
              >
                #{tag}
              </button>
            ))}
          </div>

          <p className="text-[11px] tabular-nums" style={{ color: config.mutedColor }}>
            Cataloged {post.date} · Arrow keys to step · Esc to close
          </p>
        </aside>
      </div>
    </div>
  );
};
