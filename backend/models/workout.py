
from app import db

# Association table for many-to-many relationship between students and workouts
student_workout = db.Table('student_workout',
    db.Column('student_id', db.Integer, db.ForeignKey('student.id'), primary_key=True),
    db.Column('workout_id', db.Integer, db.ForeignKey('workout.id'), primary_key=True)
)

class Workout(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    type = db.Column(db.String(50), nullable=True)  # Strength, Hypertrophy, Endurance, etc.
    duration = db.Column(db.Integer, nullable=True)  # In minutes
    
    # Relationships
    workout_exercises = db.relationship('WorkoutExercise', back_populates='workout', cascade="all, delete-orphan")
    
    def __repr__(self):
        return f"<Workout {self.name}>"
    
    def to_dict(self):
        workout_exercises = sorted(self.workout_exercises, key=lambda x: x.order)
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'type': self.type,
            'duration': self.duration,
            'exercises': [we.to_dict() for we in workout_exercises]
        }

class WorkoutExercise(db.Model):
    workout_id = db.Column(db.Integer, db.ForeignKey('workout.id'), primary_key=True)
    exercise_id = db.Column(db.Integer, db.ForeignKey('exercise.id'), primary_key=True)
    sets = db.Column(db.Integer, nullable=True)
    reps = db.Column(db.Integer, nullable=True)
    rest_time = db.Column(db.Integer, nullable=True)  # In seconds
    order = db.Column(db.Integer, nullable=False)
    
    # Relationships
    workout = db.relationship('Workout', back_populates='workout_exercises')
    exercise = db.relationship('Exercise', back_populates='workout_exercises')
    
    def __repr__(self):
        return f"<WorkoutExercise {self.workout_id}_{self.exercise_id}>"
    
    def to_dict(self):
        return {
            'workout_id': self.workout_id,
            'exercise_id': self.exercise_id,
            'exercise': self.exercise.to_dict(),
            'sets': self.sets,
            'reps': self.reps,
            'rest_time': self.rest_time,
            'order': self.order
        }
