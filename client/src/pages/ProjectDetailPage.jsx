import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProjectById, getProjects } from '../services/apiService';
import { ArrowLeft, ArrowRight, BarChart3, Cpu, CheckCircle2, Share2, Layers, Sparkles } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import CustomCursor from '../components/common/CustomCursor';
import FloatingQuickActions from '../components/common/FloatingQuickActions';

export default function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setLoading(true);
      const [projData, allData] = await Promise.all([
        getProjectById(id),
        getProjects('all')
      ]);
      if (isMounted) {
        setProject(projData);
        setAllProjects(allData);
        setLoading(false);
      }
    }
    loadData();
    return () => { isMounted = false; };
  }, [id]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFC] text-slate-800 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
          <span className="text-xs font-mono uppercase tracking-widest text-indigo-600 font-semibold">Loading Case Study...</span>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#FAFAFC] text-slate-800 flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-3xl font-montserrat font-bold mb-4 text-slate-900">Case Study Not Found</h2>
        <p className="text-sm text-slate-600 max-w-md mb-8">
          The requested case study could not be located or may have been updated.
        </p>
        <Link
          to="/#portfolio"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 font-semibold text-sm text-white shadow-md hover:opacity-95"
        >
          Return to Portfolio
        </Link>
      </div>
    );
  }

  // Calculate Next and Previous Project for dynamic sequential browsing
  const currentIndex = allProjects.findIndex(p => p.id === project.id);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : allProjects[allProjects.length - 1];
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : allProjects[0];

  return (
    <div className="min-h-screen bg-[#FAFAFC] text-slate-700 font-inter relative selection:bg-indigo-500/20 selection:text-indigo-600">
      <CustomCursor />
      <Navbar />

      <main className="pt-32 sm:pt-36 pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb & Navigation Topbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 text-xs font-medium pb-4 border-b border-slate-200">
            <div className="flex items-center gap-2 text-slate-500">
              <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
              <span>/</span>
              <Link to="/#portfolio" className="hover:text-indigo-600 transition-colors">Case Studies</Link>
              <span>/</span>
              <span className="text-indigo-600 font-semibold">{project.industryTag}</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-xs text-slate-700 border border-slate-200 shadow-sm transition-colors"
              >
                <Share2 className="w-3.5 h-3.5 text-indigo-600" />
                <span>{copied ? 'Link Copied!' : 'Share'}</span>
              </button>

              <Link
                to="/#portfolio"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-xs text-indigo-600 border border-slate-200 shadow-sm transition-colors font-semibold"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>All Projects</span>
              </Link>
            </div>
          </div>

          {/* Hero Header of Case Study */}
          <div className="space-y-4 mb-10">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-sm">
                {project.industryTag}
              </span>
              <span className="px-3 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-pink-50 text-pink-700 border border-pink-200 font-bold shadow-sm">
                {project.badgeText}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-montserrat font-extrabold text-slate-900 tracking-tight leading-tight">
              {project.title}
            </h1>

            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 block mb-1">
                Verified Quantitative Outcome:
              </span>
              <p className="text-base sm:text-lg font-semibold text-slate-900 leading-relaxed">
                {project.outcome}
              </p>
            </div>
          </div>

          {/* Hero Image / Banner */}
          <div className="relative h-72 sm:h-96 rounded-3xl overflow-hidden border border-slate-200 mb-12 shadow-lg">
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-sm">
              <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                {project.summary}
              </p>
            </div>
          </div>

          {/* Quantified Results Section */}
          <div className="mb-14">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
              <h2 className="text-xl font-montserrat font-bold text-slate-900">Quantified Business Impact</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {project.results.map((res, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-indigo-400 hover:shadow-md transition-all">
                  <div className="text-3xl sm:text-4xl font-montserrat font-black text-indigo-600 mb-1">
                    {res.metric}
                  </div>
                  <div className="text-xs font-semibold text-slate-600">
                    {res.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Deep Narrative Grid: Challenge, Approach, Solution */}
          <div className="space-y-6 mb-14">
            <div className="p-7 rounded-3xl bg-rose-50/50 border border-rose-100 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-700 block mb-2">
                1. The Strategic Challenge
              </span>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {project.challenge}
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-sky-50/50 border border-sky-100 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-700 block mb-2">
                2. Methodological Approach
              </span>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {project.approach}
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-emerald-50/50 border border-emerald-100 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-2">
                3. Engineered Technical Solution
              </span>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Technologies Deployed Badges */}
          <div className="mb-16 p-7 rounded-3xl bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Cpu className="w-5 h-5 text-indigo-600" />
              <h3 className="text-base font-montserrat font-bold text-slate-900">Production Tech Stack Deployed</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.techUsed.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium bg-slate-100 text-slate-800 border border-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Next / Previous Project Navigation Switcher */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16 pt-8 border-t border-slate-200">
            {prevProject && (
              <Link
                to={`/project/${prevProject.id}`}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-indigo-400 hover:shadow-md transition-all flex items-center justify-between group"
              >
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block mb-1">
                    &larr; Previous Case Study
                  </span>
                  <span className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {prevProject.title}
                  </span>
                </div>
              </Link>
            )}

            {nextProject && (
              <Link
                to={`/project/${nextProject.id}`}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-indigo-400 hover:shadow-md transition-all flex items-center justify-between text-right group"
              >
                <div className="ml-auto">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block mb-1">
                    Next Case Study &rarr;
                  </span>
                  <span className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {nextProject.title}
                  </span>
                </div>
              </Link>
            )}
          </div>

          {/* Bottom Consultation Call-to-Action */}
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-lg text-center space-y-4">
            <h3 className="text-2xl sm:text-3xl font-montserrat font-bold text-slate-900">
              Face a Similar Enterprise Challenge?
            </h3>
            <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
              Our principal consulting and machine learning architects can tailor a proof of concept for your domain.
            </p>
            <div className="pt-2">
              <Link
                to="/#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-md hover:shadow-lg hover:opacity-95 transition-all"
              >
                <span>Initiate Technical Scoping</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingQuickActions />
    </div>
  );
}
