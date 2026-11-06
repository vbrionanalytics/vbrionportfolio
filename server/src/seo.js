/**
 * Server-side SEO helpers.
 *
 * The client is a React SPA, so the raw HTML crawlers download is an empty shell.
 * This module rewrites the <head> per route (title, description, canonical, Open Graph,
 * Twitter, JSON-LD) and injects crawlable fallback content, so search engines and
 * link-preview bots see real content without executing JavaScript.
 */
const fs = require('fs');
const path = require('path');
const projectRepository = require('./repositories/projectRepository');

const SITE_URL = (process.env.SITE_URL || 'https://vbrion.com').replace(/\/$/, '');
const DEFAULT_IMAGE = `${SITE_URL}/vbrion-logo.jpg`;
const SEED_PATH = path.join(__dirname, 'seeds/projects.json');

const SERVICES = [
  'Risk & Governance',
  'Legal Compliances',
  'Business Solutions',
  'Career Consulting',
  'Placement Consulting',
  'Technology & Product Engineering',
  'Fintech Solutions',
  'Healthcare Analytics',
  'Banking Solutions',
  'Education Analytics',
  'Business Development Analytics',
];

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function truncate(value, max) {
  const text = String(value || '').replace(/\s+/g, ' ').trim();
  if (text.length <= max) return text;
  return text.slice(0, max - 1).replace(/\s+\S*$/, '') + '…';
}

function replaceTag(html, pattern, replacement) {
  return html.replace(pattern, () => replacement);
}

/** Rewrite the head tags that the base index.html declares. */
function applyMeta(html, { title, description, canonical, image, noindex }) {
  const t = escapeHtml(title);
  const d = escapeHtml(description);
  const c = escapeHtml(canonical);
  const i = escapeHtml(image || DEFAULT_IMAGE);

  let out = html;
  out = replaceTag(out, /<title>[\s\S]*?<\/title>/, `<title>${t}</title>`);
  out = replaceTag(out, /<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${d}" />`);
  out = replaceTag(out, /<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${c}" />`);
  out = replaceTag(out, /<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${c}" />`);
  out = replaceTag(out, /<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${t}" />`);
  out = replaceTag(out, /<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${d}" />`);
  out = replaceTag(out, /<meta property="og:image" content="[^"]*"\s*\/?>/, `<meta property="og:image" content="${i}" />`);
  out = replaceTag(out, /<meta name="twitter:title" content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${t}" />`);
  out = replaceTag(out, /<meta name="twitter:description" content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${d}" />`);
  out = replaceTag(out, /<meta name="twitter:image" content="[^"]*"\s*\/?>/, `<meta name="twitter:image" content="${i}" />`);
  if (noindex) {
    out = replaceTag(out, /<meta name="robots" content="[^"]*"\s*\/?>/, '<meta name="robots" content="noindex, follow" />');
  }
  return out;
}

function jsonLd(data) {
  // "<" is escaped so project text can never close the script tag.
  return `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;
}

async function allProjects() {
  return projectRepository.getAll();
}

/** Crawlable fallback content for the home page (replaced by React once JS runs). */
async function homeFallback() {
  const projects = await allProjects();
  const services = SERVICES.map((s) => `<li>${escapeHtml(s)}</li>`).join('');
  const work = projects
    .map((p) => `<li><a href="/project/${encodeURIComponent(p.id)}">${escapeHtml(p.title)}</a></li>`)
    .join('');
  return `<noscript><main style="max-width:960px;margin:0 auto;padding:32px;font-family:Arial,sans-serif;color:#e2e8f0">
<h1>vbrion analytics — engineering what's next</h1>
<p>vbrion analytics is a consulting and engineering company in Erode, Tamil Nadu, India. We combine expert consulting with digital product engineering, data analytics and AI to help enterprises, institutions and government bodies anticipate what is next.</p>
<h2>Consulting &amp; analytics services</h2><ul>${services}</ul>
<h2>Case studies &amp; production systems</h2><ul>${work}</ul>
<h2>Contact</h2>
<p>Email: <a href="mailto:info@vbrion.com">info@vbrion.com</a> · Phone: <a href="tel:+917718079297">+91 7718079297</a></p>
<p>No. 301/180, Vinayagar Kovil Street, 10-A, Nadar Medu, Erode – 638002, Tamil Nadu, India</p>
<p>Please enable JavaScript to use the full vbrion website.</p>
</main></noscript>`;
}

async function renderHome(baseHtml) {
  const fallback = await homeFallback();
  return baseHtml.replace('<!--SEO_FALLBACK-->', () => fallback);
}

function renderProject(baseHtml, project) {
  const url = `${SITE_URL}/project/${encodeURIComponent(project.id)}`;
  const suffix = ' | vbrion analytics';
  const title = truncate(project.title, 65 - suffix.length) + suffix;
  const description = truncate(project.summary || project.outcome, 158);
  const image = project.thumbnail || DEFAULT_IMAGE;

  const schema = jsonLd({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'vbrion analytics', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: project.title, item: url },
        ],
      },
      {
        '@type': 'CreativeWork',
        '@id': `${url}#project`,
        name: project.title,
        description,
        url,
        image,
        about: project.industryTag,
        creator: { '@id': `${SITE_URL}/#organization` },
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
    ],
  });

  const body = `<noscript><main style="max-width:960px;margin:0 auto;padding:32px;font-family:Arial,sans-serif;color:#e2e8f0">
<p><a href="/">← vbrion analytics</a></p>
<h1>${escapeHtml(project.title)}</h1>
<p>${escapeHtml(project.summary || '')}</p>
<h2>Challenge</h2><p>${escapeHtml(project.challenge || '')}</p>
<h2>Approach</h2><p>${escapeHtml(project.approach || '')}</p>
<h2>Solution</h2><p>${escapeHtml(project.solution || '')}</p>
<h2>Outcome</h2><p>${escapeHtml(project.outcome || '')}</p>
</main></noscript>`;

  let out = applyMeta(baseHtml, { title, description, canonical: url, image });
  out = out.replace('</head>', () => `${schema}\n</head>`);
  out = out.replace('<!--SEO_FALLBACK-->', () => body);
  return out;
}

/** Page for unknown URLs: served with a 404 status and kept out of the index. */
function renderNotFound(baseHtml, requestPath) {
  const out = applyMeta(baseHtml, {
    title: 'Page not found | vbrion analytics',
    description: 'The page you requested could not be found. Visit the vbrion analytics home page.',
    canonical: `${SITE_URL}/`,
    image: DEFAULT_IMAGE,
    noindex: true,
  });
  return out.replace('<!--SEO_FALLBACK-->', () => '');
}

async function buildSitemap() {
  let lastmod = new Date().toISOString().slice(0, 10);
  try {
    lastmod = fs.statSync(SEED_PATH).mtime.toISOString().slice(0, 10);
  } catch (_) { /* keep today's date */ }

  const projects = await allProjects();
  const urls = [
    { loc: `${SITE_URL}/`, changefreq: 'weekly', priority: '1.0' },
    ...projects.map((p) => ({
      loc: `${SITE_URL}/project/${encodeURIComponent(p.id)}`,
      changefreq: 'monthly',
      priority: '0.7',
    })),
  ];
  const items = urls
    .map((u) => `  <url>\n    <loc>${escapeHtml(u.loc)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`)
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</urlset>\n`;
}

module.exports = { renderHome, renderProject, renderNotFound, buildSitemap, SITE_URL };
