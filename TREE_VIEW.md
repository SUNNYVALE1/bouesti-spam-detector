# Project Tree View

A descriptive index of the files in this project.

```
c:\Users\sunda\Documents\spam detector\
├── CHANGELOG.md                  # Tracks all project changes and versions
├── IMPLEMENTATION_PLAN.md        # Original design specs and project goals
├── MEMORY.md                     # Comprehensive log of project context, dataset stats, and ML pipeline
├── README.md                     # Main entry point describing the project, team, and stack
├── TREE_VIEW.md                  # This file, documenting the purpose of each file
├── enron_spam_data.csv           # Original 33,716 row Enron spam dataset (51.6 MB)
├── export_model.py               # Python script that extracts trained scikit-learn models to JSON format
├── model_weights.json            # Extracted Logistic Regression weights and 10k vocabulary used by the web app
├── spam_detection_system/        # Python ML training environment and notebooks
│
└── website/                      # Next.js 15 Web Application Directory
    ├── next.config.ts            # Next.js configuration settings
    ├── package.json              # NPM dependencies and scripts
    ├── public/                   # Static assets
    │   └── google56852ae9e6d67aec.html # Google Search Console verification file
    └── src/
        ├── app/
        │   ├── about/page.tsx           # Page: Project team roster, problem statement, and credits
        │   ├── classify/page.tsx        # Page (Server): Email classifier SEO wrapper
        │   ├── classify/ClassifierWidget.tsx # Client Component: The interactive email and batch classifier
        │   ├── contact/page.tsx         # Page: Contact information and form
        │   ├── how-it-works/page.tsx    # Page: NLP and ML pipeline breakdown
        │   ├── results/page.tsx         # Page: 4-model comparison and evaluation charts
        │   ├── page.tsx                 # Page: Landing/Home page with hero section and quick stats
        │   ├── layout.tsx               # Root layout containing the Navbar, Footer, and global SEO metadata
        │   ├── robots.ts                # Defines crawler rules and sitemap location
        │   └── sitemap.ts               # Dynamic sitemap generator for Google indexing
        ├── components/
        │   ├── Layout.tsx               # Reusable Navbar and Footer components
        │   └── ...                      # UI elements (AIChatWidget, ContactForm, etc.)
        └── lib/
            └── classifier.ts            # Pure TypeScript ML inference engine that parses model_weights.json
```
