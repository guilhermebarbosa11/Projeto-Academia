
from flask import Blueprint, jsonify, request
from app import db
from models.student import Student
from models.workout import Workout
from models.assessment import Assessment
from datetime import datetime

student_bp = Blueprint('students', __name__)

@student_bp.route('/', methods=['GET'])
def get_students():
    students = Student.query.all()
    return jsonify([student.to_dict() for student in students])

@student_bp.route('/<int:student_id>', methods=['GET'])
def get_student(student_id):
    student = Student.query.get_or_404(student_id)
    return jsonify(student.to_dict())

@student_bp.route('/', methods=['POST'])
def create_student():
    data = request.json
    
    # Handle date fields
    birth_date = None
    if data.get('birth_date'):
        birth_date = datetime.fromisoformat(data.get('birth_date')).date()
    
    plan_expiry_date = None
    if data.get('plan_expiry_date'):
        plan_expiry_date = datetime.fromisoformat(data.get('plan_expiry_date')).date()
    
    join_date = None
    if data.get('join_date'):
        join_date = datetime.fromisoformat(data.get('join_date')).date()
    else:
        join_date = datetime.now().date()
    
    # Create student
    new_student = Student(
        name=data.get('name'),
        email=data.get('email'),
        phone=data.get('phone'),
        birth_date=birth_date,
        plan=data.get('plan'),
        plan_expiry_date=plan_expiry_date,
        status=data.get('status', 'active'),
        join_date=join_date,
        photo_url=data.get('photo_url'),
        notes=data.get('notes')
    )
    
    db.session.add(new_student)
    db.session.commit()
    
    return jsonify(new_student.to_dict()), 201

@student_bp.route('/<int:student_id>', methods=['PUT'])
def update_student(student_id):
    student = Student.query.get_or_404(student_id)
    data = request.json
    
    # Update basic fields
    student.name = data.get('name', student.name)
    student.email = data.get('email', student.email)
    student.phone = data.get('phone', student.phone)
    student.plan = data.get('plan', student.plan)
    student.status = data.get('status', student.status)
    student.photo_url = data.get('photo_url', student.photo_url)
    student.notes = data.get('notes', student.notes)
    
    # Handle date fields
    if 'birth_date' in data and data['birth_date']:
        student.birth_date = datetime.fromisoformat(data['birth_date']).date()
    
    if 'plan_expiry_date' in data and data['plan_expiry_date']:
        student.plan_expiry_date = datetime.fromisoformat(data['plan_expiry_date']).date()
    
    if 'join_date' in data and data['join_date']:
        student.join_date = datetime.fromisoformat(data['join_date']).date()
    
    # Handle workouts if provided
    if 'workout_ids' in data:
        workouts = Workout.query.filter(Workout.id.in_(data['workout_ids'])).all()
        student.workouts = workouts
    
    db.session.commit()
    
    return jsonify(student.to_dict())

@student_bp.route('/<int:student_id>', methods=['DELETE'])
def delete_student(student_id):
    student = Student.query.get_or_404(student_id)
    db.session.delete(student)
    db.session.commit()
    return '', 204

@student_bp.route('/<int:student_id>/workouts', methods=['GET'])
def get_student_workouts(student_id):
    student = Student.query.get_or_404(student_id)
    return jsonify([workout.to_dict() for workout in student.workouts])

@student_bp.route('/<int:student_id>/workouts', methods=['POST'])
def assign_workout(student_id):
    student = Student.query.get_or_404(student_id)
    data = request.json
    workout_id = data.get('workout_id')
    
    workout = Workout.query.get_or_404(workout_id)
    student.workouts.append(workout)
    
    db.session.commit()
    
    return jsonify(student.to_dict())

@student_bp.route('/<int:student_id>/assessments', methods=['GET'])
def get_student_assessments(student_id):
    Student.query.get_or_404(student_id)  # Verify student exists
    assessments = Assessment.query.filter_by(student_id=student_id).all()
    return jsonify([assessment.to_dict() for assessment in assessments])
