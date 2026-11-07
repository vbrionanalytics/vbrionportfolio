const express = require('express');
const router = express.Router();
const { servicePages, locationPages, blogPosts } = require('../seo/content');
const projectRepository = require('../repositories/projectRepository');

const collections = { services: servicePages, locations: locationPages, blog: blogPosts };

// Lightweight lists for navigation, footers and the blog index
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: {
      services: servicePages.map(({ slug, name }) => ({ slug, name })),
      locations: locationPages.map(({ slug, city }) => ({ slug, city })),
      blog: blogPosts.map(({ slug, title, description, date, readMinutes }) => ({ slug, title, description, date, readMinutes })),
    },
  });
});

router.get('/:type/:slug', async (req, res) => {
  const list = collections[req.params.type];
  const page = list && list.find((p) => p.slug === req.params.slug);
  if (!page) return res.status(404).json({ success: false, error: 'Page not found' });

  const payload = { ...page };
  if (req.params.type === 'services' && page.projectIds) {
    const all = await projectRepository.getAll();
    payload.projects = page.projectIds
      .map((id) => all.find((p) => p.id === id))
      .filter(Boolean)
      .map(({ id, title, summary, industryTag, thumbnail }) => ({ id, title, summary, industryTag, thumbnail }));
  }
  res.json({ success: true, data: payload });
});

module.exports = router;
