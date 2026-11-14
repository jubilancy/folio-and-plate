import React, { useMemo, useState } from 'react';
import { Check, Copy, Download, RotateCcw, X } from 'lucide-react';
import { DEFAULT_THEME_CONFIG } from '../data/archivePosts';
import { generateTumblrThemeHtml } from '../data/tumblrThemeTemplate';
import { ThemeConfig } from '../types/archive';

interface ThemeCodeDrawerProps {
  isOpen: boolean;
  initialTab: 'customize' | 'code';
  config: ThemeConfig;
  onChangeConfig: (next: ThemeConfig) => void;
  onClose: () => void;
}

export const ThemeCodeDrawer: React.FC<ThemeCodeDrawerProps> = ({
  isOpen,
  initialTab,
  config,
  onChangeConfig,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'customize' | 'code'>(initialTab);
  const [copied, setCopied] = useState(false);

  React.useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab, isOpen]);

  const themeHtml = useMemo(() => generateTumblrThemeHtml(config), [config]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(themeHtml);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback textarea copy if clipboard API is restricted
      const textarea = document.createElement('textarea');
      textarea.value = themeHtml;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([themeHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tumblr-archival-gallery-theme.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const updateField = <K extends keyof ThemeConfig>(key: K, value: ThemeConfig[K]) => {
    onChangeConfig({ ...config, [key]: value });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      style={{ backgroundColor: 'rgba(20, 20, 20, 0.25)' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Tumblr Theme Customize and HTML Export"
        className="w-full max-w-2xl h-full bg-[#FAFAFA] text-[#141414] border-l border-[#E5E5E5] flex flex-col"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E5E5] bg-white">
          <div>
            <h2 className="font-serif text-2xl font-medium leading-none">
              Tumblr Theme Studio
            </h2>
            <p className="text-[11px] text-[#666666] mt-1">
              Customize theme variables or copy the single-file Tumblr HTML
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="border border-[#E5E5E5] p-2 hover:border-[#141414] transition-colors"
            aria-label="Close drawer"
          >
            <X size={15} strokeWidth={1.6} />
          </button>
        </div>

        {/* Mode Tabs */}
        <div className="flex items-center justify-between px-6 border-b border-[#E5E5E5] bg-[#FAFAFA]">
          <div className="flex items-center gap-6 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('code')}
              className={`py-3 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'code'
                  ? 'border-[#141414] text-[#141414] font-medium'
                  : 'border-transparent text-[#666666] hover:text-[#141414]'
              }`}
            >
              Tumblr Theme HTML
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('customize')}
              className={`py-3 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'customize'
                  ? 'border-[#141414] text-[#141414] font-medium'
                  : 'border-transparent text-[#666666] hover:text-[#141414]'
              }`}
            >
              Customize Sidebar Preview
            </button>
          </div>

          {activeTab === 'customize' && (
            <button
              type="button"
              onClick={() => onChangeConfig(DEFAULT_THEME_CONFIG)}
              className="inline-flex items-center gap-1.5 text-[11px] text-[#666666] hover:text-[#141414]"
            >
              <RotateCcw size={12} />
              <span>Reset defaults</span>
            </button>
          )}
        </div>

        {/* Body */}
        {activeTab === 'code' ? (
          <div className="flex-1 min-h-0 flex flex-col p-6 gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-[11px] text-[#666666]">
                Paste directly into Tumblr &rarr; Customize &rarr; Edit HTML. Supports
                Photo, Photoset, modern NPF Text-image, Quote, Link, Video, Audio,
                Chat, and Answer posts.
              </p>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleDownload}
                  className="inline-flex items-center gap-1.5 border border-[#E5E5E5] bg-white px-3 py-2 text-xs hover:border-[#141414] transition-colors whitespace-nowrap"
                >
                  <Download size={13} />
                  <span>Download .html</span>
                </button>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 border border-[#141414] bg-[#141414] text-white px-3.5 py-2 text-xs hover:opacity-90 transition-opacity whitespace-nowrap"
                >
                  {copied ? <Check size={13} /> : <Copy size={13} />}
                  <span>{copied ? 'Copied HTML' : 'Copy Theme HTML'}</span>
                </button>
              </div>
            </div>

            <pre className="flex-1 min-h-0 overflow-auto border border-[#E5E5E5] bg-white p-4 text-[11px] leading-relaxed text-[#141414] select-all">
              <code>{themeHtml}</code>
            </pre>
          </div>
        ) : (
          <div className="flex-1 min-h-0 overflow-y-auto p-6 space-y-6 text-xs">
            <section className="space-y-3">
              <h3 className="font-serif text-lg font-medium border-b border-[#E5E5E5] pb-2">
                Blog Identity (Preview)
              </h3>
              <label className="block space-y-1">
                <span className="text-[11px] text-[#666666]">Blog Title ({'{Title}'})</span>
                <input
                  type="text"
                  value={config.blogTitle}
                  onChange={(e) => updateField('blogTitle', e.target.value)}
                  className="w-full border border-[#E5E5E5] bg-white px-3 py-2 text-xs focus:outline-none focus:border-[#141414]"
                />
              </label>
              <label className="block space-y-1">
                <span className="text-[11px] text-[#666666]">
                  Description ({'{Description}'})
                </span>
                <textarea
                  rows={2}
                  value={config.blogDescription}
                  onChange={(e) => updateField('blogDescription', e.target.value)}
                  className="w-full border border-[#E5E5E5] bg-white px-3 py-2 text-xs focus:outline-none focus:border-[#141414]"
                />
              </label>
            </section>

            <section className="space-y-3">
              <h3 className="font-serif text-lg font-medium border-b border-[#E5E5E5] pb-2">
                Tumblr Color Variables
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(
                  [
                    ['backgroundColor', 'color:Background'],
                    ['surfaceColor', 'color:Surface'],
                    ['borderColor', 'color:Border'],
                    ['textColor', 'color:Text'],
                    ['mutedColor', 'color:Muted Text'],
                  ] as const
                ).map(([field, label]) => (
                  <label
                    key={field}
                    className="flex items-center justify-between border border-[#E5E5E5] bg-white px-3 py-2"
                  >
                    <span className="text-[11px] text-[#666666]">{label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] tabular-nums">{config[field]}</span>
                      <input
                        type="color"
                        value={config[field]}
                        onChange={(e) => updateField(field, e.target.value)}
                        className="w-6 h-6 border border-[#E5E5E5] bg-transparent p-0 cursor-pointer"
                      />
                    </div>
                  </label>
                ))}
              </div>
            </section>

            <section className="space-y-3">
              <h3 className="font-serif text-lg font-medium border-b border-[#E5E5E5] pb-2">
                Filter Tags &amp; About Link
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label className="block space-y-1">
                  <span className="text-[11px] text-[#666666]">text:Tag 1</span>
                  <input
                    type="text"
                    value={config.tag1}
                    onChange={(e) => updateField('tag1', e.target.value)}
                    className="w-full border border-[#E5E5E5] bg-white px-3 py-2 text-xs focus:outline-none focus:border-[#141414]"
                  />
                </label>
                <label className="block space-y-1">
                  <span className="text-[11px] text-[#666666]">text:Tag 2</span>
                  <input
                    type="text"
                    value={config.tag2}
                    onChange={(e) => updateField('tag2', e.target.value)}
                    className="w-full border border-[#E5E5E5] bg-white px-3 py-2 text-xs focus:outline-none focus:border-[#141414]"
                  />
                </label>
                <label className="block space-y-1">
                  <span className="text-[11px] text-[#666666]">text:Tag 3</span>
                  <input
                    type="text"
                    value={config.tag3}
                    onChange={(e) => updateField('tag3', e.target.value)}
                    className="w-full border border-[#E5E5E5] bg-white px-3 py-2 text-xs focus:outline-none focus:border-[#141414]"
                  />
                </label>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="block space-y-1">
                  <span className="text-[11px] text-[#666666]">text:About Page URL</span>
                  <input
                    type="text"
                    value={config.aboutPageUrl}
                    onChange={(e) => updateField('aboutPageUrl', e.target.value)}
                    className="w-full border border-[#E5E5E5] bg-white px-3 py-2 text-xs focus:outline-none focus:border-[#141414]"
                  />
                </label>
                <label className="block space-y-1">
                  <span className="text-[11px] text-[#666666]">text:About Link Label</span>
                  <input
                    type="text"
                    value={config.aboutLinkLabel}
                    onChange={(e) => updateField('aboutLinkLabel', e.target.value)}
                    className="w-full border border-[#E5E5E5] bg-white px-3 py-2 text-xs focus:outline-none focus:border-[#141414]"
                  />
                </label>
              </div>
            </section>

            <section className="space-y-2.5">
              <h3 className="font-serif text-lg font-medium border-b border-[#E5E5E5] pb-2">
                Display Toggles
              </h3>
              {(
                [
                  ['showDescription', 'if:Show Description'],
                  ['showPostDates', 'if:Show Post Dates'],
                  ['showTagsOnGrid', 'if:Show Tags On Grid'],
                ] as const
              ).map(([field, label]) => (
                <label
                  key={field}
                  className="flex items-center justify-between border border-[#E5E5E5] bg-white px-3 py-2.5 cursor-pointer"
                >
                  <span>{label}</span>
                  <input
                    type="checkbox"
                    checked={config[field]}
                    onChange={(e) => updateField(field, e.target.checked)}
                    className="accent-[#141414] w-4 h-4"
                  />
                </label>
              ))}
            </section>
          </div>
        )}
      </div>
    </div>
  );
};
