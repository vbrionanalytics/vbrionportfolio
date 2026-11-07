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
const { servicePages, locationPages, blogPosts } = require('./seo/content');

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
<h2>Solutions</h2><ul>${servicePages.map((sv) => `<li><a href="/services/${sv.slug}">${escapeHtml(sv.name)}</a></li>`).join('')}</ul>
<h2>Where we work</h2><ul>${locationPages.map((l) => `<li><a href="/software-company-in/${l.slug}">Software company in ${escapeHtml(l.city)}</a></li>`).join('')}</ul>
<p><a href="/blog">Read our blog</a></p>
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


// ---------------------------------------------------------------------------
// Content pages: services, locations, blog
// ---------------------------------------------------------------------------
const ORG_ID = `${SITE_URL}/#organization`;

function breadcrumb(items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: it.url })),
  };
}

function faqSchema(faqs) {
  if (!faqs || !faqs.length) return null;
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}

const NOSCRIPT_STYLE = 'max-width:960px;margin:0 auto;padding:32px;font-family:Arial,sans-serif;color:#e2e8f0';

function faqHtml(faqs) {
  if (!faqs || !faqs.length) return '';
  return `<h2>Frequently asked questions</h2>${faqs
    .map((f) => `<h3>${escapeHtml(f.q)}</h3><p>${escapeHtml(f.a)}</p>`)
    .join('')}`;
}

function finishPage(baseHtml, { title, description, url, image, graph, body }) {
  let out = applyMeta(baseHtml, { title, description, canonical: url, image: image || DEFAULT_IMAGE });
  const schema = jsonLd({ '@context': 'https://schema.org', '@graph': graph.filter(Boolean) });
  out = out.replace('</head>', () => `${schema}\n</head>`);
  out = out.replace('<!--SEO_FALLBACK-->', () => `<noscript><main style="${NOSCRIPT_STYLE}">${body}</main></noscript>`);
  return out;
}

async function projectsByIds(ids) {
  const all = await allProjects();
  return ids.map((id) => all.find((p) => p.id === id)).filter(Boolean);
}

function getServicePage(slug) { return servicePages.find((p) => p.slug === slug); }
function getLocationPage(slug) { return locationPages.find((p) => p.slug === slug); }
function getBlogPost(slug) { return blogPosts.find((p) => p.slug === slug); }

async function renderServicePage(baseHtml, page) {
  const url = `${SITE_URL}/services/${page.slug}`;
  const projects = await projectsByIds(page.projectIds);
  const body = `<p><a href="/">← vbrion analytics</a></p>
<h1>${escapeHtml(page.h1)}</h1><p>${escapeHtml(page.intro)}</p>
<h2>Key features</h2><ul>${page.highlights.map((h) => `<li><strong>${escapeHtml(h.title)}.</strong> ${escapeHtml(h.text)}</li>`).join('')}</ul>
<h2>Capabilities</h2><ul>${page.capabilities.map((c) => `<li>${escapeHtml(c)}</li>`).join('')}</ul>
${projects.length ? `<h2>Related case studies</h2><ul>${projects.map((p) => `<li><a href="/project/${encodeURIComponent(p.id)}">${escapeHtml(p.title)}</a></li>`).join('')}</ul>` : ''}
${faqHtml(page.faqs)}
<p>Contact: <a href="mailto:info@vbrion.com">info@vbrion.com</a> · <a href="tel:+917718079297">+91 7718079297</a></p>`;
  return finishPage(baseHtml, {
    title: truncate(page.title, 65),
    description: truncate(page.metaDescription, 158),
    url,
    graph: [
      breadcrumb([{ name: 'vbrion analytics', url: `${SITE_URL}/` }, { name: page.name, url }]),
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: page.name,
        description: truncate(page.metaDescription, 300),
        url,
        provider: { '@id': ORG_ID },
        areaServed: { '@type': 'Country', name: 'India' },
        serviceType: page.name,
      },
      faqSchema(page.faqs),
    ],
    body,
  });
}

async function renderLocationPage(baseHtml, page) {
  const url = `${SITE_URL}/software-company-in/${page.slug}`;
  const services = page.serviceSlugs.map(getServicePage).filter(Boolean);
  const body = `<p><a href="/">← vbrion analytics</a></p>
<h1>${escapeHtml(page.h1)}</h1><p>${escapeHtml(page.intro)}</p>
${page.paragraphs.map((t) => `<p>${escapeHtml(t)}</p>`).join('')}
<h2>Our services</h2><ul>${services.map((sv) => `<li><a href="/services/${sv.slug}">${escapeHtml(sv.name)}</a></li>`).join('')}</ul>
<h2>Contact</h2><p>${escapeHtml(page.address)}</p>
${faqHtml(page.faqs)}
<p>Email: <a href="mailto:info@vbrion.com">info@vbrion.com</a> · Phone: <a href="tel:+917718079297">+91 7718079297</a></p>`;
  return finishPage(baseHtml, {
    title: truncate(page.title, 65),
    description: truncate(page.metaDescription, 158),
    url,
    graph: [
      breadcrumb([{ name: 'vbrion analytics', url: `${SITE_URL}/` }, { name: page.h1, url }]),
      {
        '@type': 'ProfessionalService',
        '@id': `${url}#local`,
        name: 'vbrion analytics',
        url,
        parentOrganization: { '@id': ORG_ID },
        telephone: '+91-7718079297',
        email: 'info@vbrion.com',
        areaServed: { '@type': page.slug === 'tamil-nadu' ? 'AdministrativeArea' : 'City', name: page.city },
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'No. 301/180, Vinayagar Kovil Street, 10-A, Nadar Medu',
          addressLocality: 'Erode',
          addressRegion: 'Tamil Nadu',
          postalCode: '638002',
          addressCountry: 'IN',
        },
      },
      faqSchema(page.faqs),
    ],
    body,
  });
}

function renderBlogPost(baseHtml, post) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const related = getServicePage(post.relatedService);
  const body = `<p><a href="/blog">← Blog</a></p>
<h1>${escapeHtml(post.title)}</h1><p><em>${escapeHtml(post.date)} · ${post.readMinutes} min read</em></p>
${post.sections.map((sec) => `<h2>${escapeHtml(sec.h2)}</h2>${sec.paragraphs.map((t) => `<p>${escapeHtml(t)}</p>`).join('')}`).join('')}
${related ? `<p>Related service: <a href="/services/${related.slug}">${escapeHtml(related.name)}</a></p>` : ''}`;
  return finishPage(baseHtml, {
    title: truncate(post.title, 65),
    description: truncate(post.description, 158),
    url,
    graph: [
      breadcrumb([{ name: 'vbrion analytics', url: `${SITE_URL}/` }, { name: 'Blog', url: `${SITE_URL}/blog` }, { name: post.title, url }]),
      {
        '@type': 'BlogPosting',
        '@id': `${url}#post`,
        headline: truncate(post.title, 110),
        description: post.description,
        datePublished: post.date,
        dateModified: post.date,
        inLanguage: 'en-IN',
        mainEntityOfPage: url,
        image: DEFAULT_IMAGE,
        author: { '@id': ORG_ID },
        publisher: { '@id': ORG_ID },
      },
    ],
    body,
  });
}

function renderBlogIndex(baseHtml) {
  const url = `${SITE_URL}/blog`;
  const body = `<p><a href="/">← vbrion analytics</a></p><h1>vbrion analytics Blog</h1>
<p>Practical guides on software, ERP, analytics and compliance for hospitals, institutions and businesses.</p>
<ul>${blogPosts.map((p) => `<li><a href="/blog/${p.slug}">${escapeHtml(p.title)}</a> — ${escapeHtml(p.description)}</li>`).join('')}</ul>`;
  return finishPage(baseHtml, {
    title: 'Blog: Software, ERP & Analytics Guides | vbrion analytics',
    description: 'Practical guides on hospital software, college ERP, exam proctoring and custom software development from vbrion analytics, Erode.',
    url,
    graph: [
      breadcrumb([{ name: 'vbrion analytics', url: `${SITE_URL}/` }, { name: 'Blog', url }]),
      { '@type': 'Blog', '@id': `${url}#blog`, name: 'vbrion analytics Blog', url, publisher: { '@id': ORG_ID } },
    ],
    body,
  });
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
    { loc: `${SITE_URL}/blog`, changefreq: 'weekly', priority: '0.7' },
    ...servicePages.map((p) => ({ loc: `${SITE_URL}/services/${p.slug}`, changefreq: 'monthly', priority: '0.9' })),
    ...locationPages.map((p) => ({ loc: `${SITE_URL}/software-company-in/${p.slug}`, changefreq: 'monthly', priority: '0.8' })),
    ...blogPosts.map((p) => ({ loc: `${SITE_URL}/blog/${p.slug}`, changefreq: 'monthly', priority: '0.6' })),
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

module.exports = {
  renderHome, renderProject, renderNotFound, buildSitemap, SITE_URL,
  renderServicePage, renderLocationPage, renderBlogPost, renderBlogIndex,
  getServicePage, getLocationPage, getBlogPost,
};
