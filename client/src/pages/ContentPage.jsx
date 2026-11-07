import React, { useEffect, useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Mail, Phone, MapPin } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import FloatingQuickActions from '../components/common/FloatingQuickActions';
import { getContentPage } from '../services/apiService';
import { serviceLinks, locationLinks } from '../data/seoPages';
import siteConfig from '../config/siteConfig';

/**
 * Generic SEO landing page. `type` is "services" | "locations" | "blog".
 * The server also renders the same content (plus meta tags and schema) into the HTML for crawlers.
 */
export default function ContentPage({ type }) {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    getContentPage(type, slug).then((data) => {
      if (alive) {
        setPage(data);
        setLoading(false);
      }
    });
    return () => { alive = false; };
  }, [type, slug]);

  useEffect(() => {
    if (!page) return undefined;
    const previous = document.title;
    document.title = page.title || `${page.name} | vbrion analytics`;
    return () => { document.title = previous; };
  }, [page]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFC] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!page) return <Navigate to="/" replace />;

  const isBlog = type === 'blog';
  const isLocation = type === 'locations';
  const relatedService = isBlog ? serviceLinks.find((s) => s.slug === page.relatedService) : null;
  const locationServices = isLocation
    ? (page.serviceSlugs || []).map((s) => serviceLinks.find((l) => l.slug === s)).filter(Boolean)
    : [];

  return (
    <div className="min-h-screen bg-[#FAFAFC] text-slate-700 font-inter">
      <Navbar />

      <main className="pt-32 sm:pt-36 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-8 pb-4 border-b border-slate-200">
            <Link to="/" className="hover:text-indigo-600">Home</Link>
            <span>/</span>
            {isBlog && (
              <>
                <Link to="/blog" className="hover:text-indigo-600">Blog</Link>
                <span>/</span>
              </>
            )}
            <span className="text-indigo-600 font-semibold">{isBlog ? page.title : page.name || page.city}</span>
          </nav>

          <h1 className="text-3xl sm:text-5xl font-montserrat font-extrabold text-slate-900 tracking-tight leading-tight mb-5">
            {isBlog ? page.title : page.h1}
          </h1>

          {isBlog ? (
            <p className="text-xs text-slate-500 mb-8">{page.date} · {page.readMinutes} min read</p>
          ) : (
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-10">{page.intro}</p>
          )}

          {isLocation && page.paragraphs.map((t, i) => (
            <p key={i} className="text-slate-600 leading-relaxed mb-5">{t}</p>
          ))}

          {isBlog && page.sections.map((sec) => (
            <section key={sec.h2} className="mb-8">
              <h2 className="text-2xl font-montserrat font-bold text-slate-900 mb-3">{sec.h2}</h2>
              {sec.paragraphs.map((t, i) => (
                <p key={i} className="text-slate-600 leading-relaxed mb-3">{t}</p>
              ))}
            </section>
          ))}

          {page.highlights && (
            <section className="mb-12">
              <h2 className="text-2xl font-montserrat font-bold text-slate-900 mb-5">Key features</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {page.highlights.map((h) => (
                  <div key={h.title} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                    <h3 className="font-montserrat font-bold text-slate-900 mb-1.5">{h.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{h.text}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {page.capabilities && (
            <section className="mb-12">
              <h2 className="text-2xl font-montserrat font-bold text-slate-900 mb-5">What we deliver</h2>
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                {page.capabilities.map((c) => (
                  <li key={c} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
              {page.techStack && page.techStack.length > 0 && (
                <p className="text-xs text-slate-500 mt-5">
                  <span className="font-semibold text-slate-700">Technology: </span>
                  {page.techStack.join(' · ')}
                </p>
              )}
            </section>
          )}

          {page.projects && page.projects.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-montserrat font-bold text-slate-900 mb-5">Related case studies</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {page.projects.map((p) => (
                  <Link
                    key={p.id}
                    to={`/project/${p.id}`}
                    className="group bg-white border border-slate-200 hover:border-indigo-300 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 mb-1.5">{p.industryTag}</p>
                    <h3 className="font-montserrat font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">{p.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">{p.summary}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {isLocation && locationServices.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-montserrat font-bold text-slate-900 mb-5">Our services</h2>
              <ul className="space-y-2">
                {locationServices.map((s) => (
                  <li key={s.slug}>
                    <Link to={`/services/${s.slug}`} className="inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-800 font-semibold text-sm">
                      {s.name} <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="flex items-start gap-2 text-sm text-slate-600 mt-6">
                <MapPin className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" /> {page.address}
              </p>
            </section>
          )}

          {relatedService && (
            <p className="mb-10 text-sm">
              Related service:{' '}
              <Link to={`/services/${relatedService.slug}`} className="text-indigo-600 font-semibold hover:underline">
                {relatedService.name}
              </Link>
            </p>
          )}

          {page.faqs && page.faqs.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-montserrat font-bold text-slate-900 mb-5">Frequently asked questions</h2>
              <div className="space-y-3">
                {page.faqs.map((f) => (
                  <details key={f.q} className="bg-white border border-slate-200 rounded-xl p-4 group">
                    <summary className="cursor-pointer font-semibold text-slate-900 text-sm list-none flex justify-between gap-4">
                      {f.q}
                      <span className="text-indigo-600 group-open:rotate-45 transition-transform">+</span>
                    </summary>
                    <p className="text-sm text-slate-600 leading-relaxed mt-3">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 text-white shadow-lg">
            <h2 className="text-2xl font-montserrat font-bold mb-2">Talk to the vbrion team</h2>
            <p className="text-sm text-white/90 mb-5">Tell us what you need and we will recommend a practical approach.</p>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <Link to="/#contact" className="px-5 py-2.5 rounded-xl bg-white text-indigo-700 font-semibold hover:bg-slate-100 transition-colors">
                Get in touch
              </Link>
              <a href={`mailto:${siteConfig.contact.email}`} className="inline-flex items-center gap-1.5 hover:underline">
                <Mail className="w-4 h-4" /> {siteConfig.contact.email}
              </a>
              <a href={`tel:${siteConfig.contact.phoneRaw}`} className="inline-flex items-center gap-1.5 hover:underline">
                <Phone className="w-4 h-4" /> {siteConfig.contact.phone}
              </a>
            </div>
          </section>

          <section className="mt-14 pt-8 border-t border-slate-200 grid sm:grid-cols-2 gap-8 text-sm">
            <div>
              <h3 className="font-montserrat font-bold text-slate-900 mb-3">More solutions</h3>
              <ul className="space-y-1.5">
                {serviceLinks.filter((s) => s.slug !== slug).slice(0, 6).map((s) => (
                  <li key={s.slug}>
                    <Link to={`/services/${s.slug}`} className="text-indigo-600 hover:underline">{s.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-montserrat font-bold text-slate-900 mb-3">Where we work</h3>
              <ul className="space-y-1.5">
                {locationLinks.map((l) => (
                  <li key={l.slug}>
                    <Link to={`/software-company-in/${l.slug}`} className="text-indigo-600 hover:underline">Software company in {l.city}</Link>
                  </li>
                ))}
                <li><Link to="/blog" className="text-indigo-600 hover:underline">Read our blog</Link></li>
              </ul>
            </div>
          </section>
        </div>
      </main>

      <Footer />
      <FloatingQuickActions />
    </div>
  );
}
