import React from 'react';
import type { Metadata } from 'next';
import PageTransition from '@/components/PageTransition';
import { User, Building, GraduationCap } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact | BOUESTI Spam Email Detection System',
  description: 'Contact the BOUESTI spam detection research team. Esan Oluwaferanmi Elizabeth (5029), Daramola Micheal Olaniyi (5022), and Ajimo Samson Oluwasanmi (4955). Department of Computing and Information Science, Bamidele Olumilua University, Ikere-Ekiti.',
  openGraph: {
    title: 'Contact | BOUESTI Spam Email Detection Team',
    description: 'Reach out to the student research team behind the BOUESTI intelligent spam email detection system.',
    type: 'website',
  },
};



const STUDENTS = [
  { name: 'Esan Oluwaferanmi Elizabeth', matric: '5029' },
  { name: 'Daramola Micheal Olaniyi', matric: '5022' },
  { name: 'Ajimo Samson Oluwasanmi', matric: '4955' }
];

export default function ContactPage() {
  return (
    <PageTransition className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 space-y-8 sm:space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">Contact the Research Team</h1>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          Get in touch with the BOUESTI Computer Science project team or project supervisor.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column: Team Cards & Institutional Info */}
        <div className="space-y-8">
          {/* Department Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 space-y-4 shadow-xl">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <Building className="w-6 h-6 text-emerald-400" />
              <h3 className="text-lg font-bold text-white">Department & Institution</h3>
            </div>
            <div className="space-y-2 text-sm text-slate-300">
              <p className="font-semibold text-white">Department of Computing and Information Science</p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Bamidele Olumilua University of Education, Science and Technology, Ikere-Ekiti (BOUESTI), Ekiti State, Nigeria.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs text-emerald-400">
                <GraduationCap className="w-4 h-4 text-amber-400" />
                <span>Supervised by: <strong>Mrs. Ariyo</strong></span>
              </div>
            </div>
          </div>

          {/* Team Members List */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 space-y-4 shadow-xl">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <User className="w-5 h-5 text-amber-400" />
              <span>Student Authors</span>
            </h3>
            <div className="space-y-3">
              {STUDENTS.map((student, idx) => (
                <div key={idx} className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white text-sm">{student.name}</div>
                    <div className="text-xs text-slate-400">Research & Development</div>
                  </div>
                  <div className="bg-emerald-950 border border-emerald-800 text-amber-400 text-xs font-mono px-2.5 py-1 rounded-md font-bold">
                    Matric: {student.matric}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <ContactForm />
      </div>
    </PageTransition>
  );
}

