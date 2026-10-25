import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowRight, CheckCircle2, Cpu, BarChart3, AlertCircle, Layers, ExternalLink } from 'lucide-react';

export default function CaseStudyModal({ project, isOpen, onClose, onDiscussProject }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-slate-900/60 backdrop-blur-md overflow-y-auto animate-fadeIn">
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-4xl bg-white border border-slate-200/90 rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col my-auto text-slate-800">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/90">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200">
              {project.industryTag}
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-50 text-amber-700 border border-amber-200">
              {project.badgeText}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Header Banner */}
          <div>
            <h3 className="text-2xl sm:text-3xl font-montserrat font-bold text-slate-900 mb-3">
              {project.title}
            </h3>
            <p className="text-base text-indigo-600 font-semibold leading-relaxed">
              Outcome: {project.outcome}
            </p>
          </div>

          {/* Project Thumbnail Image with Subtle Overlay */}
          <div className="relative h-60 sm:h-80 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-slate-200 shadow-sm">
              <p className="text-xs text-slate-700 font-medium">
                {project.summary}
              </p>
            </div>
          </div>

          {/* Quantified Results Grid */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-indigo-600" /> Quantified Impact &amp; Results
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {project.results.map((res, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="text-2xl sm:text-3xl font-montserrat font-extrabold text-indigo-600 mb-1">
                    {res.metric}
                  </div>
                  <div className="text-xs text-slate-600 font-medium">
                    {res.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Challenge, Approach & Solution Detailed Architecture */}
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-rose-50/50 border border-rose-100">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-700 block mb-1">
                The Core Challenge
              </span>
              <p className="text-sm text-slate-700 leading-relaxed">
                {project.challenge}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-sky-50/50 border border-sky-100">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-700 block mb-1">
                Strategic Approach
              </span>
              <p className="text-sm text-slate-700 leading-relaxed">
                {project.approach}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
                Engineered Solution
              </span>
              <p className="text-sm text-slate-700 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Tech Stack Badges */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-indigo-600" /> Technologies &amp; Tooling Deployed
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techUsed.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-slate-100 text-slate-800 border border-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-6 border-t border-slate-200 bg-slate-50/90 gap-4">
          <div className="flex items-center gap-4">
            <Link
              to={`/project/${project.id}`}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 hover:underline inline-flex items-center gap-1.5"
            >
              <span>Open Dedicated Page &amp; Shareable URL</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
          <button
            onClick={() => {
              onClose();
              if (onDiscussProject) onDiscussProject(project.title);
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:opacity-95 shadow-md transition-all"
          >
            <span>Discuss This Solution With Us</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
