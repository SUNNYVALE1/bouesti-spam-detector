import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar, Footer } from '@/components/Layout';
import AIChatWidget from '@/components/AIChatWidget';
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Intelligent Spam Email Detection System | BOUESTI Final Year Project',
  description: 'Machine learning-powered spam email detection system developed by Esan Oluwaferanmi Elizabeth, Daramola Micheal Olaniyi, and Ajimo Samson Oluwasanmi at Bamidele Olumilua University of Education, Science and Technology, Ikere-Ekiti (BOUESTI). Supervised by Ariyo Opeyemi Jumoke. Web development by SUNNYTECH ALL-IN-ONE SOLUTION.',
  keywords: [
    // School / Institution
    'BOUESTI', 'Bamidele Olumilua University', 'Bamidele Olumilua University of Education Science and Technology',
    'Ikere-Ekiti', 'Ekiti State', 'BOUESTI Computer Science', 'BOUESTI final year project',
    'Department of Computing and Information Science BOUESTI',
    // Supervisor
    'Ariyo Opeyemi Jumoke', 'Mrs Ariyo BOUESTI', 'Ariyo BOUESTI supervisor',
    // Students / Authors
    'Esan Oluwaferanmi Elizabeth', 'Daramola Micheal Olaniyi', 'Ajimo Samson Oluwasanmi',
    'Esan Oluwaferanmi', 'Daramola Micheal', 'Ajimo Samson',
    // Developer / Company
    'SUNNYTECH ALL-IN-ONE SOLUTION', 'Sunnytech', 'Sunnytech Nigeria', 'Sunday Ogundele',
    // Project / Technical
    'Spam Email Detection', 'Machine Learning', 'Computer Science Project', 'Final Year Project Nigeria',
    'Enron Spam Dataset', 'Email Security', 'Logistic Regression', 'TF-IDF',
    'Natural Language Processing', 'NLP', 'Email Classifier', 'Spam Detection Nigeria',
  ],
  authors: [
    { name: 'Esan Oluwaferanmi Elizabeth' },
    { name: 'Daramola Micheal Olaniyi' },
    { name: 'Ajimo Samson Oluwasanmi' },
    { name: 'Ariyo Opeyemi Jumoke' },
  ],
  verification: {
    google: '56852ae9e6d67aec',
  },
  openGraph: {
    title: 'BOUESTI Intelligent Spam Email Detection System | Final Year Project',
    description: 'B.Sc Final Year Computer Science Project at BOUESTI (Bamidele Olumilua University, Ikere-Ekiti). Authors: Esan Oluwaferanmi Elizabeth, Daramola Micheal Olaniyi & Ajimo Samson Oluwasanmi. Supervisor: Ariyo Opeyemi Jumoke. Web: SUNNYTECH ALL-IN-ONE SOLUTION.',
    type: 'website',
    locale: 'en_US',
    siteName: 'BOUESTI Spam Email Detector',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Intelligent Spam Email Detection System",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web",
    "author": [
      {
        "@type": "Person",
        "name": "Esan Oluwaferanmi Elizabeth",
        "jobTitle": "Student Researcher"
      },
      {
        "@type": "Person",
        "name": "Daramola Micheal Olaniyi",
        "jobTitle": "Student Researcher"
      },
      {
        "@type": "Person",
        "name": "Ajimo Samson Oluwasanmi",
        "jobTitle": "Student Researcher"
      }
    ],
    "contributor": {
      "@type": "Person",
      "name": "Ariyo Opeyemi Jumoke",
      "jobTitle": "Supervisor / Lecturer",
      "affiliation": {
        "@type": "EducationalOrganization",
        "name": "Bamidele Olumilua University of Education, Science and Technology, Ikere-Ekiti (BOUESTI)"
      }
    },
    "publisher": {
      "@type": "EducationalOrganization",
      "name": "Bamidele Olumilua University of Education, Science and Technology, Ikere-Ekiti (BOUESTI)",
      "alternateName": "BOUESTI",
      "location": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Ikere-Ekiti",
          "addressRegion": "Ekiti State",
          "addressCountry": "Nigeria"
        }
      }
    },
    "creator": {
      "@type": "Organization",
      "name": "SUNNYTECH ALL-IN-ONE SOLUTION",
      "alternateName": "Sunnytech",
      "url": "https://bouestispamdetector.com.ng"
    },
    "description": "A machine learning system achieving 99.00% accuracy in detecting spam emails. B.Sc Final Year Project — Department of Computing and Information Science, Bamidele Olumilua University of Education, Science and Technology, Ikere-Ekiti (BOUESTI). Supervised by Ariyo Opeyemi Jumoke.",
    "url": "https://bouestispamdetector.com.ng",
    "sameAs": "https://bouesti-spam-detector.vercel.app"
  };

  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-slate-950 text-slate-100 flex flex-col min-h-screen font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
        <noscript>
          <div className="bg-red-600 text-white p-4 text-center font-bold z-[9999] relative">
            JavaScript is required to use this application.
          </div>
        </noscript>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <AIChatWidget />
        {/* We will update gaId below once Google Analytics is set up */}
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </body>
    </html>
  );
}
