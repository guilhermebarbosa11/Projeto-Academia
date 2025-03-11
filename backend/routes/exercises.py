from flask import Blueprint, jsonify, request
from app import db
from models.exercise import Exercise, MuscleGroup

exercise_bp = Blueprint('exercises', __name__)

@exercise_bp.route('/', methods=['GET'])
def get_exercises():
    exercises = Exercise.query.all()
    return jsonify([exercise.to_dict() for exercise in exercises])

@exercise_bp.route('/<int:exercise_id>', methods=['GET'])
def get_exercise(exercise_id):
    exercise = Exercise.query.get_or_404(exercise_id)
    return jsonify(exercise.to_dict())

@exercise_bp.route('/', methods=['POST'])
def create_exercise():
    data = request.json
    
    # Handle muscle groups
    muscle_group_ids = data.pop('muscle_group_ids', [])
    muscle_groups = MuscleGroup.query.filter(MuscleGroup.id.in_(muscle_group_ids)).all()
    
    # Create exercise
    new_exercise = Exercise(
        name=data.get('name'),
        description=data.get('description'),
        image_url=data.get('image_url'),
        difficulty=data.get('difficulty'),
        instructions=','.join(data.get('instructions', [])),
        equipment=','.join(data.get('equipment', [])),
        muscle_groups=muscle_groups
    )
    
    db.session.add(new_exercise)
    db.session.commit()
    
    return jsonify(new_exercise.to_dict()), 201

@exercise_bp.route('/<int:exercise_id>', methods=['PUT'])
def update_exercise(exercise_id):
    exercise = Exercise.query.get_or_404(exercise_id)
    data = request.json
    
    # Update basic fields
    exercise.name = data.get('name', exercise.name)
    exercise.description = data.get('description', exercise.description)
    exercise.image_url = data.get('image_url', exercise.image_url)
    exercise.difficulty = data.get('difficulty', exercise.difficulty)
    
    # Handle instructions and equipment as comma-separated strings
    if 'instructions' in data:
        exercise.instructions = ','.join(data['instructions'])
    if 'equipment' in data:
        exercise.equipment = ','.join(data['equipment'])
    
    # Handle muscle groups
    if 'muscle_group_ids' in data:
        muscle_groups = MuscleGroup.query.filter(MuscleGroup.id.in_(data['muscle_group_ids'])).all()
        exercise.muscle_groups = muscle_groups
    
    db.session.commit()
    
    return jsonify(exercise.to_dict())

@exercise_bp.route('/<int:exercise_id>', methods=['DELETE'])
def delete_exercise(exercise_id):
    exercise = Exercise.query.get_or_404(exercise_id)
    db.session.delete(exercise)
    db.session.commit()
    return '', 204

@exercise_bp.route('/muscle-groups', methods=['GET'])
def get_muscle_groups():
    muscle_groups = MuscleGroup.query.all()
    return jsonify([mg.to_dict() for mg in muscle_groups])

@exercise_bp.route('/muscle-groups', methods=['POST'])
def create_muscle_group():
    data = request.json
    new_muscle_group = MuscleGroup(name=data.get('name'))
    db.session.add(new_muscle_group)
    db.session.commit()
    return jsonify(new_muscle_group.to_dict()), 201
