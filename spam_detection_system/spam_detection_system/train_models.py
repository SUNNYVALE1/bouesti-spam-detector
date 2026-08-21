"""
Spam Detection System - Training & Evaluation Pipeline
Trains and compares 4 ML models: MNB, SVM, Logistic Regression, Random Forest
"""

import os
import sys
import time
import warnings
warnings.filterwarnings('ignore')

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split, GridSearchCV, cross_val_score
from sklearn.naive_bayes import MultinomialNB
from sklearn.svm import LinearSVC
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (accuracy_score, precision_score, recall_score, f1_score,
                             confusion_matrix, classification_report, roc_curve, auc,
                             precision_recall_curve)
import joblib

from utils import EmailPreprocessor, load_enron_dataset, create_sample_dataset

# Set style for plots
plt.style.use('seaborn-v0_8-whitegrid')
sns.set_palette("husl")


class SpamDetectionTrainer:
    """
    Complete training pipeline for spam email detection.
    Handles data loading, preprocessing, model training, evaluation, and saving.
    """

    def __init__(self, data_path, output_dir="models", results_dir="results"):
        """
        Initialize trainer.

        Args:
            data_path: Path to dataset (CSV or directory)
            output_dir: Directory to save trained models
            results_dir: Directory to save evaluation results and plots
        """
        self.data_path = data_path
        self.output_dir = output_dir
        self.results_dir = results_dir

        os.makedirs(output_dir, exist_ok=True)
        os.makedirs(results_dir, exist_ok=True)

        self.preprocessor = None
        self.models = {}
        self.results = {}
        self.X_train = None
        self.X_val = None
        self.X_test = None
        self.y_train = None
        self.y_val = None
        self.y_test = None
        self.feature_names = None

    def load_and_prepare_data(self, test_size=0.2, val_size=0.1, random_state=42):
        """
        Load dataset and split into train/validation/test sets.
        Default split: 80% train, 10% validation, 10% test.

        Args:
            test_size: Proportion of data for testing (0.2 = 20% for test+val)
            val_size: Proportion of test_size for validation (0.1 = 10% of total for val)
            random_state: Random seed for reproducibility
        """
        print("=" * 60)
        print("LOADING AND PREPARING DATA")
        print("=" * 60)

        # Load dataset
        if not os.path.exists(self.data_path):
            print(f"Dataset not found at {self.data_path}. Creating sample dataset...")
            self.data_path = "data/sample_dataset.csv"
            create_sample_dataset(self.data_path, n_samples=2000)

        df = load_enron_dataset(self.data_path)
        print(f"\nDataset loaded: {len(df)} emails")
        print(f"Ham (legitimate): {len(df[df['label'] == 0])}")
        print(f"Spam: {len(df[df['label'] == 1])}")
        print(f"Class distribution: {df['label'].value_counts(normalize=True).to_dict()}")

        # Remove duplicates
        before = len(df)
        df = df.drop_duplicates(subset=['text']).reset_index(drop=True)
        after = len(df)
        print(f"\nDuplicates removed: {before - after} (remaining: {after})")

        # Initialize preprocessor
        self.preprocessor = EmailPreprocessor(
            remove_stopwords=True,
            use_stemming=False,
            use_lemmatization=True,
            min_word_length=2,
            max_features=10000
        )

        # Preprocess all texts
        print("\nPreprocessing emails (cleaning, tokenization, lemmatization)...")
        df['processed_text'] = df['text'].apply(self.preprocessor.preprocess)

        # Remove empty texts after preprocessing
        df = df[df['processed_text'].str.len() > 0].reset_index(drop=True)
        print(f"Emails after preprocessing: {len(df)}")

        # Extract features using TF-IDF
        print("\nExtracting TF-IDF features...")
        X = self.preprocessor.fit_transform(df['processed_text'])
        self.feature_names = self.preprocessor.vectorizer.get_feature_names_out()
        y = np.array(df['label'].tolist(), dtype=int)

        print(f"Feature matrix shape: {X.shape}")
        print(f"Vocabulary size: {len(self.feature_names)}")

        # Split data: First separate test set, then split remaining into train/val
        # For 80:10:10 split: test_size=0.2 (20% for val+test), then val is 50% of that (10% total)
        X_temp, self.X_test, y_temp, self.y_test = train_test_split(
            X, y, test_size=test_size, random_state=random_state, stratify=y
        )

        # From remaining 80%, take val_size/(1-test_size) for validation
        # 0.1 / 0.8 = 0.125
        val_ratio = val_size / (1 - test_size)
        self.X_train, self.X_val, self.y_train, self.y_val = train_test_split(
            X_temp, y_temp, test_size=val_ratio, random_state=random_state, stratify=y_temp
        )

        print(f"\nData split:")
        print(f"  Training set: {self.X_train.shape[0]} samples ({self.X_train.shape[0]/len(df)*100:.1f}%)")
        print(f"  Validation set: {self.X_val.shape[0]} samples ({self.X_val.shape[0]/len(df)*100:.1f}%)")
        print(f"  Test set: {self.X_test.shape[0]} samples ({self.X_test.shape[0]/len(df)*100:.1f}%)")

        # Save preprocessor
        self.preprocessor.save(os.path.join(self.output_dir, "preprocessor.joblib"))
        print(f"\nPreprocessor saved to {self.output_dir}/preprocessor.joblib")

        return self

    def train_models(self):
        """
        Train all four machine learning models with hyperparameter tuning.
        """
        print("\n" + "=" * 60)
        print("TRAINING MODELS")
        print("=" * 60)

        # Define models and their hyperparameter grids
        model_configs = {
            'Multinomial Naive Bayes': {
                'model': MultinomialNB(),
                'params': {
                    'alpha': [0.1, 0.5, 1.0, 2.0]
                }
            },
            'Support Vector Machine': {
                'model': LinearSVC(class_weight='balanced', max_iter=5000, dual=False),
                'params': {
                    'C': [0.01, 0.1, 1.0, 10.0],
                    'penalty': ['l1', 'l2']
                }
            },
            'Logistic Regression': {
                'model': LogisticRegression(class_weight='balanced', max_iter=1000, solver='liblinear'),
                'params': {
                    'C': [0.01, 0.1, 1.0, 10.0],
                    'penalty': ['l1', 'l2']
                }
            },
            'Random Forest': {
                'model': RandomForestClassifier(class_weight='balanced', random_state=42, n_jobs=-1),
                'params': {
                    'n_estimators': [50, 100, 200],
                    'max_depth': [10, 20, None],
                    'min_samples_split': [2, 5]
                }
            }
        }

        for name, config in model_configs.items():
            print(f"\n{'-' * 50}")
            print(f"Training: {name}")
            print(f"{'-' * 50}")

            start_time = time.time()

            # Grid search with cross-validation on training set
            grid_search = GridSearchCV(
                config['model'],
                config['params'],
                cv=5,
                scoring='f1',
                n_jobs=-1,
                verbose=0
            )

            grid_search.fit(self.X_train, self.y_train)

            training_time = time.time() - start_time

            best_model = grid_search.best_estimator_
            best_params = grid_search.best_params_

            print(f"Best parameters: {best_params}")
            print(f"Training time: {training_time:.2f} seconds")

            # Store model
            self.models[name] = {
                'model': best_model,
                'params': best_params,
                'training_time': training_time
            }

            # Save model
            joblib.dump(best_model, os.path.join(self.output_dir, f"{name.replace(' ', '_').lower()}.joblib"))

        print(f"\nAll models trained and saved to {self.output_dir}/")
        return self

    def evaluate_models(self):
        """
        Evaluate all trained models on validation and test sets.
        Compute accuracy, precision, recall, F1-score, and confusion matrices.
        """
        print("\n" + "=" * 60)
        print("EVALUATING MODELS")
        print("=" * 60)

        metrics_list = []

        for name, model_info in self.models.items():
            model = model_info['model']

            # Predictions on validation set
            y_val_pred = model.predict(self.X_val)

            # Predictions on test set
            y_test_pred = model.predict(self.X_test)

            # Get prediction probabilities/scores where possible (for ROC curve)
            if hasattr(model, "predict_proba"):
                y_test_scores = model.predict_proba(self.X_test)[:, 1]
            elif hasattr(model, "decision_function"):
                y_test_scores = model.decision_function(self.X_test)
            else:
                y_test_scores = y_test_pred.astype(float)

            # Calculate metrics for test set
            accuracy = accuracy_score(self.y_test, y_test_pred)
            precision = precision_score(self.y_test, y_test_pred, zero_division=0)
            recall = recall_score(self.y_test, y_test_pred, zero_division=0)
            f1 = f1_score(self.y_test, y_test_pred, zero_division=0)

            # Confusion matrix
            cm = confusion_matrix(self.y_test, y_test_pred)
            tn, fp, fn, tp = cm.ravel()

            # Store results
            self.results[name] = {
                'accuracy': accuracy,
                'precision': precision,
                'recall': recall,
                'f1_score': f1,
                'confusion_matrix': cm,
                'true_positives': tp,
                'true_negatives': tn,
                'false_positives': fp,
                'false_negatives': fn,
                'y_test_pred': y_test_pred,
                'y_test_scores': y_test_scores,
                'training_time': model_info['training_time'],
                'best_params': model_info['params']
            }

            metrics_list.append({
                'Model': name,
                'Accuracy': accuracy,
                'Precision': precision,
                'Recall': recall,
                'F1-Score': f1,
                'Training Time (s)': model_info['training_time'],
                'True Positives': tp,
                'True Negatives': tn,
                'False Positives': fp,
                'False Negatives': fn
            })

            print(f"\n{name}:")
            print(f"  Accuracy:  {accuracy:.4f}")
            print(f"  Precision: {precision:.4f}")
            print(f"  Recall:    {recall:.4f}")
            print(f"  F1-Score:  {f1:.4f}")
            print(f"  Confusion Matrix: TP={tp}, TN={tn}, FP={fp}, FN={fn}")

        # Create results DataFrame
        self.results_df = pd.DataFrame(metrics_list)
        self.results_df = self.results_df.sort_values('F1-Score', ascending=False)

        # Save results to CSV
        self.results_df.to_csv(os.path.join(self.results_dir, "model_comparison.csv"), index=False)
        print(f"\nResults saved to {self.results_dir}/model_comparison.csv")

        return self

    def generate_plots(self):
        """
        Generate visualization plots for model comparison.
        """
        print("\n" + "=" * 60)
        print("GENERATING PLOTS")
        print("=" * 60)

        # 1. Metrics Comparison Bar Chart
        fig, axes = plt.subplots(2, 2, figsize=(14, 12))
        fig.suptitle('Model Performance Comparison', fontsize=16, fontweight='bold')

        metrics = ['Accuracy', 'Precision', 'Recall', 'F1-Score']
        colors = ['#3498db', '#2ecc71', '#e74c3c', '#9b59b6']

        for idx, (metric, color) in enumerate(zip(metrics, colors)):
            ax = axes[idx // 2, idx % 2]
            bars = ax.bar(self.results_df['Model'], self.results_df[metric], color=color, alpha=0.8, edgecolor='black')
            ax.set_title(f'{metric}', fontsize=13, fontweight='bold')
            ax.set_ylabel(metric, fontsize=11)
            ax.set_ylim(0, 1.05)
            ax.tick_params(axis='x', rotation=15)

            # Add value labels on bars
            for bar in bars:
                height = bar.get_height()
                ax.text(bar.get_x() + bar.get_width()/2., height,
                       f'{height:.3f}', ha='center', va='bottom', fontsize=9, fontweight='bold')

            ax.grid(axis='y', alpha=0.3)

        plt.tight_layout()
        plt.savefig(os.path.join(self.results_dir, "metrics_comparison.png"), dpi=300, bbox_inches='tight')
        plt.close()
        print("  Saved: metrics_comparison.png")

        # 2. Confusion Matrices
        fig, axes = plt.subplots(2, 2, figsize=(12, 10))
        fig.suptitle('Confusion Matrices', fontsize=16, fontweight='bold')

        for idx, (name, result) in enumerate(self.results.items()):
            ax = axes[idx // 2, idx % 2]
            cm = result['confusion_matrix']

            sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', ax=ax,
                       xticklabels=['Ham', 'Spam'], yticklabels=['Ham', 'Spam'],
                       cbar_kws={'shrink': 0.8})
            ax.set_title(f'{name}', fontsize=12, fontweight='bold')
            ax.set_xlabel('Predicted', fontsize=10)
            ax.set_ylabel('Actual', fontsize=10)

        plt.tight_layout()
        plt.savefig(os.path.join(self.results_dir, "confusion_matrices.png"), dpi=300, bbox_inches='tight')
        plt.close()
        print("  Saved: confusion_matrices.png")

        # 3. ROC Curves
        fig, ax = plt.subplots(figsize=(10, 8))

        for name, result in self.results.items():
            y_scores = result['y_test_scores']
            # Handle SVM decision function (can be negative, need to normalize for ROC)
            if np.any(y_scores < 0) or np.any(y_scores > 1):
                # Normalize to [0, 1] using min-max scaling
                y_scores = (y_scores - y_scores.min()) / (y_scores.max() - y_scores.min() + 1e-10)

            fpr, tpr, _ = roc_curve(self.y_test, y_scores)
            roc_auc = auc(fpr, tpr)
            ax.plot(fpr, tpr, linewidth=2, label=f'{name} (AUC = {roc_auc:.3f})')

        ax.plot([0, 1], [0, 1], 'k--', linewidth=1, label='Random Classifier')
        ax.set_xlabel('False Positive Rate', fontsize=12)
        ax.set_ylabel('True Positive Rate', fontsize=12)
        ax.set_title('ROC Curves', fontsize=14, fontweight='bold')
        ax.legend(loc='lower right', fontsize=10)
        ax.grid(alpha=0.3)
        ax.set_xlim([0.0, 1.0])
        ax.set_ylim([0.0, 1.05])

        plt.tight_layout()
        plt.savefig(os.path.join(self.results_dir, "roc_curves.png"), dpi=300, bbox_inches='tight')
        plt.close()
        print("  Saved: roc_curves.png")

        # 4. Training Time Comparison
        fig, ax = plt.subplots(figsize=(10, 6))
        bars = ax.bar(self.results_df['Model'], self.results_df['Training Time (s)'], 
                      color='#f39c12', alpha=0.8, edgecolor='black')
        ax.set_title('Training Time Comparison', fontsize=14, fontweight='bold')
        ax.set_ylabel('Time (seconds)', fontsize=12)
        ax.tick_params(axis='x', rotation=15)

        for bar in bars:
            height = bar.get_height()
            ax.text(bar.get_x() + bar.get_width()/2., height,
                   f'{height:.2f}s', ha='center', va='bottom', fontsize=9, fontweight='bold')

        ax.grid(axis='y', alpha=0.3)
        plt.tight_layout()
        plt.savefig(os.path.join(self.results_dir, "training_time.png"), dpi=300, bbox_inches='tight')
        plt.close()
        print("  Saved: training_time.png")

        # 5. Feature Importance (for Random Forest and Logistic Regression)
        fig, axes = plt.subplots(1, 2, figsize=(16, 6))

        # Random Forest feature importance
        rf_model = self.models['Random Forest']['model']
        rf_importance = rf_model.feature_importances_
        rf_top_idx = np.argsort(rf_importance)[-15:]
        axes[0].barh(range(15), rf_importance[rf_top_idx], color='#27ae60', alpha=0.8)
        axes[0].set_yticks(range(15))
        axes[0].set_yticklabels([self.feature_names[i] for i in rf_top_idx], fontsize=9)
        axes[0].set_title('Random Forest - Top 15 Important Features', fontsize=12, fontweight='bold')
        axes[0].set_xlabel('Importance', fontsize=10)
        axes[0].grid(axis='x', alpha=0.3)

        # Logistic Regression coefficients
        lr_model = self.models['Logistic Regression']['model']
        lr_coef = lr_model.coef_[0]
        lr_top_idx = np.argsort(np.abs(lr_coef))[-15:]
        colors = ['#e74c3c' if lr_coef[i] > 0 else '#3498db' for i in lr_top_idx]
        axes[1].barh(range(15), lr_coef[lr_top_idx], color=colors, alpha=0.8)
        axes[1].set_yticks(range(15))
        axes[1].set_yticklabels([self.feature_names[i] for i in lr_top_idx], fontsize=9)
        axes[1].set_title('Logistic Regression - Top 15 Feature Coefficients', fontsize=12, fontweight='bold')
        axes[1].set_xlabel('Coefficient Value', fontsize=10)
        axes[1].axvline(x=0, color='black', linestyle='-', linewidth=0.5)
        axes[1].grid(axis='x', alpha=0.3)

        plt.tight_layout()
        plt.savefig(os.path.join(self.results_dir, "feature_importance.png"), dpi=300, bbox_inches='tight')
        plt.close()
        print("  Saved: feature_importance.png")

        print(f"\nAll plots saved to {self.results_dir}/")
        return self

    def select_best_model(self):
        """
        Select the best performing model based on F1-Score.
        Save it as the final deployed model.
        """
        print("\n" + "=" * 60)
        print("SELECTING BEST MODEL")
        print("=" * 60)

        best_model_name = self.results_df.iloc[0]['Model']
        best_f1 = self.results_df.iloc[0]['F1-Score']

        print(f"\nBest Model: {best_model_name}")
        print(f"F1-Score: {best_f1:.4f}")
        print(f"Accuracy: {self.results_df.iloc[0]['Accuracy']:.4f}")
        print(f"Precision: {self.results_df.iloc[0]['Precision']:.4f}")
        print(f"Recall: {self.results_df.iloc[0]['Recall']:.4f}")

        # Save best model with a generic name for the app
        best_model = self.models[best_model_name]['model']
        joblib.dump(best_model, os.path.join(self.output_dir, "best_model.joblib"))

        # Save model info
        model_info = {
            'name': best_model_name,
            'accuracy': float(self.results_df.iloc[0]['Accuracy']),
            'precision': float(self.results_df.iloc[0]['Precision']),
            'recall': float(self.results_df.iloc[0]['Recall']),
            'f1_score': float(best_f1),
            'parameters': self.models[best_model_name]['params']
        }

        import json
        with open(os.path.join(self.output_dir, "best_model_info.json"), 'w') as f:
            json.dump(model_info, f, indent=4)

        print(f"\nBest model saved as 'best_model.joblib'")
        print(f"Model info saved as 'best_model_info.json'")

        return best_model_name

    def print_classification_reports(self):
        """
        Print detailed classification reports for all models.
        """
        print("\n" + "=" * 60)
        print("DETAILED CLASSIFICATION REPORTS")
        print("=" * 60)

        for name, result in self.results.items():
            print(f"\n{'-' * 50}")
            print(f"Model: {name}")
            print(f"{'-' * 50}")
            print(classification_report(self.y_test, result['y_test_pred'], 
                                       target_names=['Ham (Legitimate)', 'Spam']))


def main():
    """
    Main execution function.
    Run: python train_models.py --data path/to/dataset
    """
    import argparse

    parser = argparse.ArgumentParser(description='Train Spam Detection Models')
    parser.add_argument('--data', type=str, default='data/enron_spam_data.csv',
                       help='Path to dataset (CSV file or directory with ham/spam folders)')
    parser.add_argument('--output', type=str, default='models',
                       help='Directory to save trained models')
    parser.add_argument('--results', type=str, default='results',
                       help='Directory to save evaluation results')

    args = parser.parse_args()

    print("\n" + "=" * 60)
    print("INTELLIGENT SPAM EMAIL DETECTION SYSTEM")
    print("Training & Evaluation Pipeline")
    print("=" * 60)

    # Initialize trainer
    trainer = SpamDetectionTrainer(
        data_path=args.data,
        output_dir=args.output,
        results_dir=args.results
    )

    # Run full pipeline
    trainer.load_and_prepare_data()          .train_models()          .evaluate_models()          .generate_plots()          .print_classification_reports()

    best_model = trainer.select_best_model()

    print("\n" + "=" * 60)
    print("TRAINING COMPLETE")
    print("=" * 60)
    print(f"\nBest performing model: {best_model}")
    print(f"Models saved in: {args.output}/")
    print(f"Results and plots saved in: {args.results}/")
    print("\nNext step: Run 'streamlit run app.py' to launch the web interface.")
    print("=" * 60)


if __name__ == "__main__":
    main()
