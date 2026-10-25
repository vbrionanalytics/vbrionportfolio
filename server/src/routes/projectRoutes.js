const express = require('express');
const router = express.Router();
const projectRepository = require('../repositories/projectRepository');

router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const projects = await projectRepository.getAll({ category });
    res.json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const project = await projectRepository.getById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, error: 'Project case study not found' });
    }
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
