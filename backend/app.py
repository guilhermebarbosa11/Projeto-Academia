
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize database
db = SQLAlchemy()

def create_app():
    # Initialize Flask app
    app = Flask(__name__)
    CORS(app)  # Enable CORS for all routes

    # Configure database
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///gym.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-key-for-development-only')

    # Initialize extensions with app
    db.init_app(app)

    # Import blueprints from each module individually
    from routes.exercises import exercise_bp
    from routes.workouts import workout_bp
    from routes.students import student_bp
    from routes.classes import class_bp
    from routes.assessments import assessment_bp

    # Register blueprints
    app.register_blueprint(exercise_bp, url_prefix='/api/exercises')
    app.register_blueprint(workout_bp, url_prefix='/api/workouts')
    app.register_blueprint(student_bp, url_prefix='/api/students')
    app.register_blueprint(class_bp, url_prefix='/api/classes')
    app.register_blueprint(assessment_bp, url_prefix='/api')

    # Health check endpoint
    @app.route('/api/health', methods=['GET'])
    def health_check():
        return jsonify({'status': 'healthy', 'timestamp': datetime.now().isoformat()})

    return app

if __name__ == '__main__':
    app = create_app()
    # Create tables before running the app
    with app.app_context():
        db.create_all()
    app.run(debug=True)
