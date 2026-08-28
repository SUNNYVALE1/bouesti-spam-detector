# BOUESTI Spam Email Detection System

An intelligent spam email detection system built using Machine Learning and a Next.js web interface. This project was developed as a Bachelor of Science (B.Sc) Final Year Project for the Department of Computing and Information Science at Bamidele Olumilua University of Education, Science and Technology, Ikere-Ekiti (BOUESTI).

## Project Overview

- **Objective:** Accurate classification of emails as Spam or Legitimate (Ham) using supervised learning.
- **Algorithm:** Logistic Regression (achieving 99.00% accuracy).
- **Features:** 10,000 TF-IDF numerical vectors extracted from text.
- **Dataset:** Trained on 33,716 emails from the Enron Spam Dataset.

## Features

- Real-time single email classification
- High-performance Pure TypeScript inference engine (no Python backend required for inference)
- Batch CSV email classification
- Detailed Model Results and comparison plots
- Explanatory "How It Works" NLP pipeline breakdown

## Tech Stack

- **Frontend/Web App:** Next.js 15 (App Router), React, TypeScript, Tailwind CSS
- **Machine Learning Training:** Python, scikit-learn, NLTK
- **Deployment:** Vercel (Web), Cloudflare Workers (Proxy - optional)

## Research Team & Authors

1. **Esan Oluwaferanmi Elizabeth** (Matric: 5029)
2. **Daramola Micheal Olaniyi** (Matric: 5022)
3. **Ajimo Samson Oluwasanmi** (Matric: 4955)

**Supervisor:** Ariyo Opeyemi Jumoke

## Running Locally

To run the web interface locally:

```bash
cd website
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

The project is deployed on Vercel at [https://bouesti-spam-detector.vercel.app](https://bouesti-spam-detector.vercel.app).
A custom domain setup is configured for [https://bouestispamdetector.com.ng](https://bouestispamdetector.com.ng).
