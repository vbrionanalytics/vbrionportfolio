const fs = require('fs');
const path = require('path');

const seedProjectsPath = path.join(__dirname, '../seeds/projects.json');
let cachedProjects = [];

try {
  const raw = fs.readFileSync(seedProjectsPath, 'utf8');
  cachedProjects = JSON.parse(raw);
} catch (err) {
  console.warn('[ProjectRepository] Could not read seeds/projects.json directly, fallback array used', err.message);
}

class ProjectRepository {
  async getAll({ category } = {}) {
    if (!category || category === 'all') {
      return cachedProjects;
    }
    return cachedProjects.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  async getById(id) {
    return cachedProjects.find(p => p.id === id);
  }
}

module.exports = new ProjectRepository();
