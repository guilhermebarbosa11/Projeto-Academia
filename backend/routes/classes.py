
from flask import Blueprint, jsonify, request
from app import db
from models.class_model import Class
from models.student import Student
from datetime import datetime

class_bp = Blueprint('classes', __name__)

@class_bp.route('/', methods=['GET'])
def get_classes():
    classes = Class.query.all()
    return jsonify([cls.to_dict() for cls in classes])

@class_bp.route('/<int:class_id>', methods=['GET'])
def get_class(class_id):
    cls = Class.query.get_or_404(class_id)
    return jsonify(cls.to_dict())

@class_bp.route('/', methods=['POST'])
def create_class():
    data = request.json
    
    # Handle date field
    date = None
    if data.get('date'):
        date = datetime.fromisoformat(data.get('date')).date()
    else:
        date = datetime.now().date()
    
    # Create class
    new_class = Class(
        title=data.get('title'),
        description=data.get('description'),
        date=date,
        start_time=data.get('start_time'),
        end_time=data.get('end_time'),
        instructor=data.get('instructor'),
        max_participants=data.get('max_participants'),
        type=data.get('type'),
        room=data.get('room')
    )
    
    db.session.add(new_class)
    db.session.commit()
    
    return jsonify(new_class.to_dict()), 201

@class_bp.route('/<int:class_id>', methods=['PUT'])
def update_class(class_id):
    cls = Class.query.get_or_404(class_id)
    data = request.json
    
    # Update basic fields
    cls.title = data.get('title', cls.title)
    cls.description = data.get('description', cls.description)
    cls.start_time = data.get('start_time', cls.start_time)
    cls.end_time = data.get('end_time', cls.end_time)
    cls.instructor = data.get('instructor', cls.instructor)
    cls.max_participants = data.get('max_participants', cls.max_participants)
    cls.type = data.get('type', cls.type)
    cls.room = data.get('room', cls.room)
    
    # Handle date field
    if 'date' in data and data['date']:
        cls.date = datetime.fromisoformat(data['date']).date()
    
    db.session.commit()
    
    return jsonify(cls.to_dict())

@class_bp.route('/<int:class_id>', methods=['DELETE'])
def delete_class(class_id):
    cls = Class.query.get_or_404(class_id)
    db.session.delete(cls)
    db.session.commit()
    return '', 204

@class_bp.route('/<int:class_id>/register', methods=['POST'])
def register_student(class_id):
    cls = Class.query.get_or_404(class_id)
    data = request.json
    student_id = data.get('student_id')
    
    student = Student.query.get_or_404(student_id)
    
    # Check if class is full
    if cls.max_participants and len(cls.students) >= cls.max_participants:
        return jsonify({'error': 'Class is already full'}), 400
    
    # Check if student is already registered
    if student in cls.students:
        return jsonify({'error': 'Student is already registered for this class'}), 400
    
    # Register student
    cls.students.append(student)
    db.session.commit()
    
    return jsonify(cls.to_dict())

@class_bp.route('/<int:class_id>/cancel', methods=['POST'])
def cancel_registration(class_id):
    cls = Class.query.get_or_404(class_id)
    data = request.json
    student_id = data.get('student_id')
    
    student = Student.query.get_or_404(student_id)
    
    # Check if student is registered
    if student not in cls.students:
        return jsonify({'error': 'Student is not registered for this class'}), 400
    
    # Cancel registration
    cls.students.remove(student)
    db.session.commit()
    
    return jsonify(cls.to_dict())
