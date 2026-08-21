# Intelligent Spam Email Detection System

A machine learning-based spam email classification system developed as a final year project at Bamidele Olumilua University of Education, Science and Technology, Ikere-Ekiti (BOUESTI).

## Authors
- **Esan Oluwaferanmi Elizabeth** (5029)
- **Daramola Micheal Olaniyi** (5022)
- **Ajimo Samson Oluwasanmi** (4955)

**Supervisor:** Mrs. Ariyo

**Department:** Computing and Information Science

---

## Features

- **4 Machine Learning Algorithms**: Multinomial Naive Bayes, Support Vector Machine (SVM), Logistic Regression, Random Forest
- **TF-IDF Feature Extraction** with unigrams and bigrams
- **Comprehensive Text Preprocessing**: Cleaning, tokenization, stop-word removal, lemmatization
- **Hyperparameter Tuning** with 5-fold cross-validation
- **Evaluation Metrics**: Accuracy, Precision, Recall, F1-Score, Confusion Matrix, ROC Curves
- **Interactive Streamlit Web Interface** for real-time classification
- **Batch Classification** support for CSV files
- **Spam Indicator Highlighting** showing which words contributed to the spam decision

---

## Project Structure

```
spam_detection_system/
│
├── data/                          # Dataset directory
│   └── enron_spam_data.csv        # Enron Spam Dataset (or your dataset)
│
├── models/                        # Saved trained models
│   ├── preprocessor.joblib        # TF-IDF vectorizer
│   ├── best_model.joblib          # Best performing model
│   ├── best_model_info.json       # Model metadata
│   ├── multinomial_naive_bayes.joblib
│   ├── support_vector_machine.joblib
│   ├── logistic_regression.joblib
│   └── random_forest.joblib
│
├── results/                       # Evaluation results and plots
│   ├── model_comparison.csv
│   ├── metrics_comparison.png
│   ├── confusion_matrices.png
│   ├── roc_curves.png
│   ├── training_time.png
│   └── feature_importance.png
│
├── utils.py                       # Preprocessing utilities
├── train_models.py                # Training & evaluation pipeline
├── app.py                         # Streamlit web application
├── requirements.txt               # Python dependencies
└── README.md                      # This file
```

---

## Installation

### 1. Clone or download the project

```bash
cd spam_detection_system
```

### 2. Create a virtual environment (recommended)

```bash
python -m venv venv

# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Download NLTK data (automatic on first run)

The system will automatically download required NLTK data on first run. If you want to do it manually:

```python
import nltk
nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')
nltk.download('omw-1.4')
```

---

## Dataset

### Using the Enron Spam Dataset

1. Download the Enron Spam Dataset from [this link](http://www2.aueb.gr/users/ion/data/enron-spam/)
2. Place the dataset in the `data/` folder
3. The system supports two formats:
   - **CSV file** with columns: `text`, `label` (0=ham, 1=spam)
   - **Directory structure** with `ham/` and `spam/` subfolders containing `.txt` files

### Using your own dataset

Your CSV should have at least these columns:
- `text`: The email content (subject + body)
- `label`: 0 for ham (legitimate), 1 for spam

---

## Usage

### Step 1: Train the Models

```bash
python train_models.py --data data/enron_spam_data.csv
```

This will:
- Load and preprocess the dataset
- Train all 4 models with hyperparameter tuning
- Evaluate on test set
- Generate comparison plots
- Save the best model for deployment

**Optional arguments:**
```bash
python train_models.py --data data/your_dataset.csv --output models --results results
```

### Step 2: Launch the Web Interface

```bash
streamlit run app.py
```

The web app will open in your browser at `http://localhost:8501`

**Features of the web app:**
- **Classify Email**: Paste email text or use sample emails for instant classification
- **Batch Classification**: Upload a CSV file to classify multiple emails at once
- **How It Works**: View system architecture and model comparison results

---

## Model Comparison

The system trains and compares 4 algorithms:

| Algorithm | Type | Best For |
|-----------|------|----------|
| Multinomial Naive Bayes | Probabilistic | Speed, baseline performance |
| Support Vector Machine | Geometric | High accuracy, high-dimensional data |
| Logistic Regression | Linear | Interpretability, feature analysis |
| Random Forest | Ensemble | Robustness, non-linear patterns |

The best model (highest F1-Score) is automatically selected for deployment.

---

## Evaluation Metrics

- **Accuracy**: Overall correctness of predictions
- **Precision**: Of emails flagged as spam, how many are actually spam
- **Recall**: Of all actual spam emails, how many were correctly identified
- **F1-Score**: Harmonic mean of precision and recall (primary selection criterion)

---

## System Requirements

### Hardware
- Processor: Intel Core i5 (8th gen) or AMD Ryzen 5 equivalent
- RAM: 8 GB minimum (16 GB recommended)
- Storage: 20 GB free space
- Display: 1366 x 768 resolution

### Software
- Python 3.9 or higher
- pip package manager

---

## Troubleshooting

### "Model not found" error
Run `python train_models.py` first to train and save the models.

### NLTK download errors
The system auto-downloads NLTK data. If it fails, run manually:
```python
import nltk
nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')
```

### Memory issues with large datasets
Reduce `max_features` in `utils.py` (default is 10,000):
```python
self.preprocessor = EmailPreprocessor(max_features=5000)
```

---

## License

This project is developed for academic purposes at BOUESTI.

---

## Acknowledgments

- Enron Spam Dataset creators
- scikit-learn, NLTK, and Streamlit communities
- BOUESTI Department of Computing and Information Science
