
from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.model_selection import train_test_split
import pickle
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load and preprocess the data once when the app starts
def preprocess_data():
    try:
        # Check if model already exists
        if os.path.exists('spam_model.pkl'):
            print("Loading existing model...")
            with open('spam_model.pkl', 'rb') as model_file:
                model = pickle.load(model_file)
            with open('vectorizer.pkl', 'rb') as vec_file:
                vectorizer = pickle.load(vec_file)
            return model, vectorizer
        
        print("Training new model...")
        # Load data
        df = pd.read_csv("spam1.csv", encoding='latin-1')
        
        # Drop unused columns
        if any(col in df.columns for col in ['Unnamed: 2', 'Unnamed: 3', 'Unnamed: 4']):
            df.drop(columns=['Unnamed: 2', 'Unnamed: 3', 'Unnamed: 4'], inplace=True)
        
        # Rename columns
        df.rename(columns={'v1': 'target', 'v2': 'text'}, inplace=True)
        
        # Encode target
        encoder = LabelEncoder()
        df['target'] = encoder.fit_transform(df['target'])
        
        # Remove duplicates
        df = df.drop_duplicates(keep='first')
        
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(
            df['text'], df['target'], test_size=0.2, random_state=42
        )
        
        # Vectorize text
        vectorizer = TfidfVectorizer()
        X_train_vec = vectorizer.fit_transform(X_train)
        
        # Train model
        model = MultinomialNB()
        model.fit(X_train_vec, y_train)
        
        # Save model and vectorizer
        with open('spam_model.pkl', 'wb') as model_file:
            pickle.dump(model, model_file)
        with open('vectorizer.pkl', 'wb') as vec_file:
            pickle.dump(vectorizer, vec_file)
            
        return model, vectorizer
        
    except Exception as e:
        print(f"Error in preprocessing: {str(e)}")
        return None, None

model, vectorizer = preprocess_data()

@app.route('/api/detect-spam', methods=['POST'])
def detect_spam():
    try:
        data = request.get_json()
        if not data or 'text' not in data:
            return jsonify({'error': 'No text provided'}), 400
        
        text = data['text']
        
        if not model or not vectorizer:
            return jsonify({'error': 'Model not loaded correctly'}), 500
        
        # Vectorize the input text
        text_vec = vectorizer.transform([text])
        
        # Get prediction
        prediction = model.predict(text_vec)[0]
        
        # Get confidence (probability)
        proba = model.predict_proba(text_vec)[0]
        confidence = proba[1] if prediction == 1 else proba[0]
        
        return jsonify({
            'result': 'spam' if prediction == 1 else 'ham',
            'confidence': float(confidence)
        })
        
    except Exception as e:
        return jsonify({'error': f'Error processing request: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
