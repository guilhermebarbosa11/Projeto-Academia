# GymPro Backend

Flask backend for the GymPro gym management system.

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

4. Set up environment variables:
   - Copy `.env.example` to `.env` (if needed)
   - Modify values as needed

## Initialize the Database

To create and seed the database with initial data:

```
python seed.py
```

## Running the Application

Start the Flask development server:

```
python app.py
```

Or using Flask CLI:

```
flask run
```

The API will be available at http://localhost:5000/api

## API Endpoints

### Exercises
- GET /api/exercises
- GET /api/exercises/<id>
- POST /api/exercises
- PUT /api/exercises/<id>
- DELETE /api/exercises/<id>
- GET /api/exercises/muscle-groups
- POST /api/exercises/muscle-groups

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