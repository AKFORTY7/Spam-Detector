
# Spam Detection Web Application

This is a web application that uses a machine learning model to detect spam messages. The application consists of a React frontend and a Flask backend API.

## Project Structure

- `/src`: Frontend React application
- `/backend`: Flask API server that runs the spam detection model

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
```
cd backend
```

2. Create a virtual environment:
```
python -m venv venv
```

3. Activate the virtual environment:
```
# On Windows
venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate
```

4. Install dependencies:
```
pip install -r requirements.txt
```

5. Make sure you have the dataset file `spam1.csv` in the backend directory.

6. Start the backend server:
```
python app.py
```

The backend server will run on http://localhost:5000

### Frontend Setup

1. Install dependencies:
```
npm install
```

2. Start the development server:
```
npm run dev
```

The frontend application will run on http://localhost:8080

## API Endpoints

- POST `/api/detect-spam`: Analyzes text for spam content
  - Request body: `{ "text": "message to analyze" }`
  - Response: `{ "result": "spam" | "ham", "confidence": 0.95 }`

## Features

- Real-time spam detection
- Displays confidence level of the prediction
- Graceful fallback to frontend-based detection if backend is unavailable
