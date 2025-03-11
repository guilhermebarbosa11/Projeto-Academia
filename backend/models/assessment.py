
from app import db
from datetime import datetime

class Assessment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('student.id'), nullable=False)
    date = db.Column(db.Date, nullable=False, default=datetime.now().date())
    weight = db.Column(db.Float, nullable=True)  # in kg
    height = db.Column(db.Float, nullable=True)  # in cm
    body_fat = db.Column(db.Float, nullable=True)  # percentage
    muscle_mass = db.Column(db.Float, nullable=True)  # in kg
    bmi = db.Column(db.Float, nullable=True)  # Body Mass Index
    chest = db.Column(db.Float, nullable=True)  # in cm
    waist = db.Column(db.Float, nullable=True)  # in cm
    hips = db.Column(db.Float, nullable=True)  # in cm
    arms = db.Column(db.Float, nullable=True)  # in cm
    thighs = db.Column(db.Float, nullable=True)  # in cm
    notes = db.Column(db.Text, nullable=True)
    
    # Relationships
    student = db.relationship('Student', back_populates='assessments')
    
    def __repr__(self):
        return f"<Assessment for student_id={self.student_id} on {self.date}>"
    
    def to_dict(self):
        return {
            'id': self.id,
            'student_id': self.student_id,
            'date': self.date.isoformat() if self.date else None,
            'weight': self.weight,
            'height': self.height,
            'body_fat': self.body_fat,
            'muscle_mass': self.muscle_mass,
            'bmi': self.bmi,
            'chest': self.chest,
            'waist': self.waist,
            'hips': self.hips,
            'arms': self.arms,
            'thighs': self.thighs,
            'notes': self.notes
        }
