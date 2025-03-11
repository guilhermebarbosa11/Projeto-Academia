
from app import db
from datetime import datetime

# Association table for many-to-many relationship between students and classes
class_student = db.Table('class_student',
    db.Column('class_id', db.Integer, db.ForeignKey('class.id'), primary_key=True),
    db.Column('student_id', db.Integer, db.ForeignKey('student.id'), primary_key=True)
)

class Class(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    date = db.Column(db.Date, nullable=False)
    start_time = db.Column(db.String(5), nullable=False)  # Format: "HH:MM"
    end_time = db.Column(db.String(5), nullable=False)    # Format: "HH:MM"
    instructor = db.Column(db.String(100), nullable=True)
    max_participants = db.Column(db.Integer, nullable=True)
    type = db.Column(db.String(50), nullable=True)  # Yoga, Pilates, HIIT, etc.
    room = db.Column(db.String(50), nullable=True)
    
    def __repr__(self):
        return f"<Class {self.title} on {self.date} at {self.start_time}>"
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'date': self.date.isoformat() if self.date else None,
            'start_time': self.start_time,
            'end_time': self.end_time,
            'instructor': self.instructor,
            'max_participants': self.max_participants,
            'current_participants': len(self.students),
            'type': self.type,
            'room': self.room,
            'students': [s.to_dict() for s in self.students]
        }
