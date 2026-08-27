import React from 'react';
import type { Metadata } from 'next';
import PageTransition from '@/components/PageTransition';
import { GraduationCap, Users, Award, Code2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About the Project | BOUESTI Spam Email Detection System',
  description: 'B.Sc Final Year Computer Science project on intelligent spam email detection. Authors: Esan Oluwaferanmi Elizabeth (5029), Daramola Micheal Olaniyi (5022), Ajimo Samson Oluwasanmi (4955). Supervisor: Ariyo Opeyemi Jumoke. Institution: Bamidele Olumilua University of Education, Science and Technology, Ikere-Ekiti (BOUESTI). Web development by SUNNYTECH ALL-IN-ONE SOLUTION.',
  keywords: [
    'Ariyo Opeyemi Jumoke', 'Ariyo BOUESTI', 'BOUESTI supervisor', 'Mrs Ariyo BOUESTI',
    'Esan Oluwaferanmi Elizabeth', 'Daramola Micheal Olaniyi', 'Ajimo Samson Oluwasanmi',
    'BOUESTI final year project', 'Bamidele Olumilua University', 'Ikere-Ekiti',
    'Department of Computing and Information Science', 'BOUESTI Computer Science 2026',
    'SUNNYTECH ALL-IN-ONE SOLUTION', 'Sunnytech Nigeria',
  ],
  openGraph: {
    title: 'About | BOUESTI Spam Detection — Ariyo Opeyemi Jumoke, Esan Elizabeth, Daramola Micheal, Ajimo Samson',
    description: 'B.Sc Computer Science Final Year Project at BOUESTI. Supervised by Ariyo Opeyemi Jumoke. Team: Esan Oluwaferanmi Elizabeth, Daramola Micheal Olaniyi, Ajimo Samson Oluwasanmi. Web by SUNNYTECH ALL-IN-ONE SOLUTION.',
    type: 'website',
  },
};

const STUDENTS = [
  { name: 'Esan Oluwaferanmi Elizabeth', matric: '5029', role: 'Research & Development' },
  { name: 'Daramola Micheal Olaniyi', matric: '5022', role: 'Research & Development' },
  { name: 'Ajimo Samson Oluwasanmi', matric: '4955', role: 'Research & Development' }
];

export default function AboutPage() {
  return (
    <PageTransition className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">About This Project</h1>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          Academic research background, project motivation, team roster, and institutional credits.
        </p>
      </div>

      {/* Section 1: Project Description */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-emerald-400" />
          <span>Project Overview &amp; Problem Statement</span>
        </h2>
        <div className="text-sm text-slate-300 space-y-4 leading-relaxed font-normal">
          <p>
            This project presents the <strong>Design and Implementation of an Intelligent Spam Email Detection System Using Machine Learning</strong>. The system classifies emails as either spam (unsolicited or malicious) or ham (legitimate) using supervised machine learning algorithms trained on the Enron Spam Dataset.
          </p>
          <p>
            Traditional rule-based and heuristic spam filters rely on static keywords and predefined blacklists. While initially effective, they struggle to adapt to evolving spam tactics, including content obfuscation, image-based content, and AI-generated phishing emails. This system addresses those limitations by learning patterns directly from labeled email data, enabling accurate, real-time classification of new and unseen emails.
          </p>
        </div>
      </div>

      {/* Section 2: Team & Academic Supervision */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Users className="w-5 h-5 text-amber-400" />
          <span>Project Research Team</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300 border-collapse">
            <thead>
              <tr className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase text-[11px] font-semibold tracking-wider">
                <th className="py-3.5 px-4">Student Name</th>
                <th className="py-3.5 px-4">Matric Number</th>
                <th className="py-3.5 px-4">Project Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-medium">
              {STUDENTS.map((student, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40 transition">
                  <td className="py-4 px-4 font-bold text-white">{student.name}</td>
                  <td className="py-4 px-4 text-amber-400 font-mono">{student.matric}</td>
                  <td className="py-4 px-4 text-slate-400">{student.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="border-t border-slate-800/80 pt-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
          <div className="space-y-1 bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-slate-500 text-xs font-semibold uppercase">Supervisor</span>
            <div className="text-white font-bold text-base">Ariyo Opeyemi Jumoke</div>
            <div className="text-xs text-slate-400">Project Supervisor &amp; Academic Advisor</div>
          </div>
          <div className="space-y-1 bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-slate-500 text-xs font-semibold uppercase">Institution</span>
            <div className="text-white font-bold text-base">BOUESTI</div>
            <div className="text-xs text-slate-400">
              Department of Computing and Information Science<br />
              Bamidele Olumilua University of Education, Science and Technology, Ikere-Ekiti
            </div>
          </div>
        </div>

        <div className="space-y-1 bg-slate-950 p-4 rounded-xl border border-slate-800">
          <span className="text-slate-500 text-xs font-semibold uppercase">Web Development</span>
          <div className="text-white font-bold text-base">SUNNYTECH ALL-IN-ONE SOLUTION</div>
          <div className="text-xs text-slate-400">Website Design, Development &amp; Deployment</div>
        </div>

        <div className="text-xs text-slate-400 text-center italic border-t border-slate-800/60 pt-4">
          Submitted in Partial Fulfillment for the Award of the Degree of Bachelor of Science (B.Sc) in Computer Science.
        </div>
      </div>

      {/* Section 3: Acknowledgments */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex items-center gap-2 text-teal-400 font-bold text-base sm:text-lg">
          <Award className="w-5 h-5" />
          <span>Acknowledgments</span>
        </div>
        <ul className="text-xs sm:text-sm text-slate-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>Enron Spam Dataset creators &amp; open-source repository maintainers.</li>
          <li>scikit-learn, NLTK, Python, and Next.js open-source communities.</li>
          <li>BOUESTI Department of Computing and Information Science.</li>
          <li>Supervisor: Ariyo Opeyemi Jumoke — for academic guidance throughout the project.</li>
        </ul>
      </div>
    </PageTransition>
  );
}
