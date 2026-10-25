import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { portfolioCategories, portfolioProjects } from '../../data/portfolioData';
import CaseStudyModal from './CaseStudyModal';
import { ArrowRight, Eye, Sparkles, Filter, ExternalLink } from 'lucide-react';

export default function PortfolioSection({ onSelectServiceForContact }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeModalProject, setActiveModalProject] = useState(null);

  const filteredProjects = selectedCategory === 'all'
    ? portfolioProjects
    : portfolioProjects.filter(p => p.category === selectedCategory);

  const handleOpenCaseStudy = (project) => {
    setActiveModalProject(project);
  };

  const handleDiscussProject = (projectTitle) => {
    if (onSelectServiceForContact) {
      onSelectServiceForContact(projectTitle);
    }
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="portfolio" className="relative py-28 bg-[#FAFAFC] border-t border-slate-200 overflow-hidden">
      {/* Background ambient soft radiant lighting */}
      <div className="absolute top-1/4 left-1/4 w-[750px] h-[550px] bg-gradient-to-r from-blue-200/20 via-indigo-200/20 to-pink-200/20 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[450px] bg-gradient-to-tr from-amber-100/25 via-pink-100/25 to-purple-100/25 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-50 border border-pink-200 text-xs font-bold text-pink-700 uppercase tracking-wider mb-4 shadow-sm">
              <Eye className="w-3.5 h-3.5 text-pink-600" /> Proven Engineering &bull; Realized Outcomes
            </div>
            <h2 className="text-3xl sm:text-5xl font-montserrat font-extrabold text-slate-900 tracking-tight">
              Featured Case Studies &amp; <br />
              <span className="text-gradient-aurora">Engineered Milestones</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-600 max-w-md">
            Explore verified enterprise architecture blueprints and quantitative outcomes delivered across regulated industries.
          </p>
        </div>

        {/* Filter Tabs Bar (All | Consulting | Fintech | Healthcare | Banking | Education | Business Development) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {portfolioCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200 shadow-sm'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="group relative rounded-3xl overflow-hidden bg-white border border-slate-200/90 hover:border-purple-300 transition-all duration-500 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-2"
            >
              {/* Top multi-hue shine on hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

              <div>
                {/* Thumbnail Image with Tag */}
                <div className="relative h-52 sm:h-56 overflow-hidden">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                  
                  {/* Industry Tag */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-slate-900/85 backdrop-blur-md text-sky-300 border border-slate-700 shadow-sm">
                      {project.industryTag}
                    </span>
                  </div>

                  {/* Classification Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-slate-900/85 backdrop-blur-md text-pink-300 border border-slate-700 shadow-sm">
                      {project.badgeText}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="text-xl font-montserrat font-bold text-slate-900 mb-2.5 group-hover:text-indigo-600 transition-colors leading-snug">
                    {project.title}
                  </h3>

                  {/* One-line outcome as specified */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 mb-4">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-indigo-600 block mb-0.5">
                      Key Outcome
                    </span>
                    <p className="text-xs text-slate-700 font-medium leading-relaxed">
                      {project.outcome}
                    </p>
                  </div>

                  {/* Tech stack badge pills */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {project.techUsed.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-slate-100 text-slate-600 border border-slate-200"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techUsed.length > 4 && (
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-purple-50 text-purple-700 border border-purple-200">
                        +{project.techUsed.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions: Dynamic Route & Quick View */}
              <div className="px-6 pb-6 pt-2 flex items-center gap-2">
                <Link
                  to={`/project/${project.id}`}
                  className="flex-1 py-3 px-4 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-gradient-to-r hover:from-blue-600 hover:via-indigo-600 hover:to-purple-600 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                >
                  <span>View Case Study</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </Link>
                <button
                  onClick={() => handleOpenCaseStudy(project)}
                  className="p-3 rounded-xl text-xs text-slate-600 hover:text-indigo-600 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors"
                  title="Quick modal preview"
                  aria-label={`Quick preview for ${project.title}`}
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Global CTA Banner beneath Portfolio */}
        <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-xl sm:text-2xl font-montserrat font-bold text-slate-900 mb-2">
              Ready to engineer your own breakthrough?
            </h4>
            <p className="text-sm text-slate-600 max-w-xl">
              Connect with our principal architects to scope an empirical proof-of-concept tailored to your operational ecosystem.
            </p>
          </div>
          <a
            href="#contact"
            className="shrink-0 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-md hover:scale-105 transition-transform"
          >
            Initiate Project Discovery
          </a>
        </div>
      </div>

      {/* Case Study Modal Detail View */}
      <CaseStudyModal
        project={activeModalProject}
        isOpen={!!activeModalProject}
        onClose={() => setActiveModalProject(null)}
        onDiscussProject={handleDiscussProject}
      />
    </section>
  );
}
