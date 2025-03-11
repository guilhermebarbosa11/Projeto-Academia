
# GymPro Flask Backend Setup

This document explains how to set up and run the Flask backend for the GymPro application.

## Prerequisites

- Python 3.8 or higher
- pip (Python package manager)

## Setup

1. Create a virtual environment:
   ```
   python -m venv venv
   ```

2. Activate the virtual environment:
   - On Windows:
     ```
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```
     source venv/bin/activate
     ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Create a `.env` file with your environment variables:
   ```
   FLASK_APP=app.py
   FLASK_ENV=development
   DATABASE_URL=sqlite:///gym.db
   SECRET_KEY=your-secret-key-here
   ```

## Project Structure

```
backend/
├── app.py                # Main application file
├── config.py             # Configuration settings
├── models/               # Database models
│   ├── __init__.py
│   ├── exercise.py
│   ├── workout.py
│   ├── student.py
│   └── class.py
├── routes/               # API endpoints
│   ├── __init__.py
│   ├── exercises.py
│   ├── workouts.py
│   ├── students.py
│   └── classes.py
├── services/            # Business logic
│   ├── __init__.py
│   ├── exercise_service.py
│   ├── workout_service.py
│   ├── student_service.py
│   └── class_service.py
├── requirements.txt     # Python dependencies
└── tests/              # Unit tests
    ├── __init__.py
    ├── test_exercises.py
    ├── test_workouts.py
    ├── test_students.py
    └── test_classes.py
```

## Running the Application

1. Make sure your virtual environment is activated

2. Run the Flask application:
   ```
   flask run
   ```

   The API will be available at `http://localhost:5000`

## API Documentation

The API follows RESTful conventions for all endpoints:

### Exercises
- GET /api/exercises
- GET /api/exercises/<id>
- POST /api/exercises
- PUT /api/exercises/<id>
- DELETE /api/exercises/<id>

### Workouts
- GET /api/workouts
- GET /api/workouts/<id>
- POST /api/workouts
- PUT /api/workouts/<id>
- DELETE /api/workouts/<id>

### Students
- GET /api/students
- GET /api/students/<id>
- POST /api/students
- PUT /api/students/<id>
- DELETE /api/students/<id>
- GET /api/students/<id>/assessments
- POST /api/students/<id>/assessments

### Classes
- GET /api/classes
- GET /api/classes/<id>
- POST /api/classes
- PUT /api/classes/<id>
- DELETE /api/classes/<id>
- POST /api/classes/<id>/register
- POST /api/classes/<id>/cancel

## Next Steps

1. Implement the actual Flask backend following this structure
2. Set up a proper database (PostgreSQL recommended for production)
3. Add authentication and authorization
4. Add input validation and error handling
5. Write comprehensive tests
6. Set up CI/CD pipelines
