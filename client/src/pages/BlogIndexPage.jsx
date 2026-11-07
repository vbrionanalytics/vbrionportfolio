import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import FloatingQuickActions from '../components/common/FloatingQuickActions';
import { getContentIndex } from '../services/apiService';

export default function BlogIndexPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const previous = document.title;
    document.title = 'Blog: Software, ERP & Analytics Guides | vbrion analytics';
    getContentIndex().then((data) => setPosts(data?.blog || []));
    return () => { document.title = previous; };
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFC] text-slate-700 font-inter">
      <Navbar />
      <main className="pt-32 sm:pt-36 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-5xl font-montserrat font-extrabold text-slate-900 tracking-tight mb-4">
            vbrion analytics Blog
          </h1>
          <p className="text-slate-600 mb-10">
            Practical guides on software, ERP, analytics and compliance for hospitals, institutions and businesses.
          </p>
          <div className="space-y-5">
            {posts.map((p) => (
              <Link
                key={p.slug}
                to={`/blog/${p.slug}`}
                className="group block bg-white border border-slate-200 hover:border-indigo-300 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all"
              >
                <p className="text-xs text-slate-500 mb-2">{p.date} · {p.readMinutes} min read</p>
                <h2 className="text-xl font-montserrat font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-2">{p.title}</h2>
                <p className="text-sm text-slate-600 mb-3">{p.description}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600">
                  Read article <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <FloatingQuickActions />
    </div>
  );
}
