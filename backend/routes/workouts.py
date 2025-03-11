
from flask import Blueprint, jsonify, request
from app import db
from models.workout import Workout, WorkoutExercise
from models.exercise import Exercise

workout_bp = Blueprint('workouts', __name__)

@workout_bp.route('/', methods=['GET'])
def get_workouts():
    workouts = Workout.query.all()
    return jsonify([workout.to_dict() for workout in workouts])

@workout_bp.route('/<int:workout_id>', methods=['GET'])
def get_workout(workout_id):
    workout = Workout.query.get_or_404(workout_id)
    return jsonify(workout.to_dict())

@workout_bp.route('/', methods=['POST'])
def create_workout():
    data = request.json
    
    # Create workout
    new_workout = Workout(
        name=data.get('name'),
        description=data.get('description'),
        type=data.get('type'),
        duration=data.get('duration')
    )
    
    db.session.add(new_workout)
    db.session.flush()  # Flush to get the workout ID
    
    # Add exercises to workout
    exercises_data = data.get('exercises', [])
    for idx, exercise_data in enumerate(exercises_data):
        exercise_id = exercise_data.get('exercise_id')
        
        # Verify exercise exists
        exercise = Exercise.query.get(exercise_id)
        if not exercise:
            continue
        
        # Create workout exercise
        workout_exercise = WorkoutExercise(
            workout_id=new_workout.id,
            exercise_id=exercise_id,
            sets=exercise_data.get('sets'),
            reps=exercise_data.get('reps'),
            rest_time=exercise_data.get('rest_time'),
            order=idx + 1  # 1-based order
        )
        
        db.session.add(workout_exercise)
    
    db.session.commit()
    
    return jsonify(new_workout.to_dict()), 201

@workout_bp.route('/<int:workout_id>', methods=['PUT'])
def update_workout(workout_id):
    workout = Workout.query.get_or_404(workout_id)
    data = request.json
    
    # Update basic fields
    workout.name = data.get('name', workout.name)
    workout.description = data.get('description', workout.description)
    workout.type = data.get('type', workout.type)
    workout.duration = data.get('duration', workout.duration)
    
    # Update exercises if provided
    if 'exercises' in data:
        # Remove existing workout exercises
        WorkoutExercise.query.filter_by(workout_id=workout_id).delete()
        
        # Add new workout exercises
        exercises_data = data.get('exercises', [])
        for idx, exercise_data in enumerate(exercises_data):
            exercise_id = exercise_data.get('exercise_id')
            
            # Verify exercise exists
            exercise = Exercise.query.get(exercise_id)
            if not exercise:
                continue
            
            # Create workout exercise
            workout_exercise = WorkoutExercise(
                workout_id=workout.id,
                exercise_id=exercise_id,
                sets=exercise_data.get('sets'),
                reps=exercise_data.get('reps'),
                rest_time=exercise_data.get('rest_time'),
                order=idx + 1  # 1-based order
            )
            
            db.session.add(workout_exercise)
    
    db.session.commit()
    
    return jsonify(workout.to_dict())

@workout_bp.route('/<int:workout_id>', methods=['DELETE'])
def delete_workout(workout_id):
    workout = Workout.query.get_or_404(workout_id)
    db.session.delete(workout)
    db.session.commit()
    return '', 204
