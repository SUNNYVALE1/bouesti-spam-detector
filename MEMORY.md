# Project Memory & Audit Log — BOUESTI Spam Email Detection System
**Prepared by**: Sunnytech (Senior Developer & AI Assistant)  
**Project**: BOUESTI B.Sc Final Year Project — Spam Email Detection System  
**Date**: August 2026  
**Location**: `C:\Users\sunda\Documents\spam detector`

---

## 1. Executive Summary & Academic Context
- **Project Title**: Design and Implementation of an Intelligent Spam Email Detection System Using Machine Learning
- **Institution**: Department of Computing and Information Science, Bamidele Olumilua University of Education, Science and Technology, Ikere-Ekiti (BOUESTI)
- **Degree Program**: Bachelor of Science (B.Sc) in Computer Science
- **Project Supervisor**: Mrs. Ariyo
- **Student Authors & Roster**:
  1. Esan Oluwaferanmi Elizabeth (Matric: 5029) — Research & Development
  2. Daramola Micheal Olaniyi (Matric: 5022) — Research & Development
  3. Ajimo Samson Oluwasanmi (Matric: 4955) — Research & Development
- **System & Web Engineering Credit**: Developed by Sunnytech (featured in universal footers and project documentation).

---

## 2. Dataset & Machine Learning Pipeline Overview

### Dataset Specifications
- **Source**: Enron Spam Dataset
- **Total Corpus Size**: 33,716 emails (17,171 Spam [50.93%], 16,545 Ham/Legitimate [49.07%])
- **Cleaned Dataset**: 30,483 unique emails (3,222 duplicate records removed during text cleaning)
- **Train/Val/Test Split Ratio**: 80% Training (21,337 samples), 10% Validation (3,049 samples), 10% Testing (6,097 samples)

### Preprocessing & Feature Extraction
- **Text Cleaning**: Strip HTML tags, web URLs, email addresses, numeric sequences, and special symbols; convert to lowercase.
- **Stopwords & Tokenization**: Removal of standard English NLTK stopwords.
- **Lemmatization**: NLTK WordNet lemmatizer reducing inflected words to root dictionary form.
- **TF-IDF Feature Matrix**: 10,000 max features (unigrams and bigrams).

### 4-Model Evaluation Results
All 4 models were trained using 5-fold cross-validation grid search on the preprocessed Enron corpus:

| Model Algorithm | Accuracy | Precision | Recall | F1-Score | Training Time | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Logistic Regression** | **99.00%** | **98.57%** | **99.35%** | **0.9896** | 5.18s | **DEPLOYED (Best Model)** |
| **Support Vector Machine (SVM)** | 98.95% | 98.57% | 99.25% | 0.9891 | 9.15s | Evaluated |
| **Random Forest** | 98.44% | 97.73% | 99.04% | 0.9838 | 265.48s | Evaluated |
| **Multinomial Naive Bayes** | 98.39% | 98.35% | 98.28% | 0.9832 | 7.04s | Evaluated |

**Best Model Chosen**: Logistic Regression (`best_model.joblib`), achieving peak Accuracy (99.00%) and F1-Score (0.9896) with low false negative rates.

---

## 3. High-Performance Web Architecture (Vercel Optimized)

To eliminate Vercel serverless Python memory limits (250MB uncompressed) and cold starts, we created `export_model.py` to extract model weights directly into lightweight JSON (`model_weights.json`).

### Exported Artifacts & Pure TS Inference Engine (`src/lib/classifier.ts`)
- **Vocabulary Map**: 10,000 word/bigram feature mappings.
- **IDF Vector & Logit Weights**: Extracted TF-IDF `idf_` values, Logistic Regression coefficients `coef_`, and scalar `intercept` (1.114768).
- **Inference Math**:
  $$\text{TF-IDF}_{i} = \text{TF}_{i} \times \text{IDF}_{i}$$
  $$z = \text{intercept} + \sum (\text{TF-IDF}_{i} \times \text{weight}_{i})$$
  $$P(\text{Spam}) = \frac{1}{1 + e^{-z}}$$
- **Execution Speed**: Sub-10ms response time on Vercel Edge/Node runtimes.

---

## 4. Web Application Routes & Feature Details

The project web app was built in `C:\Users\sunda\Documents\spam detector\website` using Next.js 15, TypeScript, Tailwind CSS, Lucide icons, Recharts, and PapaParse.

1. **Home Page (`/`)**:
   - Hero banner with headline, CTA to `/classify`, and official BOUESTI department badge.
   - Key stats counters (33,716 emails, 4 ML models, 99.00% accuracy, <10ms latency).
   - 3-step system workflow preview and 4-model evaluation preview cards.

2. **Email Spam Classifier (`/classify`)**:
   - Textarea input for single email classification.
   - 4 exact preset sample dropdown options:
     - *Advertising Spam*: Lottery scam claim.
     - *Phishing Email*: Urgent account suspension warning.
     - *Legitimate Work Email*: Q3 marketing campaign update.
     - *Order Confirmation*: Order shipping & tracking update.
   - Real-time status banner (`🚫 SPAM DETECTED` vs `✅ LEGITIMATE EMAIL`), confidence meter percentage, trigger words indicator table with feature weights, and collapsible cleaned text viewer.
   - CSV batch processor with drag-and-drop file upload, total spam/ham count metrics, and downloadable result CSV export.

3. **Model Results Page (`/results`)**:
   - Best Model Highlight box showcasing Logistic Regression.
   - Hardcoded 4-model evaluation comparison table displaying Accuracy, Precision, Recall, F1-Score, and Training Time for all algorithms.
   - Original scikit-learn Python training plots gallery (`metrics_comparison.png`, `confusion_matrices.png`, `roc_curves.png`, `training_time.png`, `feature_importance.png`).

4. **How It Works Page (`/how-it-works`)**:
   - 5-step visual pipeline flow diagram (Raw Email → Preprocessing → TF-IDF → ML Inference → Prediction).
   - Detailed step breakdowns for data cleaning, TF-IDF vectorization, algorithm comparison, and evaluation metrics.
   - Enron dataset specifications box.

5. **About Page (`/about`)**:
   - Research description and problem statement.
   - Student roster table (Esan 5029, Daramola 5022, Ajimo 4955).
   - Supervisor credit (Mrs. Ariyo), BOUESTI department info, and Sunnytech development credit.

6. **Contact Page (`/contact`)**:
   - Student author cards with matric numbers.
   - Department location and supervisor information.
   - Interactive contact form with submission feedback state.

7. **Universal Layout (`src/components/Layout.tsx`)**:
   - Sticky top navigation bar with BOUESTI header logo.
   - Mandatory `"Developed by Sunnytech"` credit badge in the footer of every page.

---

## 5. File System & Deliverables Tree

```
C:\Users\sunda\Documents\spam detector\
├── IMPLEMENTATION_PLAN.md                  # Project master plan & design spec
├── MEMORY.md                               # Comprehensive project memory log (this file)
├── export_model.py                         # Python script exporting joblib models to JSON
├── model_weights.json                      # 10k feature vocab + IDF + model coefficients (738 KB)
├── enron_spam_data.csv                     # Original 33,716 row Enron spam dataset (51.6 MB)
│
├── spam_detection_system/
│   └── spam_detection_system/
│       ├── venv/                           # Python 3.14 virtual environment
│       ├── data/enron_spam_data.csv        # Dataset copy for training
│       ├── models/                         # Trained ML model joblib files
│       │   ├── best_model.joblib           # Deployed Logistic Regression model
│       │   ├── preprocessor.joblib         # Fitted TF-IDF vectorizer
│       │   ├── best_model_info.json        # Model metadata
│       │   ├── logistic_regression.joblib
│       │   ├── multinomial_naive_bayes.joblib
│       │   ├── support_vector_machine.joblib
│       │   └── random_forest.joblib
│       ├── results/                        # Generated evaluation charts & CSV
│       │   ├── model_comparison.csv
│       │   ├── metrics_comparison.png
│       │   ├── confusion_matrices.png
│       │   ├── roc_curves.png
│       │   ├── training_time.png
│       │   └── feature_importance.png
│       ├── utils.py                        # Preprocessing logic & dataset loader
│       ├── train_models.py                 # Training & evaluation pipeline
│       └── app.py                          # Streamlit reference interface
│
└── website/                                # Next.js 15 Production Web Application
    ├── src/
    │   ├── app/
    │   │   ├── page.tsx                    # Landing Page (/)
    │   │   ├── classify/page.tsx           # Email Classifier (/classify)
    │   │   ├── results/page.tsx            # 4-Model Results & Plots (/results)
    │   │   ├── how-it-works/page.tsx       # System Pipeline Breakdown (/how-it-works)
    │   │   ├── about/page.tsx              # BOUESTI Team & Credits (/about)
    │   │   ├── contact/page.tsx            # Contact Form & Roster (/contact)
    │   │   ├── api/classify/route.ts       # Single Email Classification API
    │   │   └── api/batch-classify/route.ts # Batch CSV Processing API
    │   ├── components/
    │   │   └── Layout.tsx                  # Navbar & Footer with "Developed by Sunnytech"
    │   └── lib/
    │       ├── classifier.ts               # Pure TypeScript ML Inference Engine
    │       └── model_weights.json          # Exported model weights JSON
    └── public/
        ├── data/enron_spam_data.csv        # Cleaned dataset download asset
        └── results/                        # Original scikit-learn plot image assets
```

---

## 6. Deployment Status & Instructions

### Live Production Deployment
The web application has been successfully deployed and is currently live.
- **Production URL**: [https://bouesti-spam-detector.vercel.app](https://bouesti-spam-detector.vercel.app)
- **Deployment Platform**: Vercel

### GitHub Repository Push (For Backup)
```cmd
cd "C:\Users\sunda\Documents\spam detector\website"
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/bouesti-spam-detector.git
git push -u origin main
```

### Custom Domain Setup (Optional)
If a custom domain (e.g., `bouestispamdetector.com`) is purchased:
1. Go to Vercel **Project Settings** → **Domains**.
2. Enter the purchased domain.
3. Update DNS settings at the domain registrar:
   - **Apex (`example.com`)**: `A` record `@` pointing to `76.76.21.21`.
   - **Subdomain (`www.example.com`)**: `CNAME` record `www` pointing to `cname.vercel-dns.com`.
4. Vercel will auto-provision SSL HTTPS within minutes.

## 7. Google Search Console & SEO Configuration
- **Dynamic Sitemap (`/sitemap.xml`)**: Auto-generates URLs for all 6 main routes (`/`, `/classify`, `/results`, `/how-it-works`, `/about`, `/contact`).
- **Robots Config (`/robots.txt`)**: Allows search engine crawlers while protecting `/api/` endpoints.
- **Google Verification Tag**: Prepared in `src/app/layout.tsx` metadata (`verification.google`).
- **OpenGraph & Keywords**: Configured academic SEO metadata tags.

## 8. Mobile Responsiveness & Design Polish
- **Mobile Drawer Menu**: Implemented a responsive mobile navigation drawer with hamburger button (`<Menu />` / `<X />`).
- **Responsive Padding & Fonts**: Scaled typography, card padding, and button sizes across small screens (`px-3`, `py-8`, `text-xs sm:text-sm`).
- **Footer Clean-up**: Removed external Sunnytech branding from footer per request.

---
*END OF MEMORY LOG — BOUESTI SPAM EMAIL DETECTION SYSTEM*
