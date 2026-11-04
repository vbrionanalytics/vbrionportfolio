import { portfolioProjects } from '../data/portfolioData';
import { servicesData } from '../data/servicesData';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

/**
 * Dynamic API service with instant local fallback
 * Ensures the web app is fully dynamic and connected to backend, while completely resilient
 */
export async function getProjects(category = 'all') {
  try {
    const query = category && category !== 'all' ? `?category=${category}` : '';
    const res = await fetch(`${API_BASE}/projects${query}`);
    if (!res.ok) throw new Error('Network error');
    const data = await res.json();
    return data?.data || portfolioProjects;
  } catch (err) {
    // Graceful fallback to static seed data
    if (!category || category === 'all') return portfolioProjects;
    return portfolioProjects.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }
}

export async function getProjectById(id) {
  try {
    const res = await fetch(`${API_BASE}/projects/${id}`);
    if (!res.ok) throw new Error('Network error');
    const data = await res.json();
    return data?.data || portfolioProjects.find(p => p.id === id);
  } catch (err) {
    return portfolioProjects.find(p => p.id === id);
  }
}

export async function getServices(division = null) {
  try {
    const query = division ? `?division=${division}` : '';
    const res = await fetch(`${API_BASE}/services${query}`);
    if (!res.ok) throw new Error('Network error');
    const data = await res.json();
    return data?.data || servicesData;
  } catch (err) {
    return servicesData;
  }
}

/**
 * Record a client CTA lead in the database
 */
export async function submitCtaLead(payload) {
  try {
    const res = await fetch(`${API_BASE}/cta`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    console.warn('[apiService] CTA tracking error:', err.message);
    return { ok: false, error: err.message };
  }
}

/**
 * Track high-intent CTA events (e.g. deck downloads, consultation clicks)
 */
export async function trackCtaEvent(ctaType, ctaLabel, ctaSource, metadata = {}) {
  try {
    return await submitCtaLead({
      ctaType,
      ctaLabel,
      ctaSource,
      metadata: {
        ...metadata,
        url: typeof window !== 'undefined' ? window.location.href : '',
        timestamp: new Date().toISOString()
      }
    });
  } catch (err) {
    return { ok: false };
  }
}

/**
 * Retrieve CTA lead stats from DB
 */
export async function getCtaStats() {
  try {
    const res = await fetch(`${API_BASE}/cta/stats`);
    if (!res.ok) throw new Error('Failed to fetch stats');
    return await res.json();
  } catch (err) {
    return null;
  }
}

