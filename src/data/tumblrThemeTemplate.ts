import { ThemeConfig } from '../types/archive';

function escapeHtmlAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function generateTumblrThemeHtml(config: ThemeConfig): string {
  const bg = escapeHtmlAttr(config.backgroundColor);
  const surface = escapeHtmlAttr(config.surfaceColor);
  const border = escapeHtmlAttr(config.borderColor);
  const text = escapeHtmlAttr(config.textColor);
  const muted = escapeHtmlAttr(config.mutedColor);
  const tag1 = escapeHtmlAttr(config.tag1);
  const tag2 = escapeHtmlAttr(config.tag2);
  const tag3 = escapeHtmlAttr(config.tag3);
  const aboutUrl = escapeHtmlAttr(config.aboutPageUrl || '/about');
  const aboutLabel = escapeHtmlAttr(config.aboutLinkLabel || 'About');
  const showDesc = config.showDescription ? '1' : '0';
  const showDates = config.showPostDates ? '1' : '0';
  const showTags = config.showTagsOnGrid ? '1' : '0';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{Title}{block:PostSummary} — {PostSummary}{/block:PostSummary}</title>
  {block:Description}<meta name="description" content="{MetaDescription}" />{/block:Description}
  <link rel="shortcut icon" href="{Favicon}" />
  <link rel="alternate" type="application/rss+xml" href="{RSS}" />

  <!-- Tumblr Customize Appearance Variables -->
  <meta name="color:Background" content="${bg}" />
  <meta name="color:Surface" content="${surface}" />
  <meta name="color:Border" content="${border}" />
  <meta name="color:Text" content="${text}" />
  <meta name="color:Muted Text" content="${muted}" />

  <meta name="text:Tag 1" content="${tag1}" />
  <meta name="text:Tag 2" content="${tag2}" />
  <meta name="text:Tag 3" content="${tag3}" />
  <meta name="text:About Page URL" content="${aboutUrl}" />
  <meta name="text:About Link Label" content="${aboutLabel}" />

  <meta name="if:Show Description" content="${showDesc}" />
  <meta name="if:Show Post Dates" content="${showDates}" />
  <meta name="if:Show Tags On Grid" content="${showTags}" />

  <!-- Editorial & Archival Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet" />

  <style>
    :root {
      --bg: {color:Background};
      --surface: {color:Surface};
      --border: {color:Border};
      --ink: {color:Text};
      --muted: {color:Muted Text};
      --font-serif: "Cormorant Garamond", Georgia, serif;
      --font-mono: "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
      --gutter: 24px;
      --container: 1280px;
    }

    *, *::before, *::after {
      box-sizing: border-box;
      border-radius: 0;
      box-shadow: none;
    }

    html, body {
      margin: 0;
      padding: 0;
      background-color: var(--bg);
      color: var(--ink);
      font-family: var(--font-mono);
      font-size: 13px;
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    img {
      display: block;
      width: 100%;
      height: auto;
      border-radius: 0;
    }

    .archive-shell {
      max-width: var(--container);
      margin: 0 auto;
      padding: 0 24px 72px;
    }

    /* Static Archival Header */
    .archive-header {
      position: static;
      border-bottom: 1px solid var(--border);
      padding: 36px 0 0;
      margin-bottom: 36px;
    }

    .header-top {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-end;
      justify-content: space-between;
      gap: 24px;
      padding-bottom: 24px;
    }

    .brand-block {
      max-width: 600px;
    }

    .site-title {
      font-family: var(--font-serif);
      font-size: clamp(2rem, 3vw, 2.75rem);
      font-weight: 500;
      line-height: 1.08;
      letter-spacing: -0.01em;
      margin: 0;
      display: inline-block;
    }

    .site-description {
      margin: 10px 0 0;
      font-family: var(--font-mono);
      font-size: 12px;
      line-height: 1.6;
      color: var(--muted);
    }

    .site-nav {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 24px;
      font-size: 12px;
      letter-spacing: 0.04em;
    }

    .nav-link {
      color: var(--muted);
      padding-bottom: 3px;
      border-bottom: 1px solid transparent;
      white-space: nowrap;
      transition: color 160ms ease, border-color 160ms ease;
    }

    .nav-link:hover,
    .nav-link.is-active {
      color: var(--ink);
      border-bottom-color: var(--ink);
    }

    /* Minimal Tag Filter Bar */
    .filter-bar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 20px;
      border-top: 1px solid var(--border);
      padding: 14px 0;
      font-size: 12px;
    }

    .filter-label {
      color: var(--muted);
      margin-right: 4px;
    }

    .filter-link {
      color: var(--muted);
      padding-bottom: 2px;
      border-bottom: 1px solid transparent;
      white-space: nowrap;
      transition: color 160ms ease, border-color 160ms ease;
    }

    .filter-link:hover,
    .filter-link.is-active {
      color: var(--ink);
      border-bottom-color: var(--ink);
    }

    .tag-banner {
      margin: 0 0 28px;
      padding-bottom: 14px;
      border-bottom: 1px solid var(--border);
      font-family: var(--font-serif);
      font-size: 22px;
      font-weight: 500;
    }

    /* Left-to-Right JS Masonry Grid */
    .masonry-source {
      display: none;
    }

    .masonry-columns {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: var(--gutter);
      align-items: start;
    }

    .masonry-col {
      display: flex;
      flex-direction: column;
      gap: var(--gutter);
      min-width: 0;
    }

    /* Post Cards */
    .post-card {
      position: relative;
      background: var(--surface);
      border: 1px solid var(--border);
      display: flex;
      flex-direction: column;
    }

    .card-media-wrap {
      position: relative;
      background: var(--bg);
      overflow: hidden;
    }

    .card-media-stack {
      display: flex;
      flex-direction: column;
      gap: 8px;
      background: var(--bg);
    }

    .card-media-btn {
      display: block;
      width: 100%;
      padding: 0;
      margin: 0;
      border: 0;
      background: transparent;
      cursor: zoom-in;
      text-align: left;
    }

    .card-media-btn img {
      width: 100%;
      height: auto;
      display: block;
    }

    /* Text, Quote, Link, Video, Audio, Chat, Answer Card Content */
    .card-editorial-body {
      padding: 20px 18px 18px;
      background: var(--surface);
    }

    .card-editorial-title {
      font-family: var(--font-serif);
      font-size: 22px;
      font-weight: 500;
      line-height: 1.25;
      margin: 0 0 12px;
      color: var(--ink);
    }

    .card-editorial-title a:hover {
      text-decoration: underline;
    }

    .card-prose {
      font-family: var(--font-mono);
      font-size: 12px;
      line-height: 1.65;
      color: var(--ink);
      overflow-wrap: anywhere;
    }

    .card-prose p {
      margin: 0 0 10px;
    }

    .card-prose p:last-child {
      margin-bottom: 0;
    }

    .card-prose a {
      text-decoration: underline;
      text-underline-offset: 3px;
    }

    .card-prose blockquote {
      margin: 10px 0;
      padding-left: 12px;
      border-left: 1px solid var(--border);
      color: var(--muted);
    }

    .card-prose iframe,
    .card-prose video {
      max-width: 100%;
      width: 100%;
      display: block;
    }

    .card-quote-text {
      font-family: var(--font-serif);
      font-size: 22px;
      font-style: italic;
      line-height: 1.38;
      margin: 0 0 12px;
      color: var(--ink);
    }

    .card-quote-source {
      font-size: 11px;
      color: var(--muted);
    }

    .card-link-host {
      display: block;
      font-size: 11px;
      color: var(--muted);
      margin-bottom: 10px;
    }

    .card-embed-wrap {
      position: relative;
      width: 100%;
      background: var(--bg);
    }

    .card-embed-wrap iframe,
    .card-embed-wrap video,
    .card-embed-wrap embed {
      width: 100%;
      max-width: 100%;
      display: block;
      border: 0;
    }

    .card-chat-list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 8px;
      font-size: 12px;
    }

    .card-chat-label {
      font-weight: 500;
      margin-right: 6px;
    }

    .card-asker {
      font-size: 11px;
      color: var(--muted);
      margin-bottom: 8px;
    }

    .card-question {
      font-family: var(--font-serif);
      font-size: 20px;
      line-height: 1.35;
      margin: 0 0 14px;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--border);
    }

    /* Hide raw NPF source once JS extracts images/caption */
    .js-npf-raw {
      display: none;
    }

    /* Modern NPF figure resets inside permalink / prose */
    .npf_row {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin: 0 0 12px;
    }

    figure.tmblr-full,
    .npf_col figure {
      margin: 0 0 10px;
      padding: 0;
    }

    /* Ultra-minimal monochrome hover controls */
    .post-actions {
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 4;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 8px;
      background: rgba(250, 250, 250, 0.92);
      border: 1px solid var(--border);
      opacity: 0;
      transition: opacity 180ms ease;
    }

    .post-card:hover .post-actions,
    .post-card:focus-within .post-actions {
      opacity: 1;
    }

    .post-action-item {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
      filter: grayscale(100%) contrast(120%);
    }

    .post-meta {
      padding: 14px 16px 16px;
      border-top: 1px solid var(--border);
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .post-caption-firstline {
      font-family: var(--font-mono);
      font-size: 12px;
      line-height: 1.5;
      color: var(--ink);
      margin: 0;
    }

    .post-caption-firstline a:hover {
      text-decoration: underline;
    }

    .post-submeta {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 6px 12px;
      font-size: 11px;
      color: var(--muted);
    }

    .post-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 4px 10px;
    }

    .post-tag {
      color: var(--muted);
      transition: color 150ms ease;
    }

    .post-tag:hover {
      color: var(--ink);
      text-decoration: underline;
    }

    .post-date {
      color: var(--muted);
      font-variant-numeric: tabular-nums;
    }

    .js-full-caption {
      display: none;
    }

    /* Permalink & Custom Pages (including /about) */
    .permalink-container {
      max-width: 960px;
      margin: 0 auto;
    }

    .permalink-back {
      display: inline-block;
      margin-bottom: 24px;
      font-size: 12px;
      color: var(--muted);
      border-bottom: 1px solid transparent;
    }

    .permalink-back:hover {
      color: var(--ink);
      border-bottom-color: var(--ink);
    }

    .permalink-article {
      background: var(--surface);
      border: 1px solid var(--border);
      padding: 32px;
    }

    .page-title {
      font-family: var(--font-serif);
      font-size: clamp(1.75rem, 3vw, 2.5rem);
      font-weight: 500;
      line-height: 1.15;
      margin: 0 0 20px;
    }

    .page-body {
      max-width: 68ch;
      font-size: 13px;
      line-height: 1.75;
      color: var(--ink);
    }

    .page-body p {
      margin: 0 0 16px;
    }

    .page-body img {
      margin: 16px 0;
      border: 1px solid var(--border);
    }

    .permalink-media {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-bottom: 24px;
    }

    .permalink-caption {
      font-family: var(--font-serif);
      font-size: 19px;
      line-height: 1.6;
      max-width: 64ch;
      color: var(--ink);
    }

    .post-notes {
      margin-top: 32px;
      padding-top: 24px;
      border-top: 1px solid var(--border);
      font-size: 12px;
      color: var(--muted);
    }

    .post-notes ol.notes {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .post-notes ol.notes img.avatar {
      width: 16px;
      height: 16px;
      display: inline-block;
      vertical-align: middle;
      margin-right: 8px;
    }

    /* Pagination */
    .archive-pagination {
      margin-top: 48px;
      padding-top: 24px;
      border-top: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 12px;
      font-variant-numeric: tabular-nums;
    }

    .page-nav-link {
      padding: 8px 14px;
      border: 1px solid var(--border);
      background: var(--surface);
      color: var(--ink);
      transition: border-color 160ms ease;
    }

    .page-nav-link:hover {
      border-color: var(--ink);
    }

    /* Archival Lightbox Modal */
    .archival-lightbox {
      position: fixed;
      inset: 0;
      z-index: 9999;
      background: rgba(250, 250, 250, 0.96);
      display: none;
      flex-direction: column;
      padding: 24px;
    }

    .archival-lightbox.is-open {
      display: flex;
    }

    .lightbox-topbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 16px;
      border-bottom: 1px solid var(--border);
      font-size: 12px;
      font-variant-numeric: tabular-nums;
    }

    .lightbox-controls {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .lightbox-btn {
      background: transparent;
      border: 1px solid var(--border);
      color: var(--ink);
      font-family: var(--font-mono);
      font-size: 12px;
      padding: 6px 12px;
      cursor: pointer;
      transition: border-color 150ms ease;
    }

    .lightbox-btn:hover {
      border-color: var(--ink);
    }

    .lightbox-stage {
      flex: 1;
      min-height: 0;
      display: grid;
      grid-template-columns: minmax(0, 1fr) 340px;
      gap: 32px;
      padding-top: 24px;
      align-items: center;
    }

    .lightbox-image-frame {
      height: 100%;
      min-height: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .lightbox-image-frame img {
      max-width: 100%;
      max-height: calc(100vh - 150px);
      width: auto;
      height: auto;
      object-fit: contain;
      border: 1px solid var(--border);
    }

    .lightbox-metadata {
      align-self: stretch;
      overflow-y: auto;
      border-left: 1px solid var(--border);
      padding-left: 24px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 16px;
    }

    .lightbox-caption {
      font-family: var(--font-serif);
      font-size: 20px;
      line-height: 1.55;
      color: var(--ink);
    }

    .lightbox-caption p {
      margin: 0 0 12px;
    }

    .lightbox-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 6px 12px;
      font-size: 11px;
      color: var(--muted);
    }

    .lightbox-permalink {
      display: inline-block;
      margin-top: 8px;
      font-size: 11px;
      color: var(--ink);
      border-bottom: 1px solid var(--ink);
      width: fit-content;
    }

    .archive-footer {
      margin-top: 56px;
      padding-top: 20px;
      border-top: 1px solid var(--border);
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 12px;
      font-size: 11px;
      color: var(--muted);
    }

    @media (max-width: 1023px) {
      .masonry-columns {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
      .lightbox-stage {
        grid-template-columns: 1fr;
        gap: 20px;
        overflow-y: auto;
      }
      .lightbox-metadata {
        border-left: 0;
        border-top: 1px solid var(--border);
        padding-left: 0;
        padding-top: 16px;
      }
      .lightbox-image-frame img {
        max-height: 58vh;
      }
    }

    @media (max-width: 639px) {
      .archive-shell {
        padding: 0 16px 56px;
      }
      .masonry-columns {
        grid-template-columns: 1fr;
      }
      .permalink-article {
        padding: 20px;
      }
    }
  </style>
</head>
<body>
  <div class="archive-shell">
    <header class="archive-header">
      <div class="header-top">
        <div class="brand-block">
          <a href="/" class="site-title">{Title}</a>
          {block:IfShowDescription}
            {block:Description}<p class="site-description">{Description}</p>{/block:Description}
          {/block:IfShowDescription}
        </div>

        <nav class="site-nav" aria-label="Primary Navigation">
          <a href="/" class="nav-link" data-nav="index">Archive</a>
          <a href="{text:About Page URL}" class="nav-link" data-nav="about">{text:About Link Label}</a>
          {block:HasPages}
            {block:Pages}
              <a href="{URL}" class="nav-link">{Label}</a>
            {/block:Pages}
          {/block:HasPages}
        </nav>
      </div>

      <div class="filter-bar" role="navigation" aria-label="Archive Tag Filters">
        <span class="filter-label">Index:</span>
        <a href="/" class="filter-link" data-filter="all">All</a>
        <a href="/tagged/{text:Tag 1}" class="filter-link js-tag-filter" data-tag="{text:Tag 1}">#{text:Tag 1}</a>
        <a href="/tagged/{text:Tag 2}" class="filter-link js-tag-filter" data-tag="{text:Tag 2}">#{text:Tag 2}</a>
        <a href="/tagged/{text:Tag 3}" class="filter-link js-tag-filter" data-tag="{text:Tag 3}">#{text:Tag 3}</a>
      </div>
    </header>

    {block:TagPage}
      <h1 class="tag-banner">Filed under #{Tag}</h1>
    {/block:TagPage}

    {block:SearchPage}
      <h1 class="tag-banner">Search results for &ldquo;{SearchQuery}&rdquo; ({SearchResultCount})</h1>
    {/block:SearchPage}

    {block:DayPage}
      <h1 class="tag-banner">Archive for {Month} {DayOfMonth}, {Year}</h1>
    {/block:DayPage}

    {block:IndexPage}
      <main id="masonry-root">
        <div class="masonry-source" id="masonry-source">
          {block:Posts}
            {block:Photo}
              <article class="post-card js-post-card" data-post-id="{PostID}" data-permalink="{Permalink}" data-date="{block:Date}{ShortMonth} {DayOfMonthWithZero}, {Year}{/block:Date}">
                <div class="card-media-wrap">
                  <div class="post-actions" aria-label="Post actions">
                    <span class="post-action-item" title="Like">{LikeButton color="black" size="14"}</span>
                    <span class="post-action-item" title="Reblog">{ReblogButton color="black" size="14"}</span>
                  </div>
                  <button type="button" class="card-media-btn js-lightbox-trigger" data-src="{PhotoURL-HighRes}" data-alt="{PhotoAlt}">
                    <img src="{PhotoURL-HighRes}" alt="{PhotoAlt}" loading="lazy" />
                  </button>
                </div>

                <div class="post-meta">
                  {block:Caption}
                    <div class="post-caption-firstline js-first-line">{Caption}</div>
                    <template class="js-full-caption">{Caption}</template>
                  {/block:Caption}
                  <div class="post-submeta">
                    {block:IfShowTagsOnGrid}
                      {block:HasTags}
                        <div class="post-tags">
                          {block:Tags}<a href="{TagURL}" class="post-tag">#{Tag}</a>{/block:Tags}
                        </div>
                      {/block:HasTags}
                    {/block:IfShowTagsOnGrid}
                    {block:IfShowPostDates}
                      {block:Date}<a href="{Permalink}" class="post-date">{ShortMonth} {DayOfMonthWithZero}, {Year}</a>{/block:Date}
                    {/block:IfShowPostDates}
                  </div>
                </div>
              </article>
            {/block:Photo}

            {block:Photoset}
              <article class="post-card js-post-card" data-post-id="{PostID}" data-permalink="{Permalink}" data-date="{block:Date}{ShortMonth} {DayOfMonthWithZero}, {Year}{/block:Date}">
                <div class="card-media-wrap">
                  <div class="post-actions" aria-label="Post actions">
                    <span class="post-action-item" title="Like">{LikeButton color="black" size="14"}</span>
                    <span class="post-action-item" title="Reblog">{ReblogButton color="black" size="14"}</span>
                  </div>
                  <div class="card-media-stack">
                    {block:Photos}
                      <button type="button" class="card-media-btn js-lightbox-trigger" data-src="{PhotoURL-HighRes}" data-alt="{PhotoAlt}">
                        <img src="{PhotoURL-HighRes}" alt="{PhotoAlt}" loading="lazy" />
                      </button>
                    {/block:Photos}
                  </div>
                </div>

                <div class="post-meta">
                  {block:Caption}
                    <div class="post-caption-firstline js-first-line">{Caption}</div>
                    <template class="js-full-caption">{Caption}</template>
                  {/block:Caption}
                  <div class="post-submeta">
                    {block:IfShowTagsOnGrid}
                      {block:HasTags}
                        <div class="post-tags">
                          {block:Tags}<a href="{TagURL}" class="post-tag">#{Tag}</a>{/block:Tags}
                        </div>
                      {/block:HasTags}
                    {/block:IfShowTagsOnGrid}
                    {block:IfShowPostDates}
                      {block:Date}<a href="{Permalink}" class="post-date">{ShortMonth} {DayOfMonthWithZero}, {Year}</a>{/block:Date}
                    {/block:IfShowPostDates}
                  </div>
                </div>
              </article>
            {/block:Photoset}

            {block:Text}
              <article class="post-card js-post-card js-npf-post" data-post-id="{PostID}" data-permalink="{Permalink}" data-date="{block:Date}{ShortMonth} {DayOfMonthWithZero}, {Year}{/block:Date}">
                <div class="post-actions" aria-label="Post actions">
                  <span class="post-action-item" title="Like">{LikeButton color="black" size="14"}</span>
                  <span class="post-action-item" title="Reblog">{ReblogButton color="black" size="14"}</span>
                </div>

                <!-- Raw NPF / Text Body parsed by JS into stacked plates + caption, or pure text -->
                <div class="js-npf-raw">
                  {block:Title}<h2 class="js-npf-title">{Title}</h2>{/block:Title}
                  <div class="js-npf-body">{Body}</div>
                </div>

                <div class="card-media-wrap js-npf-media-wrap" style="display: none;">
                  <div class="card-media-stack js-npf-media-stack"></div>
                </div>

                <div class="card-editorial-body js-npf-text-wrap" style="display: none;">
                  {block:Title}<h2 class="card-editorial-title"><a href="{Permalink}">{Title}</a></h2>{/block:Title}
                  <div class="card-prose">{Body}</div>
                </div>

                <div class="post-meta">
                  <div class="post-caption-firstline js-npf-firstline" style="display: none;"></div>
                  <template class="js-full-caption">{block:Title}<h3>{Title}</h3>{/block:Title}{Body}</template>
                  <div class="post-submeta">
                    {block:IfShowTagsOnGrid}
                      {block:HasTags}
                        <div class="post-tags">
                          {block:Tags}<a href="{TagURL}" class="post-tag">#{Tag}</a>{/block:Tags}
                        </div>
                      {/block:HasTags}
                    {/block:IfShowTagsOnGrid}
                    {block:IfShowPostDates}
                      {block:Date}<a href="{Permalink}" class="post-date">{ShortMonth} {DayOfMonthWithZero}, {Year}</a>{/block:Date}
                    {/block:IfShowPostDates}
                  </div>
                </div>
              </article>
            {/block:Text}

            {block:Quote}
              <article class="post-card js-post-card" data-post-id="{PostID}" data-permalink="{Permalink}" data-date="{block:Date}{ShortMonth} {DayOfMonthWithZero}, {Year}{/block:Date}">
                <div class="post-actions" aria-label="Post actions">
                  <span class="post-action-item" title="Like">{LikeButton color="black" size="14"}</span>
                  <span class="post-action-item" title="Reblog">{ReblogButton color="black" size="14"}</span>
                </div>
                <div class="card-editorial-body">
                  <blockquote class="card-quote-text">&ldquo;{Quote}&rdquo;</blockquote>
                  {block:Source}<div class="card-quote-source">&mdash; {Source}</div>{/block:Source}
                </div>
                <div class="post-meta">
                  <div class="post-submeta">
                    {block:IfShowTagsOnGrid}
                      {block:HasTags}
                        <div class="post-tags">
                          {block:Tags}<a href="{TagURL}" class="post-tag">#{Tag}</a>{/block:Tags}
                        </div>
                      {/block:HasTags}
                    {/block:IfShowTagsOnGrid}
                    {block:IfShowPostDates}
                      {block:Date}<a href="{Permalink}" class="post-date">{ShortMonth} {DayOfMonthWithZero}, {Year}</a>{/block:Date}
                    {/block:IfShowPostDates}
                  </div>
                </div>
              </article>
            {/block:Quote}

            {block:Link}
              <article class="post-card js-post-card" data-post-id="{PostID}" data-permalink="{Permalink}" data-date="{block:Date}{ShortMonth} {DayOfMonthWithZero}, {Year}{/block:Date}">
                <div class="post-actions" aria-label="Post actions">
                  <span class="post-action-item" title="Like">{LikeButton color="black" size="14"}</span>
                  <span class="post-action-item" title="Reblog">{ReblogButton color="black" size="14"}</span>
                </div>
                {block:Thumbnail}
                  <div class="card-media-wrap">
                    <a href="{URL}" {Target} class="card-media-btn">
                      <img src="{Thumbnail}" alt="{Name}" loading="lazy" />
                    </a>
                  </div>
                {/block:Thumbnail}
                <div class="card-editorial-body">
                  <h2 class="card-editorial-title"><a href="{URL}" {Target}>{Name} &rarr;</a></h2>
                  {block:Host}<span class="card-link-host">{Host}</span>{/block:Host}
                  {block:Description}<div class="card-prose">{Description}</div>{/block:Description}
                </div>
                <div class="post-meta">
                  <div class="post-submeta">
                    {block:IfShowTagsOnGrid}
                      {block:HasTags}
                        <div class="post-tags">
                          {block:Tags}<a href="{TagURL}" class="post-tag">#{Tag}</a>{/block:Tags}
                        </div>
                      {/block:HasTags}
                    {/block:IfShowTagsOnGrid}
                    {block:IfShowPostDates}
                      {block:Date}<a href="{Permalink}" class="post-date">{ShortMonth} {DayOfMonthWithZero}, {Year}</a>{/block:Date}
                    {/block:IfShowPostDates}
                  </div>
                </div>
              </article>
            {/block:Link}

            {block:Video}
              <article class="post-card js-post-card" data-post-id="{PostID}" data-permalink="{Permalink}" data-date="{block:Date}{ShortMonth} {DayOfMonthWithZero}, {Year}{/block:Date}">
                <div class="post-actions" aria-label="Post actions">
                  <span class="post-action-item" title="Like">{LikeButton color="black" size="14"}</span>
                  <span class="post-action-item" title="Reblog">{ReblogButton color="black" size="14"}</span>
                </div>
                <div class="card-embed-wrap">{Video-500}</div>
                <div class="post-meta">
                  {block:Caption}
                    <div class="post-caption-firstline js-first-line">{Caption}</div>
                  {/block:Caption}
                  <div class="post-submeta">
                    {block:IfShowTagsOnGrid}
                      {block:HasTags}
                        <div class="post-tags">
                          {block:Tags}<a href="{TagURL}" class="post-tag">#{Tag}</a>{/block:Tags}
                        </div>
                      {/block:HasTags}
                    {/block:IfShowTagsOnGrid}
                    {block:IfShowPostDates}
                      {block:Date}<a href="{Permalink}" class="post-date">{ShortMonth} {DayOfMonthWithZero}, {Year}</a>{/block:Date}
                    {/block:IfShowPostDates}
                  </div>
                </div>
              </article>
            {/block:Video}

            {block:Audio}
              <article class="post-card js-post-card" data-post-id="{PostID}" data-permalink="{Permalink}" data-date="{block:Date}{ShortMonth} {DayOfMonthWithZero}, {Year}{/block:Date}">
                <div class="post-actions" aria-label="Post actions">
                  <span class="post-action-item" title="Like">{LikeButton color="black" size="14"}</span>
                  <span class="post-action-item" title="Reblog">{ReblogButton color="black" size="14"}</span>
                </div>
                {block:AlbumArt}
                  <div class="card-media-wrap">
                    <button type="button" class="card-media-btn js-lightbox-trigger" data-src="{AlbumArtURL}" data-alt="{block:TrackName}{TrackName}{/block:TrackName}">
                      <img src="{AlbumArtURL}" alt="{block:TrackName}{TrackName}{/block:TrackName}" loading="lazy" />
                    </button>
                  </div>
                {/block:AlbumArt}
                <div class="card-embed-wrap">
                  {block:AudioEmbed}{AudioEmbed}{/block:AudioEmbed}
                  {block:AudioPlayer}{AudioPlayer}{/block:AudioPlayer}
                </div>
                <div class="post-meta">
                  {block:Caption}
                    <div class="post-caption-firstline js-first-line">{Caption}</div>
                    <template class="js-full-caption">{Caption}</template>
                  {/block:Caption}
                  <div class="post-submeta">
                    {block:IfShowTagsOnGrid}
                      {block:HasTags}
                        <div class="post-tags">
                          {block:Tags}<a href="{TagURL}" class="post-tag">#{Tag}</a>{/block:Tags}
                        </div>
                      {/block:HasTags}
                    {/block:IfShowTagsOnGrid}
                    {block:IfShowPostDates}
                      {block:Date}<a href="{Permalink}" class="post-date">{ShortMonth} {DayOfMonthWithZero}, {Year}</a>{/block:Date}
                    {/block:IfShowPostDates}
                  </div>
                </div>
              </article>
            {/block:Audio}

            {block:Chat}
              <article class="post-card js-post-card" data-post-id="{PostID}" data-permalink="{Permalink}" data-date="{block:Date}{ShortMonth} {DayOfMonthWithZero}, {Year}{/block:Date}">
                <div class="post-actions" aria-label="Post actions">
                  <span class="post-action-item" title="Like">{LikeButton color="black" size="14"}</span>
                  <span class="post-action-item" title="Reblog">{ReblogButton color="black" size="14"}</span>
                </div>
                <div class="card-editorial-body">
                  {block:Title}<h2 class="card-editorial-title"><a href="{Permalink}">{Title}</a></h2>{/block:Title}
                  <ul class="card-chat-list">
                    {block:Lines}
                      <li>
                        {block:Label}<span class="card-chat-label">{Label}</span>{/block:Label}
                        <span>{Line}</span>
                      </li>
                    {/block:Lines}
                  </ul>
                </div>
                <div class="post-meta">
                  <div class="post-submeta">
                    {block:IfShowTagsOnGrid}
                      {block:HasTags}
                        <div class="post-tags">
                          {block:Tags}<a href="{TagURL}" class="post-tag">#{Tag}</a>{/block:Tags}
                        </div>
                      {/block:HasTags}
                    {/block:IfShowTagsOnGrid}
                    {block:IfShowPostDates}
                      {block:Date}<a href="{Permalink}" class="post-date">{ShortMonth} {DayOfMonthWithZero}, {Year}</a>{/block:Date}
                    {/block:IfShowPostDates}
                  </div>
                </div>
              </article>
            {/block:Chat}

            {block:Answer}
              <article class="post-card js-post-card" data-post-id="{PostID}" data-permalink="{Permalink}" data-date="{block:Date}{ShortMonth} {DayOfMonthWithZero}, {Year}{/block:Date}">
                <div class="post-actions" aria-label="Post actions">
                  <span class="post-action-item" title="Like">{LikeButton color="black" size="14"}</span>
                  <span class="post-action-item" title="Reblog">{ReblogButton color="black" size="14"}</span>
                </div>
                <div class="card-editorial-body">
                  <div class="card-asker">{Asker} asked:</div>
                  <p class="card-question">{Question}</p>
                  <div class="card-prose">{Answer}</div>
                </div>
                <div class="post-meta">
                  <div class="post-submeta">
                    {block:IfShowTagsOnGrid}
                      {block:HasTags}
                        <div class="post-tags">
                          {block:Tags}<a href="{TagURL}" class="post-tag">#{Tag}</a>{/block:Tags}
                        </div>
                      {/block:HasTags}
                    {/block:IfShowTagsOnGrid}
                    {block:IfShowPostDates}
                      {block:Date}<a href="{Permalink}" class="post-date">{ShortMonth} {DayOfMonthWithZero}, {Year}</a>{/block:Date}
                    {/block:IfShowPostDates}
                  </div>
                </div>
              </article>
            {/block:Answer}
          {/block:Posts}
        </div>
        <div class="masonry-columns" id="masonry-columns"></div>
      </main>
    {/block:IndexPage}

    {block:PermalinkPage}
      <main class="permalink-container">
        <a href="/" class="permalink-back">&larr; Return to Archive</a>
        {block:Posts}
          <article class="permalink-article">
            {block:Text}
              {block:Title}<h1 class="page-title">{Title}</h1>{/block:Title}
              <div class="page-body">{Body}</div>
            {/block:Text}

            {block:Photo}
              <div class="permalink-media">
                <img src="{PhotoURL-HighRes}" alt="{PhotoAlt}" />
              </div>
              {block:Caption}<div class="permalink-caption">{Caption}</div>{/block:Caption}
            {/block:Photo}

            {block:Photoset}
              <div class="permalink-media">
                {block:Photos}
                  <img src="{PhotoURL-HighRes}" alt="{PhotoAlt}" />
                {/block:Photos}
              </div>
              {block:Caption}<div class="permalink-caption">{Caption}</div>{/block:Caption}
            {/block:Photoset}

            {block:Quote}
              <blockquote class="card-quote-text" style="font-size: 28px;">&ldquo;{Quote}&rdquo;</blockquote>
              {block:Source}<div class="card-quote-source">&mdash; {Source}</div>{/block:Source}
            {/block:Quote}

            {block:Link}
              <h1 class="page-title"><a href="{URL}" {Target}>{Name} &rarr;</a></h1>
              {block:Description}<div class="page-body">{Description}</div>{/block:Description}
            {/block:Link}

            {block:Video}
              <div class="card-embed-wrap" style="margin-bottom: 24px;">{Video-700}</div>
              {block:Caption}<div class="permalink-caption">{Caption}</div>{/block:Caption}
            {/block:Video}

            {block:Audio}
              {block:AlbumArt}<div class="permalink-media"><img src="{AlbumArtURL}" alt="" /></div>{/block:AlbumArt}
              <div class="card-embed-wrap" style="margin-bottom: 24px;">
                {block:AudioEmbed}{AudioEmbed}{/block:AudioEmbed}
                {block:AudioPlayer}{AudioPlayer}{/block:AudioPlayer}
              </div>
              {block:Caption}<div class="permalink-caption">{Caption}</div>{/block:Caption}
            {/block:Audio}

            {block:Chat}
              {block:Title}<h1 class="page-title">{Title}</h1>{/block:Title}
              <ul class="card-chat-list">
                {block:Lines}
                  <li>
                    {block:Label}<span class="card-chat-label">{Label}</span>{/block:Label}
                    <span>{Line}</span>
                  </li>
                {/block:Lines}
              </ul>
            {/block:Chat}

            {block:Answer}
              <div class="card-asker">{Asker} asked:</div>
              <h1 class="page-title">{Question}</h1>
              <div class="page-body">{Answer}</div>
            {/block:Answer}

            {block:HasTags}
              <div class="post-tags" style="margin-top: 20px;">
                {block:Tags}<a href="{TagURL}" class="post-tag">#{Tag}</a>{/block:Tags}
              </div>
            {/block:HasTags}

            {block:PostNotes}
              <section class="post-notes">{PostNotes}</section>
            {/block:PostNotes}
          </article>
        {/block:Posts}
      </main>
    {/block:PermalinkPage}

    {block:Pagination}
      <nav class="archive-pagination" aria-label="Pagination">
        <div>
          {block:PreviousPage}
            <a href="{PreviousPage}" class="page-nav-link">&larr; Previous</a>
          {/block:PreviousPage}
        </div>
        <span class="post-date">Page {CurrentPage} of {TotalPages}</span>
        <div>
          {block:NextPage}
            <a href="{NextPage}" class="page-nav-link">Next &rarr;</a>
          {/block:NextPage}
        </div>
      </nav>
    {/block:Pagination}

    <footer class="archive-footer">
      <span>{Title} — Archival Collection</span>
      <span>Public Domain &amp; Historical Print</span>
    </footer>
  </div>

  <!-- Full-Screen Archival Lightbox -->
  <div class="archival-lightbox" id="archival-lightbox" role="dialog" aria-modal="true" aria-label="Archival Plate Inspection">
    <div class="lightbox-topbar">
      <span id="lb-counter">01 / 01</span>
      <div class="lightbox-controls">
        <button type="button" class="lightbox-btn" id="lb-prev" aria-label="Previous plate">&larr; Prev</button>
        <button type="button" class="lightbox-btn" id="lb-next" aria-label="Next plate">Next &rarr;</button>
        <button type="button" class="lightbox-btn" id="lb-close" aria-label="Close lightbox">Close (Esc)</button>
      </div>
    </div>
    <div class="lightbox-stage">
      <div class="lightbox-image-frame">
        <img id="lb-image" src="" alt="" />
      </div>
      <aside class="lightbox-metadata">
        <div class="lightbox-caption" id="lb-caption"></div>
        <div class="lightbox-tags" id="lb-tags"></div>
        <div class="post-date" id="lb-date"></div>
        <a id="lb-permalink" href="/" class="lightbox-permalink">View Entry Permalink &rarr;</a>
      </aside>
    </div>
  </div>

  <script>
    (function () {
      var path = window.location.pathname.replace(/\\/+$/, '') || '/';

      // Deduplicate About link if user also added an About custom page in Tumblr Pages
      var navLinks = Array.prototype.slice.call(document.querySelectorAll('.site-nav .nav-link'));
      var seenNavHrefs = {};
      navLinks.forEach(function (link) {
        var href = (link.getAttribute('href') || '').replace(/\\/+$/, '') || '/';
        if (!href) {
          link.remove();
          return;
        }
        if (seenNavHrefs[href] && link.getAttribute('data-nav') !== 'about') {
          link.remove();
          return;
        }
        seenNavHrefs[href] = true;
        if (href === path) {
          link.classList.add('is-active');
        }
      });

      // Clean empty tag filters and normalize /tagged/ URLs
      document.querySelectorAll('.js-tag-filter').forEach(function (link) {
        var tagVal = (link.getAttribute('data-tag') || '').trim();
        if (!tagVal) {
          link.remove();
          return;
        }
        link.setAttribute('href', '/tagged/' + encodeURIComponent(tagVal));
      });

      document.querySelectorAll('.filter-bar .filter-link').forEach(function (link) {
        var href = (link.getAttribute('href') || '').replace(/\\/+$/, '') || '/';
        if (href === path || (path.indexOf('/tagged/') === 0 && decodeURIComponent(path).toLowerCase() === decodeURIComponent(href).toLowerCase())) {
          link.classList.add('is-active');
        }
      });

      // Transform modern Tumblr NPF {block:Text} image posts into archival photo/photoset cards
      document.querySelectorAll('.js-npf-post').forEach(function (card) {
        var rawBody = card.querySelector('.js-npf-body');
        var rawTitle = card.querySelector('.js-npf-title');
        var mediaWrap = card.querySelector('.js-npf-media-wrap');
        var mediaStack = card.querySelector('.js-npf-media-stack');
        var textWrap = card.querySelector('.js-npf-text-wrap');
        var firstlineEl = card.querySelector('.js-npf-firstline');
        var fullTpl = card.querySelector('.js-full-caption');

        if (!rawBody) return;

        var imgs = Array.prototype.slice.call(rawBody.querySelectorAll('img'));
        if (imgs.length > 0 && mediaWrap && mediaStack) {
          imgs.forEach(function (img) {
            var srcsetBest = '';
            var srcsetAttr = img.getAttribute('srcset') || '';
            if (srcsetAttr) {
              var parts = srcsetAttr.split(',');
              var maxW = 0;
              parts.forEach(function (entry) {
                var tokens = entry.trim().split(/\\s+/);
                if (tokens[0]) {
                  var w = parseInt(tokens[1] || '0', 10) || 0;
                  if (w >= maxW) {
                    maxW = w;
                    srcsetBest = tokens[0];
                  }
                }
              });
            }
            var highResSrc =
              img.getAttribute('data-big-photo') ||
              img.getAttribute('data-highres') ||
              srcsetBest ||
              img.getAttribute('src') ||
              '';
            if (!highResSrc) return;

            var btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'card-media-btn js-lightbox-trigger';
            btn.setAttribute('data-src', highResSrc);
            btn.setAttribute('data-alt', img.getAttribute('alt') || '');

            var cleanImg = document.createElement('img');
            cleanImg.src = highResSrc;
            cleanImg.alt = img.getAttribute('alt') || '';
            cleanImg.loading = 'lazy';
            btn.appendChild(cleanImg);
            mediaStack.appendChild(btn);
          });
          mediaWrap.style.display = 'block';

          // Extract remaining caption text (excluding image figures and reblog attribution headers)
          var clone = rawBody.cloneNode(true);
          clone.querySelectorAll('figure, .npf_row, img, .tmblr-attribution').forEach(function (n) {
            n.remove();
          });

          if (fullTpl) {
            var titleHtml = rawTitle ? '<h3>' + rawTitle.innerHTML + '</h3>' : '';
            fullTpl.innerHTML = titleHtml + clone.innerHTML;
          }

          var titleText = rawTitle ? (rawTitle.textContent || '').trim() : '';
          var bodyText = (clone.innerText || clone.textContent || '').trim();
          var firstLine = titleText || (bodyText.split(/\\r?\\n/).map(function (s) { return s.trim(); }).filter(Boolean)[0] || '');
          if (firstLine && firstlineEl) {
            firstlineEl.textContent = firstLine;
            firstlineEl.style.display = 'block';
          }
        } else if (textWrap) {
          // Pure text post without images
          textWrap.style.display = 'block';
        }
      });

      // Extract only the first line of each legacy caption for grid cards
      document.querySelectorAll('.js-first-line').forEach(function (el) {
        var rawText = (el.innerText || el.textContent || '').trim();
        var firstLine = rawText.split(/\\r?\\n/).map(function (s) { return s.trim(); }).filter(Boolean)[0] || rawText;
        el.textContent = firstLine;
      });

      // Left-to-right shortest-column JS masonry
      var source = document.getElementById('masonry-source');
      var columnsRoot = document.getElementById('masonry-columns');
      var cards = source ? Array.prototype.slice.call(source.querySelectorAll('.js-post-card')) : [];

      function getColumnCount() {
        var w = window.innerWidth;
        if (w >= 1024) return 3;
        if (w >= 640) return 2;
        return 1;
      }

      var currentColCount = 0;

      function layoutMasonry(force) {
        if (!columnsRoot || !cards.length) return;
        var colCount = getColumnCount();
        if (!force && colCount === currentColCount && columnsRoot.children.length === colCount) {
          return;
        }
        currentColCount = colCount;
        columnsRoot.innerHTML = '';

        var cols = [];
        var heights = [];
        for (var i = 0; i < colCount; i++) {
          var col = document.createElement('div');
          col.className = 'masonry-col';
          columnsRoot.appendChild(col);
          cols.push(col);
          heights.push(0);
        }

        cards.forEach(function (card) {
          var shortestIndex = 0;
          for (var j = 1; j < colCount; j++) {
            if (heights[j] < heights[shortestIndex]) {
              shortestIndex = j;
            }
          }
          cols[shortestIndex].appendChild(card);
          heights[shortestIndex] = cols[shortestIndex].offsetHeight;
        });
      }

      if (cards.length) {
        layoutMasonry(true);
        var resizeTimer = null;
        window.addEventListener('resize', function () {
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(function () {
            layoutMasonry(true);
          }, 120);
        });
        columnsRoot.querySelectorAll('img').forEach(function (img) {
          if (!img.complete) {
            img.addEventListener('load', function () {
              layoutMasonry(true);
            });
          }
        });
        window.addEventListener('load', function () {
          layoutMasonry(true);
        });
      }

      // Archival Lightbox across all visible plates (legacy + NPF)
      var triggers = Array.prototype.slice.call(document.querySelectorAll('.js-lightbox-trigger'));
      var lightbox = document.getElementById('archival-lightbox');
      var lbImage = document.getElementById('lb-image');
      var lbCaption = document.getElementById('lb-caption');
      var lbTags = document.getElementById('lb-tags');
      var lbDate = document.getElementById('lb-date');
      var lbPermalink = document.getElementById('lb-permalink');
      var lbCounter = document.getElementById('lb-counter');
      var lbPrev = document.getElementById('lb-prev');
      var lbNext = document.getElementById('lb-next');
      var lbClose = document.getElementById('lb-close');
      var activeIndex = -1;

      function formatCounter(index, total) {
        var iStr = String(index + 1).padStart(2, '0');
        var tStr = String(total).padStart(2, '0');
        return iStr + ' / ' + tStr;
      }

      function openLightbox(index) {
        if (!triggers.length || !lightbox) return;
        activeIndex = (index + triggers.length) % triggers.length;
        var trigger = triggers[activeIndex];
        var card = trigger.closest('.js-post-card');

        lbImage.src = trigger.getAttribute('data-src') || '';
        lbImage.alt = trigger.getAttribute('data-alt') || '';
        lbCounter.textContent = formatCounter(activeIndex, triggers.length);

        if (card) {
          var tpl = card.querySelector('.js-full-caption');
          lbCaption.innerHTML = tpl ? tpl.innerHTML : '';
          var tagsWrap = card.querySelector('.post-tags');
          lbTags.innerHTML = tagsWrap ? tagsWrap.innerHTML : '';
          lbDate.textContent = card.getAttribute('data-date') || '';
          lbPermalink.setAttribute('href', card.getAttribute('data-permalink') || '/');
        }

        lightbox.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      }

      function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove('is-open');
        document.body.style.overflow = '';
        activeIndex = -1;
      }

      triggers.forEach(function (trigger, idx) {
        trigger.addEventListener('click', function () {
          openLightbox(idx);
        });
      });

      if (lbPrev) lbPrev.addEventListener('click', function () { openLightbox(activeIndex - 1); });
      if (lbNext) lbNext.addEventListener('click', function () { openLightbox(activeIndex + 1); });
      if (lbClose) lbClose.addEventListener('click', closeLightbox);

      if (lightbox) {
        lightbox.addEventListener('click', function (e) {
          if (e.target === lightbox) closeLightbox();
        });
      }

      document.addEventListener('keydown', function (e) {
        if (!lightbox || !lightbox.classList.contains('is-open')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') openLightbox(activeIndex - 1);
        if (e.key === 'ArrowRight') openLightbox(activeIndex + 1);
      });
    })();
  </script>
</body>
</html>`;
}
