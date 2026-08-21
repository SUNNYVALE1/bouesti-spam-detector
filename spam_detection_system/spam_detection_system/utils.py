"""
Spam Detection System - Utilities Module
Preprocessing, feature extraction, and helper functions.
"""

import re
import string
import nltk
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer, WordNetLemmatizer
from nltk.tokenize import word_tokenize
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
import joblib
import os

# Download required NLTK data
def download_nltk_data():
    """Download required NLTK datasets."""
    required = ['punkt', 'stopwords', 'wordnet', 'omw-1.4']
    for item in required:
        try:
            nltk.data.find(f'tokenizers/{item}' if item == 'punkt' else f'corpora/{item}')
        except LookupError:
            nltk.download(item, quiet=True)

class EmailPreprocessor:
    """
    Comprehensive email preprocessing pipeline.
    Handles cleaning, tokenization, stop-word removal, and stemming/lemmatization.
    """

    def __init__(self, remove_stopwords=True, use_stemming=False, use_lemmatization=True, 
                 min_word_length=2, max_features=10000):
        """
        Initialize preprocessor.

        Args:
            remove_stopwords: Whether to remove common stop words
            use_stemming: Whether to apply Porter stemming
            use_lemmatization: Whether to apply WordNet lemmatization
            min_word_length: Minimum length of words to keep
            max_features: Maximum number of TF-IDF features
        """
        self.remove_stopwords = remove_stopwords
        self.use_stemming = use_stemming
        self.use_lemmatization = use_lemmatization
        self.min_word_length = min_word_length
        self.max_features = max_features

        download_nltk_data()

        self.stop_words = set(stopwords.words('english')) if remove_stopwords else set()
        self.stemmer = PorterStemmer() if use_stemming else None
        self.lemmatizer = WordNetLemmatizer() if use_lemmatization else None
        self.vectorizer = None

    def clean_text(self, text):
        """
        Clean raw email text.

        Steps:
        1. Convert to lowercase
        2. Remove email headers patterns
        3. Remove HTML tags
        4. Remove URLs
        5. Remove email addresses
        6. Remove numbers and special characters
        7. Remove extra whitespace
        """
        if not isinstance(text, str):
            return ""

        # Convert to lowercase
        text = text.lower()

        # Remove email headers (lines like "From:", "To:", "Subject:", "Date:")
        text = re.sub(r'^(from|to|subject|date|cc|bcc|reply-to|message-id|in-reply-to|references|mime-version|content-type|content-transfer-encoding|x-.*):.*$', '', text, flags=re.MULTILINE)

        # Remove HTML tags
        text = re.sub(r'<[^>]+>', ' ', text)

        # Remove URLs
        text = re.sub(r'http\S+|www\S+|https\S+', ' ', text, flags=re.MULTILINE)

        # Remove email addresses
        text = re.sub(r'\S+@\S+', ' ', text)

        # Remove numbers
        text = re.sub(r'\d+', ' ', text)

        # Remove punctuation and special characters, keep only alphabets and spaces
        text = re.sub(r'[^a-zA-Z\s]', ' ', text)

        # Remove extra whitespace
        text = ' '.join(text.split())

        return text

    def tokenize_and_normalize(self, text):
        """
        Tokenize text and apply normalization (stop-word removal, stemming, lemmatization).
        """
        tokens = word_tokenize(text)

        processed_tokens = []
        for token in tokens:
            # Check minimum length
            if len(token) < self.min_word_length:
                continue

            # Remove stopwords
            if self.remove_stopwords and token in self.stop_words:
                continue

            # Apply lemmatization (preferred over stemming for better semantic meaning)
            if self.use_lemmatization and self.lemmatizer:
                token = self.lemmatizer.lemmatize(token)

            # Apply stemming (if enabled, usually not needed if lemmatization is on)
            if self.use_stemming and self.stemmer:
                token = self.stemmer.stem(token)

            processed_tokens.append(token)

        return ' '.join(processed_tokens)

    def preprocess(self, text):
        """Full preprocessing pipeline: clean + tokenize/normalize."""
        cleaned = self.clean_text(text)
        normalized = self.tokenize_and_normalize(cleaned)
        return normalized

    def fit_transform(self, texts):
        """
        Fit TF-IDF vectorizer and transform texts to feature matrix.

        Args:
            texts: List of preprocessed email texts

        Returns:
            Sparse matrix of TF-IDF features
        """
        self.vectorizer = TfidfVectorizer(
            max_features=self.max_features,
            ngram_range=(1, 2),  # Unigrams and bigrams for better context
            min_df=2,            # Ignore terms that appear in less than 2 documents
            max_df=0.95,         # Ignore terms that appear in more than 95% of documents
            sublinear_tf=True    # Apply sublinear tf scaling (1 + log(tf))
        )
        return self.vectorizer.fit_transform(texts)

    def transform(self, texts):
        """Transform new texts using fitted vectorizer."""
        if self.vectorizer is None:
            raise ValueError("Vectorizer not fitted yet. Call fit_transform first.")
        return self.vectorizer.transform(texts)

    def save(self, filepath):
        """Save preprocessor (vectorizer) to disk."""
        joblib.dump(self.vectorizer, filepath)

    def load(self, filepath):
        """Load preprocessor (vectorizer) from disk."""
        self.vectorizer = joblib.load(filepath)


def load_enron_dataset(data_path):
    """
    Load Enron Spam Dataset from directory or CSV.

    Supports:
    - Folder with 'ham' and 'spam' subdirectories containing .txt files
    - CSV file with 'text' and 'label' columns
    - CSV file with 'email' and 'class' columns

    Args:
        data_path: Path to dataset directory or CSV file

    Returns:
        DataFrame with 'text' and 'label' columns (label: 0=ham, 1=spam)
    """
    if os.path.isfile(data_path) and data_path.endswith('.csv'):
        df = pd.read_csv(data_path)
        # Standardize column names
        df.columns = df.columns.str.lower().str.strip()

        if 'text' in df.columns and 'label' in df.columns:
            return df[['text', 'label']]
        elif 'email' in df.columns and 'class' in df.columns:
            df = df.rename(columns={'email': 'text', 'class': 'label'})
            return df[['text', 'label']]
        elif 'message' in df.columns and 'category' in df.columns:
            df = df.rename(columns={'message': 'text', 'category': 'label'})
            # Convert 'ham'/'spam' to 0/1 if needed
            if df['label'].dtype == object:
                df['label'] = df['label'].map({'ham': 0, 'spam': 1})
            return df[['text', 'label']]
        elif 'spam/ham' in df.columns:
            # Handle standard Enron CSV format: ['message id', 'subject', 'message', 'spam/ham', 'date']
            subject = df['subject'].fillna('')
            message = df['message'].fillna('')
            df['text'] = subject + ' ' + message
            label_col = df['spam/ham'].astype(str).str.lower().str.strip()
            df['label'] = label_col.map({'ham': 0, 'spam': 1, '0': 0, '1': 1}).fillna(0).astype(int)
            return df[['text', 'label']]
        else:
            raise ValueError(f"CSV columns not recognized. Found: {list(df.columns)}")

    elif os.path.isdir(data_path):
        texts = []
        labels = []

        # Look for ham and spam subdirectories
        ham_dir = os.path.join(data_path, 'ham')
        spam_dir = os.path.join(data_path, 'spam')

        if not os.path.exists(ham_dir) or not os.path.exists(spam_dir):
            # Try alternative names
            for subdir in os.listdir(data_path):
                subpath = os.path.join(data_path, subdir)
                if os.path.isdir(subpath):
                    if 'ham' in subdir.lower():
                        ham_dir = subpath
                    elif 'spam' in subdir.lower():
                        spam_dir = subpath

        # Load ham emails
        if os.path.exists(ham_dir):
            for filename in os.listdir(ham_dir):
                if filename.endswith('.txt'):
                    with open(os.path.join(ham_dir, filename), 'r', encoding='utf-8', errors='ignore') as f:
                        texts.append(f.read())
                        labels.append(0)  # Ham = 0

        # Load spam emails
        if os.path.exists(spam_dir):
            for filename in os.listdir(spam_dir):
                if filename.endswith('.txt'):
                    with open(os.path.join(spam_dir, filename), 'r', encoding='utf-8', errors='ignore') as f:
                        texts.append(f.read())
                        labels.append(1)  # Spam = 1

        df = pd.DataFrame({'text': texts, 'label': labels})
        return df

    else:
        raise ValueError(f"Data path not found or unsupported format: {data_path}")


def create_sample_dataset(output_path, n_samples=1000):
    """
    Create a small sample dataset for testing when Enron is not available.
    This is just for demonstration purposes.
    """
    np.random.seed(42)

    spam_samples = [
        "Congratulations! You have won a $1000 gift card. Click here to claim now!",
        "URGENT: Your account will be suspended. Verify your password immediately.",
        "Get rich quick! Work from home and earn $5000 per week guaranteed!!!",
        "Dear friend, I am a Nigerian prince and I need your help transferring money.",
        "Buy cheap viagra pills online now!!! Discount 90% limited time offer!!!",
        "You have been selected for a cash reward. Call now to claim your prize!!!",
        "Free lottery ticket! You are the lucky winner of our international draw!!!",
        "Act now! Limited time offer! Buy one get one free on all products!!!",
        "Your PayPal account has been limited. Click here to restore access now.",
        "Hot singles in your area want to meet you! Click here to see profiles!!!",
        "Make money fast!!! No experience needed!!! Earn from home today!!!",
        "Warning: Your computer is infected! Download our antivirus now!!!",
        "You have 1 new voicemail. Click here to listen to the message now.",
        "Exclusive deal just for you! Save 80% on luxury watches and handbags!!!",
        "Claim your inheritance now! A distant relative left you $5 million!!!",
    ]

    ham_samples = [
        "Hi, can we reschedule our meeting to tomorrow afternoon? Thanks.",
        "Please find the attached report for the quarterly review meeting.",
        "Thank you for your purchase. Your order #12345 has been shipped.",
        "The project deadline has been moved to next Friday. Please update your timeline.",
        "Happy birthday! Hope you have a wonderful day filled with joy and laughter.",
        "Meeting minutes from yesterday's session are attached for your review.",
        "Your subscription to the newsletter has been confirmed. Welcome aboard!",
        "The package you ordered has been delivered. Please collect it from reception.",
        "Can you review the code changes and provide feedback by end of day?",
        "Reminder: Team lunch at 1 PM today at the Italian restaurant downstairs.",
        "The library books you borrowed are due for return next Monday.",
        "Your appointment with Dr. Smith is confirmed for tomorrow at 10 AM.",
        "Please submit your expense reports by Friday for processing this month.",
        "The conference call details are in the calendar invite. See you then.",
        "Thanks for applying. We will review your application and get back to you.",
    ]

    texts = []
    labels = []

    for _ in range(n_samples // 2):
        texts.append(np.random.choice(spam_samples))
        labels.append(1)
        texts.append(np.random.choice(ham_samples))
        labels.append(0)

    df = pd.DataFrame({'text': texts, 'label': labels})
    df.to_csv(output_path, index=False)
    print(f"Sample dataset created at {output_path} with {len(df)} samples.")
    return df
