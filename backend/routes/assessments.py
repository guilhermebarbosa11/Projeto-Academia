
from flask import Blueprint, jsonify, request
from app import db
from models.assessment import Assessment
from models.student import Student
from datetime import datetime

assessment_bp = Blueprint('assessments', __name__)

@assessment_bp.route('/students/<int:student_id>/assessments', methods=['POST'])
def create_assessment(student_id):
    # Verify student exists
    student = Student.query.get_or_404(student_id)
    
    data = request.json
    
    # Handle date field
    assessment_date = None
    if data.get('date'):
        assessment_date = datetime.fromisoformat(data.get('date')).date()
    else:
        assessment_date = datetime.now().date()
    
    # Create assessment
    new_assessment = Assessment(
        student_id=student_id,
        date=assessment_date,
        weight=data.get('weight'),
        height=data.get('height'),
        body_fat=data.get('body_fat'),
        muscle_mass=data.get('muscle_mass'),
        bmi=data.get('bmi'),
        chest=data.get('chest'),
        waist=data.get('waist'),
        hips=data.get('hips'),
        arms=data.get('arms'),
        thighs=data.get('thighs'),
        notes=data.get('notes')
    )
    
    db.session.add(new_assessment)
    db.session.commit()
    
    return jsonify(new_assessment.to_dict()), 201

@assessment_bp.route('/assessments/<int:assessment_id>', methods=['GET'])
def get_assessment(assessment_id):
    assessment = Assessment.query.get_or_404(assessment_id)
    return jsonify(assessment.to_dict())

@assessment_bp.route('/assessments/<int:assessment_id>', methods=['PUT'])
def update_assessment(assessment_id):
    assessment = Assessment.query.get_or_404(assessment_id)
    data = request.json
    
    # Update fields
    assessment.weight = data.get('weight', assessment.weight)
    assessment.height = data.get('height', assessment.height)
    assessment.body_fat = data.get('body_fat', assessment.body_fat)
    assessment.muscle_mass = data.get('muscle_mass', assessment.muscle_mass)
    assessment.bmi = data.get('bmi', assessment.bmi)
    assessment.chest = data.get('chest', assessment.chest)
    assessment.waist = data.get('waist', assessment.waist)
    assessment.hips = data.get('hips', assessment.hips)
    assessment.arms = data.get('arms', assessment.arms)
    assessment.thighs = data.get('thighs', assessment.thighs)
    assessment.notes = data.get('notes', assessment.notes)
    
    # Handle date field
    if 'date' in data and data['date']:
        assessment.date = datetime.fromisoformat(data['date']).date()
    
    db.session.commit()
    
    return jsonify(assessment.to_dict())

@assessment_bp.route('/assessments/<int:assessment_id>', methods=['DELETE'])
def delete_assessment(assessment_id):
    assessment = Assessment.query.get_or_404(assessment_id)
    db.session.delete(assessment)
    db.session.commit()
    return '', 204
