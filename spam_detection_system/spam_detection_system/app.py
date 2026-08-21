"""
Spam Detection System - Streamlit Web Application
Real-time spam email classification interface.
"""

import os
import json
import joblib
import numpy as np
import pandas as pd
import streamlit as st
from utils import EmailPreprocessor

# Page configuration
st.set_page_config(
    page_title="Intelligent Spam Email Detection",
    page_icon="📧",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS for better styling
st.markdown("""
<style>
    .main-header {
        font-size: 2.5rem;
        font-weight: bold;
        color: #1f77b4;
        text-align: center;
        margin-bottom: 0.5rem;
    }
    .sub-header {
        font-size: 1.1rem;
        color: #555;
        text-align: center;
        margin-bottom: 2rem;
    }
    .spam-result {
        background-color: #ffebee;
        border-left: 5px solid #e53935;
        padding: 1.5rem;
        border-radius: 8px;
        margin: 1rem 0;
    }
    .ham-result {
        background-color: #e8f5e9;
        border-left: 5px solid #43a047;
        padding: 1.5rem;
        border-radius: 8px;
        margin: 1rem 0;
    }
    .stButton>button {
        width: 100%;
        border-radius: 8px;
        padding: 0.75rem;
        font-weight: bold;
    }
</style>
""", unsafe_allow_html=True)


@st.cache_resource
def load_models():
    """Load the trained model and preprocessor."""
    model_path = "models/best_model.joblib"
    preprocessor_path = "models/preprocessor.joblib"
    info_path = "models/best_model_info.json"

    if not os.path.exists(model_path):
        st.error("Model not found! Please run `python train_models.py` first to train the models.")
        return None, None, None

    model = joblib.load(model_path)
    preprocessor = EmailPreprocessor()
    preprocessor.load(preprocessor_path)

    model_info = None
    if os.path.exists(info_path):
        with open(info_path, 'r') as f:
            model_info = json.load(f)

    return model, preprocessor, model_info


def predict_email(email_text, model, preprocessor):
    """Predict whether an email is spam or ham."""
    processed = preprocessor.preprocess(email_text)

    if not processed.strip():
        return "Unable to classify", 0.0, processed

    features = preprocessor.transform([processed])
    prediction = model.predict(features)[0]

    if hasattr(model, "predict_proba"):
        proba = model.predict_proba(features)[0]
        confidence = proba[1] if prediction == 1 else proba[0]
    elif hasattr(model, "decision_function"):
        decision = model.decision_function(features)[0]
        confidence = 1 / (1 + np.exp(-abs(decision)))
    else:
        confidence = 1.0

    label = "Spam" if prediction == 1 else "Ham (Legitimate)"
    return label, confidence, processed


def get_spam_indicators(email_text, preprocessor, model, top_n=10):
    """Extract top spam-indicating words from the email."""
    try:
        if hasattr(model, 'coef_'):
            coef = model.coef_[0]
            feature_names = preprocessor.vectorizer.get_feature_names_out()
            processed = preprocessor.preprocess(email_text)
            tokens = processed.split()

            indicators = []
            for token in set(tokens):
                if token in feature_names:
                    idx = list(feature_names).index(token)
                    weight = coef[idx]
                    if weight > 0:
                        indicators.append((token, weight))

            indicators.sort(key=lambda x: x[1], reverse=True)
            return indicators[:top_n]

        elif hasattr(model, 'feature_importances_'):
            importance = model.feature_importances_
            feature_names = preprocessor.vectorizer.get_feature_names_out()
            processed = preprocessor.preprocess(email_text)
            tokens = processed.split()

            indicators = []
            for token in set(tokens):
                if token in feature_names:
                    idx = list(feature_names).index(token)
                    weight = importance[idx]
                    indicators.append((token, weight))

            indicators.sort(key=lambda x: x[1], reverse=True)
            return indicators[:top_n]

        return []
    except Exception:
        return []


def main():
    """Main Streamlit application."""

    st.markdown('<div class="main-header">📧 Intelligent Spam Email Detection</div>', unsafe_allow_html=True)
    st.markdown('<div class="sub-header">Machine Learning-Based Email Classification System</div>', unsafe_allow_html=True)

    model, preprocessor, model_info = load_models()

    if model is None:
        st.stop()

    with st.sidebar:
        st.header("System Information")

        if model_info:
            st.subheader("Model Details")
            st.write(f"**Algorithm:** {model_info.get('name', 'Unknown')}")
            st.write(f"**Accuracy:** {model_info.get('accuracy', 0):.4f}")
            st.write(f"**Precision:** {model_info.get('precision', 0):.4f}")
            st.write(f"**Recall:** {model_info.get('recall', 0):.4f}")
            st.write(f"**F1-Score:** {model_info.get('f1_score', 0):.4f}")

            with st.expander("View Hyperparameters"):
                st.json(model_info.get('parameters', {}))

        st.divider()
        st.header("About")
        st.write("""
        This system uses machine learning to classify emails as **Spam** or **Ham**.

        **Developed by:**
        - Esan Oluwaferanmi Elizabeth (5029)
        - Daramola Micheal Olaniyi (5022)
        - Ajimo Samson Oluwasanmi (4955)

        **Supervisor:** Mrs. Ariyo
        *BOUESTI - Computer Science*
        """)

    tab1, tab2, tab3 = st.tabs(["Classify Email", "Batch Classification", "How It Works"])

    with tab1:
        st.header("Classify a Single Email")

        input_method = st.radio("Choose input method:", ["Paste Email Text", "Use Sample Emails"], horizontal=True)

        email_text = ""

        if input_method == "Paste Email Text":
            email_text = st.text_area(
                "Enter email content (subject + body):",
                height=250,
                placeholder="Paste the full email text here including subject and body..."
            )
        else:
            sample_emails = {
                "Advertising Spam": """Subject: Congratulations!!! You Won $1,000,000!!!

Dear Winner,

CONGRATULATIONS!!! You have been selected as the lucky winner of our international lottery draw! You have won ONE MILLION DOLLARS!!!

To claim your prize, please send us your bank account details and a small processing fee of $500. Act now! This offer expires in 24 hours!!!

Click here now: http://fake-lottery-scam.com/claim

Best regards,
Lottery Coordinator""",

                "Phishing Email": """Subject: URGENT: Your Account Will Be Suspended

Dear Valued Customer,

We have detected unusual activity on your account. Your account will be suspended within 24 hours if you do not verify your information immediately.

Please click the link below and enter your login credentials to restore access:

http://fake-bank-login.com/verify

Failure to act will result in permanent account closure.

Security Team""",

                "Legitimate Work Email": """Subject: Project Update - Q3 Marketing Campaign

Hi Team,

I hope this email finds you well. I wanted to share the latest updates on our Q3 marketing campaign.

The creative assets have been finalized and approved by the design team. We are on track to launch next Monday as scheduled. Please review the attached timeline and let me know if you have any concerns.

Also, please remember to submit your expense reports by Friday for this month's processing.

Best regards,
Sarah
Marketing Manager""",

                "Order Confirmation": """Subject: Your Order #12345 Has Been Shipped

Hi John,

Thank you for your purchase! Your order #12345 has been shipped and is on its way.

Tracking Number: 1Z999AA10123456784
Estimated Delivery: August 12, 2026

Items:
- Wireless Bluetooth Headphones x 1
- USB-C Cable (2m) x 2

You can track your package at: https://real-store.com/track

Thanks for shopping with us!
Customer Service Team"""
            }

            selected_sample = st.selectbox("Select a sample email:", list(sample_emails.keys()))
            email_text = sample_emails[selected_sample]
            st.text_area("Email content:", email_text, height=250, disabled=True)

        col1, col2, col3 = st.columns([1, 1, 1])
        with col2:
            classify_clicked = st.button("Classify Email", type="primary", use_container_width=True)

        if classify_clicked and email_text.strip():
            with st.spinner("Analyzing email content..."):
                prediction, confidence, processed = predict_email(email_text, model, preprocessor)

            st.divider()

            if prediction == "Spam":
                st.error(f"🚫 SPAM DETECTED")
                st.write(f"This email has been classified as **SPAM** with **{confidence*100:.1f}%** confidence.")
            elif prediction == "Ham (Legitimate)":
                st.success(f"✅ LEGITIMATE EMAIL")
                st.write(f"This email has been classified as **LEGITIMATE (HAM)** with **{confidence*100:.1f}%** confidence.")
            else:
                st.warning("Unable to classify this email. The content may be too short or unclear.")

            st.subheader("Confidence Score")
            st.progress(float(confidence))
            st.caption(f"Confidence: {confidence*100:.2f}%")

            if prediction == "Spam":
                indicators = get_spam_indicators(email_text, preprocessor, model)
                if indicators:
                    st.subheader("Key Spam Indicators Detected")
                    indicator_df = pd.DataFrame(indicators, columns=["Word/Phrase", "Spam Weight"])
                    indicator_df["Spam Weight"] = indicator_df["Spam Weight"].round(4)
                    st.dataframe(indicator_df, use_container_width=True, hide_index=True)

            with st.expander("View Preprocessed Text"):
                st.code(processed, language="text")

        elif classify_clicked and not email_text.strip():
            st.warning("Please enter some email text to classify.")

    with tab2:
        st.header("Batch Email Classification")
        st.write("Upload a CSV file with emails to classify multiple emails at once.")

        uploaded_file = st.file_uploader("Upload CSV file", type=['csv'])

        if uploaded_file is not None:
            try:
                df = pd.read_csv(uploaded_file)
                st.write(f"Loaded {len(df)} emails from CSV.")
                st.dataframe(df.head(), use_container_width=True)

                text_col = None
                for col in df.columns:
                    if any(keyword in col.lower() for keyword in ['text', 'email', 'message', 'content', 'body']):
                        text_col = col
                        break

                if text_col is None:
                    text_col = st.selectbox("Select the column containing email text:", df.columns)
                else:
                    st.success(f"Detected text column: **{text_col}**")

                if st.button("Classify All Emails", type="primary"):
                    progress_bar = st.progress(0)
                    status_text = st.empty()

                    results = []
                    for i, text in enumerate(df[text_col]):
                        if pd.isna(text):
                            results.append({"Prediction": "N/A", "Confidence": 0, "Processed": ""})
                        else:
                            pred, conf, proc = predict_email(str(text), model, preprocessor)
                            results.append({
                                "Prediction": pred,
                                "Confidence": round(conf * 100, 2),
                                "Processed": proc
                            })

                        progress = (i + 1) / len(df)
                        progress_bar.progress(progress)
                        status_text.text(f"Processing email {i+1} of {len(df)}...")

                    results_df = pd.DataFrame(results)
                    display_df = pd.concat([df, results_df], axis=1)

                    st.success("Classification complete!")

                    spam_count = len(results_df[results_df['Prediction'] == 'Spam'])
                    ham_count = len(results_df[results_df['Prediction'] == 'Ham (Legitimate)'])

                    col1, col2, col3 = st.columns(3)
                    col1.metric("Total Emails", len(df))
                    col2.metric("Spam Detected", spam_count, delta=f"{spam_count/len(df)*100:.1f}%")
                    col3.metric("Legitimate", ham_count, delta=f"{ham_count/len(df)*100:.1f}%")

                    st.subheader("Results")
                    st.dataframe(display_df, use_container_width=True)

                    csv = display_df.to_csv(index=False).encode('utf-8')
                    st.download_button(
                        label="Download Results as CSV",
                        data=csv,
                        file_name="spam_detection_results.csv",
                        mime="text/csv"
                    )

            except Exception as e:
                st.error(f"Error processing file: {str(e)}")

    with tab3:
        st.header("How The System Works")

        st.markdown("""
        ### System Architecture

        The spam detection system follows a modular pipeline:

        ```
        Raw Email → Preprocessing → TF-IDF Features → ML Model → Prediction
        ```

        #### 1. Data Preprocessing
        - **Cleaning**: Remove HTML tags, URLs, email addresses, numbers, and special characters
        - **Normalization**: Convert to lowercase, remove extra whitespace
        - **Tokenization**: Split text into individual words
        - **Stop-word Removal**: Eliminate common words (the, and, is, etc.)
        - **Lemmatization**: Reduce words to their base form (running → run)

        #### 2. Feature Extraction (TF-IDF)
        - Converts text into numerical vectors
        - Uses unigrams and bigrams for context
        - Highlights important words while reducing common word influence
        - Maximum 10,000 features

        #### 3. Machine Learning Models
        The system compares four algorithms:

        | Model | Type | Strength |
        |-------|------|----------|
        | Multinomial Naive Bayes | Probabilistic | Fast, excellent with sparse text |
        | Support Vector Machine | Geometric | High accuracy, handles high dimensions |
        | Logistic Regression | Linear | Interpretable, good baseline |
        | Random Forest | Ensemble | Robust, handles non-linear data |

        #### 4. Evaluation Metrics
        - **Accuracy**: Overall correctness
        - **Precision**: Of emails flagged as spam, how many actually are spam
        - **Recall**: Of all actual spam, how many were caught
        - **F1-Score**: Harmonic mean of precision and recall

        ### Dataset
        The Enron Spam Dataset (33,716 emails) was used for training:
        - ~51% Spam, ~49% Ham (balanced)
        - 80% Training, 10% Validation, 10% Testing
        - 5-fold cross-validation for hyperparameter tuning
        """)

        results_csv = "results/model_comparison.csv"
        if os.path.exists(results_csv):
            st.subheader("Model Comparison Results")
            results_df = pd.read_csv(results_csv)
            st.dataframe(results_df, use_container_width=True, hide_index=True)


if __name__ == "__main__":
    main()
