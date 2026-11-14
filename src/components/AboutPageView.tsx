import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { ThemeConfig } from '../types/archive';

interface AboutPageViewProps {
  config: ThemeConfig;
  onReturnToGallery: () => void;
}

export const AboutPageView: React.FC<AboutPageViewProps> = ({
  config,
  onReturnToGallery,
}) => {
  return (
    <main className="max-w-3xl mx-auto">
      <button
        type="button"
        onClick={onReturnToGallery}
        className="inline-flex items-center gap-2 text-xs mb-6 pb-0.5 border-b border-transparent hover:border-current transition-colors duration-150"
        style={{ color: config.mutedColor }}
      >
        <ArrowLeft size={13} strokeWidth={1.6} />
        <span>Return to Archive</span>
      </button>

      <article
        className="border p-6 sm:p-10"
        style={{
          backgroundColor: config.surfaceColor,
          borderColor: config.borderColor,
          color: config.textColor,
        }}
      >
        <p className="text-[11px] mb-3" style={{ color: config.mutedColor }}>
          Custom Page · {config.aboutPageUrl}
        </p>
        <h1
          className="font-serif text-3xl sm:text-4xl font-medium leading-tight mb-6"
          style={{ textWrap: 'balance' }}
        >
          About {config.blogTitle}
        </h1>

        <div className="space-y-4 text-[13px] leading-relaxed max-w-[65ch]">
          <p>
            {config.blogTitle} is an independent digital cabinet dedicated to preserving
            out-of-print book covers, public domain botanical and celestial plates, and
            twentieth-century printed ephemera at their original proportions.
          </p>
          <p style={{ color: config.mutedColor }}>
            Every reproduction is cataloged with its earliest verifiable publication year,
            printer or foundry attribution, and physical medium. Images remain uncropped
            across the masonry index so tall monographs, broadsheets, and square
            architectural elevations preserve their authentic geometry.
          </p>
        </div>

        <dl
          className="mt-8 pt-6 border-t grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs"
          style={{ borderColor: config.borderColor }}
        >
          <div>
            <dt className="mb-1" style={{ color: config.mutedColor }}>
              Primary Classifications
            </dt>
            <dd>
              #{config.tag1} · #{config.tag2} · #{config.tag3}
            </dd>
          </div>
          <div>
            <dt className="mb-1" style={{ color: config.mutedColor }}>
              Tumblr Custom Page Setup
            </dt>
            <dd>
              Create a Tumblr Page at <span className="underline">{config.aboutPageUrl}</span> using
              Standard Layout to render this view natively.
            </dd>
          </div>
        </dl>
      </article>
    </main>
  );
};
