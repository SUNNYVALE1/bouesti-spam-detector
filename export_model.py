import joblib
import json
import numpy as np
import os

def export_model_weights():
    base_dir = r"C:\Users\sunda\Documents\spam detector\spam_detection_system\spam_detection_system"
    model_path = os.path.join(base_dir, "models", "best_model.joblib")
    preprocessor_path = os.path.join(base_dir, "models", "preprocessor.joblib")
    
    print("Loading trained model and preprocessor...")
    model = joblib.load(model_path)
    preprocessor = joblib.load(preprocessor_path)
    
    # Check if preprocessor wraps vectorizer or is TfidfVectorizer itself
    if hasattr(preprocessor, 'vectorizer'):
        vectorizer = preprocessor.vectorizer
    else:
        vectorizer = preprocessor
        
    vocab = {str(k): int(v) for k, v in vectorizer.vocabulary_.items()}  # word -> index
    idf = [float(val) for val in vectorizer.idf_]
    
    # LogisticRegression coefficients & intercept
    coef = [float(val) for val in model.coef_[0]]
    intercept = float(model.intercept_[0])
    
    # Top spam and ham indicators
    feature_names = vectorizer.get_feature_names_out()
    word_weights = list(zip(feature_names, model.coef_[0]))
    word_weights.sort(key=lambda x: x[1], reverse=True)
    
    top_spam = [str(w) for w, score in word_weights[:50]]
    top_ham = [str(w) for w, score in word_weights[-50:]]
    
    export_data = {
        "model_name": "Logistic Regression",
        "accuracy": 0.9900,
        "f1_score": 0.9896,
        "vocab_size": len(vocab),
        "intercept": intercept,
        "top_spam": top_spam,
        "top_ham": top_ham,
        "vocab": vocab,
        "idf": idf,
        "coef": coef
    }
    
    output_path = r"C:\Users\sunda\Documents\spam detector\model_weights.json"
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(export_data, f, indent=2)
        
    print(f"Exported model weights successfully to {output_path} ({os.path.getsize(output_path)} bytes)")

if __name__ == "__main__":
    export_model_weights()
