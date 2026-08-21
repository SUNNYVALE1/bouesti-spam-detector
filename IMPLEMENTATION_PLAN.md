# IMPLEMENTATION PLAN — Spam Email Detection Website
# Prepared by: Senior Developer (Sunnytech)
# For: AI Developer
# Project: BOUESTI Final Year Project — Spam Email Detection System
# Date: August 2026

---

## 1. PROJECT OVERVIEW

Build and deploy a complete multi-page website for a spam email detection system. The website must be professional, academic-grade, and suitable for a final year project defense at BOUESTI.

The AI developer has access to:
- Vercel account (for hosting/deployment)
- Firebase account (for backend services if needed)
- Existing website templates from previous projects

---

## 2. TECH STACK

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js (React) or the existing template framework the developer has |
| Styling | Tailwind CSS or matching existing template style |
| Backend/ML API | Python FastAPI or the existing ML model files (utils.py, train_models.py, app.py) |
| Database (optional) | Firebase Firestore — ONLY if user history or contact form storage is needed |
| Auth (optional) | Firebase Auth — ONLY if user accounts are implemented |
| Hosting | Vercel |
| Domain | To be purchased by client (Sunnytech will provide domain name) |

---

## 3. WEBSITE PAGES & CONTENT

### PAGE 1: HOME / LANDING PAGE
**Route:** `/`

**Sections:**
1. **Hero Section**
   - Headline: "Intelligent Spam Email Detection System"
   - Subheadline: "Machine Learning-Powered Classification for Secure Email Communication"
   - CTA Button: "Try It Now" → links to `/classify`
   - Background: Clean, professional gradient or subtle tech pattern

2. **Project Info Banner**
   - Text: "A Final Year Project by the Department of Computing and Information Science, BOUESTI"
   - Small BOUESTI logo or text badge

3. **How It Works Preview** (3 steps with icons)
   - Step 1: "Paste Your Email" — icon: envelope
   - Step 2: "AI Analyzes Content" — icon: brain/CPU
   - Step 3: "Get Instant Results" — icon: shield/checkmark

4. **Key Stats Bar**
   - "33,716 Emails Trained On"
   - "4 ML Models Compared"
   - "99%+ Accuracy Achieved"
   - "Real-Time Classification"

5. **Model Comparison Preview**
   - Small table or cards showing the 4 models (Naive Bayes, SVM, Logistic Regression, Random Forest) with their best metric
   - "See Full Results" → links to `/results`

6. **Footer**
   - "Powered by Sunnytech"
   - "© 2026 BOUESTI Computer Science Department"
   - Quick links: Home, About, Classify, Results, Contact

---

### PAGE 2: EMAIL CLASSIFIER (MAIN FEATURE)
**Route:** `/classify`

**Layout:**
1. **Page Header:** "Email Spam Detector"
2. **Input Area:**
   - Large textarea with placeholder: "Paste the full email content here (subject + body)..."
   - "Classify Email" button (primary, prominent)
   - "Clear" button (secondary)
3. **Sample Emails Dropdown:**
   - Label: "Or test with a sample email:"
   - Options:
     - "Advertising Spam (Lottery Scam)"
     - "Phishing Email (Account Suspension)"
     - "Legitimate Work Email"
     - "Order Confirmation"
   - When selected, auto-fills the textarea with the sample text

4. **Results Display** (appears after classification):
   - **If Spam:** Red banner with "🚫 SPAM DETECTED" + confidence percentage
   - **If Ham:** Green banner with "✅ LEGITIMATE EMAIL" + confidence percentage
   - Confidence progress bar (visual)
   - "Spam Indicators" section: table showing top words/phrases that triggered the spam detection
   - "Preprocessed Text" collapsible section: shows the cleaned version of the email

5. **Batch Upload Section** (below single classifier):
   - "Upload CSV File" drag-and-drop or file picker
   - Accepts CSV with an 'email' or 'text' column
   - Processes all rows and returns downloadable results CSV
   - Shows count: "X spam detected out of Y total emails"

**Backend Integration:**
- The AI developer MUST integrate the existing Python ML model (best_model.joblib + preprocessor.joblib)
- Option A: Deploy the Python model as a FastAPI microservice on Vercel or a separate Python host
- Option B: Convert the model to ONNX or TensorFlow.js if the frontend framework supports it
- Option C: Use the existing Streamlit app as an embedded iframe (quickest but less professional)
- **RECOMMENDED: Option A** — FastAPI backend deployed alongside the frontend

---

### PAGE 3: ABOUT THE PROJECT
**Route:** `/about`

**Content (exact text to use):**

**Header:** "About This Project"

**Section 1: Project Description**
"This project presents the Design and Implementation of an Intelligent Spam Email Detection System Using Machine Learning. The system classifies emails as either spam (unsolicited or malicious) or ham (legitimate) using supervised machine learning algorithms trained on the Enron Spam Dataset."

"Traditional rule-based spam filters struggle to adapt to evolving spam tactics, including content obfuscation, image-based spam, and AI-generated phishing emails. This system addresses those limitations by learning patterns directly from labeled email data, enabling accurate, real-time classification of new and unseen emails."

**Section 2: The Team**

| Name | Matric Number | Role |
|------|--------------|------|
| Esan Oluwaferanmi Elizabeth | 5029 | Research & Development |
| Daramola Micheal Olaniyi | 5022 | Research & Development |
| Ajimo Samson Oluwasanmi | 4955 | Research & Development |

"Supervised by: Mrs. Ariyo"

"Department of Computing and Information Science"
"Bamidele Olumilua University of Education, Science and Technology, Ikere-Ekiti (BOUESTI)"
"In Partial Fulfillment for the Award of the Degree of Bachelor of Science (B.Sc) in Computer Science"

**Section 3: Development Credit**
"Website & System Development by Sunnytech"
[Link to Sunnytech portfolio or contact if available]

**Section 4: Acknowledgments**
- Enron Spam Dataset creators
- scikit-learn, NLTK, and Streamlit open-source communities
- BOUESTI Department of Computing and Information Science

---

### PAGE 4: HOW IT WORKS
**Route:** `/how-it-works`

**Content:**

**Header:** "How The System Works"

**Pipeline Diagram** (visual flow):
```
Raw Email → Preprocessing → TF-IDF Features → ML Model → Prediction
```

**Step 1: Data Preprocessing**
- "Emails are cleaned by removing HTML tags, URLs, email addresses, numbers, and special characters."
- "Text is converted to lowercase, tokenized into words, and common stop words are removed."
- "Words are reduced to their root form using lemmatization (e.g., 'running' becomes 'run')."

**Step 2: Feature Extraction (TF-IDF)**
- "Term Frequency-Inverse Document Frequency (TF-IDF) converts text into numerical vectors."
- "Important spam-related words receive high scores; common words receive low scores."
- "The system uses unigrams and bigrams (single words and word pairs) for better context."

**Step 3: Machine Learning Models**
- "Four algorithms are trained and compared:"
  - Multinomial Naive Bayes — fast probability-based classifier
  - Support Vector Machine (SVM) — high-accuracy geometric classifier
  - Logistic Regression — interpretable linear classifier
  - Random Forest — robust ensemble classifier
- "Each model is tuned using 5-fold cross-validation to find optimal settings."

**Step 4: Evaluation**
- "Models are evaluated using Accuracy, Precision, Recall, and F1-Score."
- "The best-performing model (highest F1-Score) is selected for deployment."

**Step 5: Real-Time Classification**
- "Users paste an email into the web interface."
- "The system preprocesses it, extracts features, and runs the trained model."
- "Results are returned in under 2 seconds with confidence score and spam indicators."

**Dataset Info Box:**
- "Enron Spam Dataset: 33,716 emails (51% spam, 49% ham)"
- "Split: 80% training, 10% validation, 10% testing"

---

### PAGE 5: MODEL RESULTS
**Route:** `/results`

**Content:**

**Header:** "Model Performance Results"

**Table:** Model Comparison (auto-populated from the CSV results file)
| Model | Accuracy | Precision | Recall | F1-Score |
|-------|----------|-----------|--------|----------|
| [Data from model_comparison.csv] |

**Charts to display:**
1. Metrics Comparison Bar Chart (from results/metrics_comparison.png)
2. Confusion Matrices (from results/confusion_matrices.png)
3. ROC Curves (from results/roc_curves.png)
4. Training Time Comparison (from results/training_time.png)
5. Feature Importance (from results/feature_importance.png)

**Note:** The AI developer should display these images directly on the page. If the images are not yet generated, placeholder text should say: "Run train_models.py to generate results."

**Best Model Highlight Box:**
- "Best Performing Model: [Model Name]"
- "F1-Score: [Score]"
- "Selected for deployment based on highest F1-Score."

---

### PAGE 6: CONTACT
**Route:** `/contact`

**Content:**

**Header:** "Contact the Team"

**Team Contact Cards:**
- Esan Oluwaferanmi Elizabeth (5029)
- Daramola Micheal Olaniyi (5022)
- Ajimo Samson Oluwasanmi (4955)

**Supervisor:** Mrs. Ariyo

**Department:** Computing and Information Science, BOUESTI

**Development Credit:**
"System developed by Sunnytech"
[Contact link or email for Sunnytech]

**Contact Form** (optional — if Firebase is used):
- Name field
- Email field
- Message field
- Submit button
- Messages stored in Firebase Firestore

---

## 4. DESIGN SPECIFICATIONS

### Color Scheme
| Element | Color | Hex Code |
|---------|-------|----------|
| Primary (buttons, links) | Deep Blue | #1e40af |
| Secondary (accents) | Teal/Green | #059669 |
| Spam/Alert | Red | #dc2626 |
| Success/Legitimate | Green | #16a34a |
| Background | White/Light Gray | #f8fafc |
| Text (headings) | Dark Slate | #1e293b |
| Text (body) | Gray | #475569 |

### Typography
- Headings: Inter or Poppins (clean, modern)
- Body: Inter or system sans-serif
- Code/Monospace: JetBrains Mono or Fira Code (for preprocessed text display)

### Layout
- Max content width: 1200px (centered)
- Responsive: Must work on mobile, tablet, and desktop
- Navigation: Sticky top bar with logo + page links + "Classify Now" CTA button
- Footer: Fixed at bottom with credits and links

---

## 5. DOMAIN & DEPLOYMENT

### Domain Setup
1. Sunnytech will purchase the domain name
2. The AI developer must configure the domain in Vercel:
   - Add custom domain in Vercel project settings
   - Update DNS records (A record and CNAME) as instructed by Vercel
   - Enable HTTPS (SSL certificate auto-provisioned by Vercel)

### Environment Variables (if needed)
- `NEXT_PUBLIC_API_URL` — URL of the Python ML backend (if separate)
- `FIREBASE_API_KEY` — already available in developer's Firebase account
- `FIREBASE_PROJECT_ID` — already available

---

## 6. INTEGRATION WITH EXISTING ML CODE

The AI developer MUST use the existing Python files:
- `utils.py` — EmailPreprocessor class (clean, tokenize, lemmatize, TF-IDF)
- `train_models.py` — Training pipeline (can be run once to generate models)
- `app.py` — Streamlit app (reference for UI behavior, but rebuild in the website framework)
- `models/best_model.joblib` — The trained model to load for predictions
- `models/preprocessor.joblib` — The fitted TF-IDF vectorizer

**Integration approach:**
1. Load `best_model.joblib` and `preprocessor.joblib` at server startup
2. Create an API endpoint: `POST /api/classify`
   - Request body: `{ "email": "email text here" }`
   - Response: `{ "prediction": "Spam"|"Ham", "confidence": 0.92, "indicators": [...] }`
3. The frontend calls this endpoint when the user clicks "Classify"

---

## 7. DELIVERABLES CHECKLIST

The AI developer must deliver:

- [ ] Multi-page website with all 6 pages listed above
- [ ] Navigation bar with links to all pages
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Email classifier with real-time API integration
- [ ] Sample email dropdown functionality
- [ ] Results display with confidence bar and spam indicators
- [ ] Batch CSV upload and download
- [ ] About page with exact content provided above
- [ ] How It Works page with pipeline diagram
- [ ] Results page with model comparison table and charts
- [ ] Contact page with team info
- [ ] Footer with Sunnytech credit and BOUESTI info
- [ ] Deployed to Vercel with custom domain
- [ ] (Optional) Firebase integration for contact form or user history

---

## 8. TIMELINE

| Day | Task |
|-----|------|
| Day 1 | Set up project, build page structure, integrate navigation |
| Day 2 | Build classifier page, integrate ML model API, test predictions |
| Day 3 | Build About, How It Works, Results, Contact pages |
| Day 4 | Polish design, responsive testing, deploy to Vercel, connect domain |
| Day 5 | Final testing, handover to Sunnytech for review |

Total: 5 days from receiving this plan.

---

## 9. NOTES FOR AI DEVELOPER

1. **Do NOT change the ML model logic.** Use the existing `best_model.joblib` and `preprocessor.joblib` exactly as provided.
2. **Keep the design academic and professional.** No flashy animations, no gaming-style UI. Clean, readable, corporate.
3. **All content must match the project document exactly.** Use the names, numbers, and descriptions provided above. Do not invent or modify.
4. **Sunnytech must be credited clearly** in the footer and About page.
5. **Test the classifier with the sample emails** before declaring it done. The predictions must match expected results (spam samples → Spam, legitimate samples → Ham).
6. **If any technical blockers arise,** document them and report to Sunnytech immediately. Do not guess or workaround without approval.

---

END OF IMPLEMENTATION PLAN
Prepared by: Sunnytech (Senior Developer)
