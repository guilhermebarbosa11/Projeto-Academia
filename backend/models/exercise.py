
from app import db

# Association table for many-to-many relationship between exercises and muscle groups
exercise_muscle_group = db.Table('exercise_muscle_group',
    db.Column('exercise_id', db.Integer, db.ForeignKey('exercise.id'), primary_key=True),
    db.Column('muscle_group_id', db.Integer, db.ForeignKey('muscle_group.id'), primary_key=True)
)

class Exercise(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    image_url = db.Column(db.String(255), nullable=True)
    difficulty = db.Column(db.String(20), nullable=True)  # iniciante, intermediário, avançado
    instructions = db.Column(db.Text, nullable=True)
    equipment = db.Column(db.String(255), nullable=True)
    
    # Relationships
    muscle_groups = db.relationship('MuscleGroup', secondary=exercise_muscle_group,
                                    backref=db.backref('exercises', lazy=True))
    workout_exercises = db.relationship('WorkoutExercise', back_populates='exercise', cascade="all, delete-orphan")
    
    def __repr__(self):
        return f"<Exercise {self.name}>"
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'image_url': self.image_url,
            'difficulty': self.difficulty,
            'instructions': self.instructions.split(',') if self.instructions else [],
            'equipment': self.equipment.split(',') if self.equipment else [],
            'muscle_groups': [mg.to_dict() for mg in self.muscle_groups]
        }

class MuscleGroup(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)
    
    def __repr__(self):
        return f"<MuscleGroup {self.name}>"
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name
        }
