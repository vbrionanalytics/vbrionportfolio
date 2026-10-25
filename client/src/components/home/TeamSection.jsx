import React from 'react';
import { teamMembers } from '../../data/companyData';
import { Users, Sparkles, Award, Code2 } from 'lucide-react';

export default function TeamSection() {
  return (
    <section id="team" className="relative py-28 bg-[#FAFAFC] border-t border-slate-200 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-indigo-100/30 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-bold text-indigo-700 uppercase tracking-wider mb-4 shadow-sm">
            <Users className="w-3.5 h-3.5" /> Our Pillars
          </div>
          <h2 className="text-3xl sm:text-5xl font-montserrat font-extrabold text-slate-900 tracking-tight mb-4">
            Leadership &amp; Core Pillars <br />
            <span className="text-gradient">Steering What&apos;s Next</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
            Meet the visionary founders, technology heads, and engineering specialists powering vbrion&apos;s digital transformation and client success.
          </p>
        </div>

        {/* Pillars Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {teamMembers.map((member) => {
            const isDirector = member.role?.includes('Director');
            const isHead = member.role?.toLowerCase().includes('head');
            const isLead = member.role?.toLowerCase().includes('lead');

            return (
              <div
                key={member.id}
                className="bg-white group rounded-3xl overflow-hidden border border-slate-200/90 hover:border-purple-300 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1.5 flex flex-col justify-between relative"
              >
                {/* Top multi-hue shine on hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

                <div>
                  {/* Photo with studio frame & smooth bottom vignette */}
                  <div className="relative h-72 sm:h-80 overflow-hidden bg-slate-950 flex items-center justify-center">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-85" />
                    
                    {/* Role Badge in Top Right */}
                    <div className="absolute top-4 right-4 z-10">
                      {isDirector ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-slate-900/90 backdrop-blur-md text-amber-300 border border-slate-700 shadow-sm">
                          <Sparkles className="w-2.5 h-2.5" /> Leadership
                        </span>
                      ) : isHead ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-slate-900/90 backdrop-blur-md text-emerald-300 border border-slate-700 shadow-sm">
                          <Award className="w-2.5 h-2.5 text-emerald-300" /> Executive Head
                        </span>
                      ) : isLead ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-slate-900/90 backdrop-blur-md text-sky-300 border border-slate-700 shadow-sm">
                          <Award className="w-2.5 h-2.5 text-sky-300" /> Tech Lead
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-slate-900/90 backdrop-blur-md text-slate-300 border border-slate-700 shadow-sm">
                          <Code2 className="w-2.5 h-2.5" /> Engineering
                        </span>
                      )}
                    </div>

                    {/* Domain Focus Tag floating on bottom of image */}
                    {member.specialization && (
                      <div className="absolute bottom-3 left-3 right-3 z-10">
                        <span className="block truncate text-center text-[10px] font-semibold text-slate-200 bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-lg border border-slate-800 shadow-sm">
                          {member.specialization}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-montserrat font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-3">
                      {member.role}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

