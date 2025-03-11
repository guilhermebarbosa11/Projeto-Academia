
from app import db
from datetime import datetime

class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    phone = db.Column(db.String(20), nullable=True)
    birth_date = db.Column(db.Date, nullable=True)
    plan = db.Column(db.String(50), nullable=True)  # Basic, Premium, etc.
    plan_expiry_date = db.Column(db.Date, nullable=True)
    status = db.Column(db.String(20), nullable=False, default='active')  # active, inactive, pending
    join_date = db.Column(db.Date, nullable=True, default=datetime.now().date())
    photo_url = db.Column(db.String(255), nullable=True)
    notes = db.Column(db.Text, nullable=True)
    
    # Relationships
    workouts = db.relationship('Workout', secondary='student_workout', 
                              backref=db.backref('students', lazy=True))
    assessments = db.relationship('Assessment', back_populates='student', cascade="all, delete-orphan")
    classes = db.relationship('Class', secondary='class_student',
                            backref=db.backref('students', lazy=True))
    
    def __repr__(self):
        return f"<Student {self.name}>"
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'phone': self.phone,
            'birth_date': self.birth_date.isoformat() if self.birth_date else None,
            'plan': self.plan,
            'plan_expiry_date': self.plan_expiry_date.isoformat() if self.plan_expiry_date else None,
            'status': self.status,
            'join_date': self.join_date.isoformat() if self.join_date else None,
            'photo_url': self.photo_url,
            'notes': self.notes
        }
