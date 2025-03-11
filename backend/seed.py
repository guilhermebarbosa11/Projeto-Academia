from app import app, db
from models.exercise import Exercise, MuscleGroup
from models.workout import Workout, WorkoutExercise
from models.student import Student
from models.class_model import Class
from datetime import datetime, timedelta
import random

def seed_database():
    with app.app_context():
        # Clear existing data
        db.drop_all()
        db.create_all()
        
        # Create muscle groups
        muscle_groups = [
            MuscleGroup(name="Peito"),
            MuscleGroup(name="Costas"),
            MuscleGroup(name="Ombros"),
            MuscleGroup(name="Bíceps"),
            MuscleGroup(name="Tríceps"),
            MuscleGroup(name="Pernas"),
            MuscleGroup(name="Abdômen"),
            MuscleGroup(name="Glúteos"),
            MuscleGroup(name="Antebraço"),
            MuscleGroup(name="Panturrilha")
        ]
        
        for mg in muscle_groups:
            db.session.add(mg)
        
        db.session.commit()
        
        # Create exercises
        exercises = [
            Exercise(
                name="Supino Reto",
                description="Exercício para desenvolvimento do peitoral",
                image_url="https://example.com/supino.jpg",
                difficulty="intermediário",
                instructions="Deite no banco,Segure a barra,Abaixe até o peito,Empurre para cima",
                equipment="Barra,Anilhas,Banco reto",
                muscle_groups=[muscle_groups[0], muscle_groups[4]]  # Peito, Tríceps
            ),
            Exercise(
                name="Agachamento",
                description="Exercício completo para pernas e glúteos",
                image_url="https://example.com/agachamento.jpg",
                difficulty="avançado",
                instructions="Posicione a barra,Flexione os joelhos,Desça até 90 graus,Suba voltando à posição inicial",
                equipment="Barra,Anilhas,Suporte para barra",
                muscle_groups=[muscle_groups[5], muscle_groups[7]]  # Pernas, Glúteos
            ),
            Exercise(
                name="Rosca Direta",
                description="Exercício para bíceps com barra",
                image_url="https://example.com/rosca.jpg",
                difficulty="iniciante",
                instructions="Segure a barra,Mantenha os cotovelos junto ao corpo,Flexione os braços,Desça controladamente",
                equipment="Barra,Anilhas",
                muscle_groups=[muscle_groups[3], muscle_groups[8]]  # Bíceps, Antebraço
            ),
            Exercise(
                name="Puxada Alta",
                description="Exercício para desenvolvimento das costas",
                image_url="https://example.com/puxada.jpg",
                difficulty="intermediário",
                instructions="Segure a barra,Puxe até o peito,Estique os braços lentamente",
                equipment="Máquina de puxada",
                muscle_groups=[muscle_groups[1], muscle_groups[3]]  # Costas, Bíceps
            ),
            Exercise(
                name="Elevação Lateral",
                description="Exercício para os deltoides",
                image_url="https://example.com/elevacao.jpg",
                difficulty="iniciante",
                instructions="Segure os halteres,Eleve os braços lateralmente,Desça controladamente",
                equipment="Halteres",
                muscle_groups=[muscle_groups[2]]  # Ombros
            ),
            Exercise(
                name="Abdominal Reto",
                description="Exercício para o abdômen",
                image_url="https://example.com/abdominal.jpg",
                difficulty="iniciante",
                instructions="Deite-se,Flexione o tronco,Volte à posição inicial",
                equipment="Colchonete",
                muscle_groups=[muscle_groups[6]]  # Abdômen
            )
        ]
        
        for ex in exercises:
            db.session.add(ex)
        
        db.session.commit()
        
        # Create workouts
        workouts = [
            Workout(
                name="Treino A - Peito, Ombro e Tríceps",
                description="Foco em membros superiores",
                type="Hipertrofia",
                duration=60
            ),
            Workout(
                name="Treino B - Costas e Bíceps",
                description="Desenvolvimento de costas e braços",
                type="Hipertrofia",
                duration=45
            ),
            Workout(
                name="Treino C - Pernas",
                description="Treino completo de pernas",
                type="Força",
                duration=75
            ),
            Workout(
                name="Treino Iniciante Full Body",
                description="Treino completo para iniciantes",
                type="Resistência",
                duration=45
            )
        ]
        
        for workout in workouts:
            db.session.add(workout)
        
        db.session.commit()
        
        # Add exercises to workouts
        workout_exercises = [
            # Treino A
            WorkoutExercise(workout_id=1, exercise_id=1, sets=3, reps=12, rest_time=60, order=1),  # Supino
            WorkoutExercise(workout_id=1, exercise_id=5, sets=3, reps=15, rest_time=45, order=2),  # Elevação
            
            # Treino B
            WorkoutExercise(workout_id=2, exercise_id=4, sets=4, reps=10, rest_time=90, order=1),  # Puxada
            WorkoutExercise(workout_id=2, exercise_id=3, sets=3, reps=12, rest_time=60, order=2),  # Rosca
            
            # Treino C
            WorkoutExercise(workout_id=3, exercise_id=2, sets=4, reps=8, rest_time=120, order=1),  # Agachamento
            
            # Full Body
            WorkoutExercise(workout_id=4, exercise_id=1, sets=2, reps=15, rest_time=45, order=1),  # Supino
            WorkoutExercise(workout_id=4, exercise_id=4, sets=2, reps=15, rest_time=45, order=2),  # Puxada
            WorkoutExercise(workout_id=4, exercise_id=2, sets=2, reps=15, rest_time=45, order=3),  # Agachamento
            WorkoutExercise(workout_id=4, exercise_id=6, sets=2, reps=20, rest_time=30, order=4)   # Abdominal
        ]
        
        for we in workout_exercises:
            db.session.add(we)
        
        db.session.commit()
        
        # Create students
        students = [
            Student(
                name="João Silva",
                email="joao@example.com",
                phone="(11) 98765-4321",
                birth_date=datetime(1990, 5, 15).date(),
                plan="Premium",
                plan_expiry_date=datetime.now().date() + timedelta(days=90),
                status="active"
            ),
            Student(
                name="Maria Oliveira",
                email="maria@example.com",
                phone="(11) 91234-5678",
                birth_date=datetime(1985, 10, 25).date(),
                plan="Basic",
                plan_expiry_date=datetime.now().date() + timedelta(days=30),
                status="active"
            ),
            Student(
                name="Pedro Santos",
                email="pedro@example.com",
                phone="(21) 99876-5432",
                birth_date=datetime(1995, 3, 8).date(),
                plan="Premium",
                plan_expiry_date=datetime.now().date() - timedelta(days=10),
                status="inactive"
            ),
            Student(
                name="Ana Costa",
                email="ana@example.com",
                phone="(31) 98765-1234",
                birth_date=datetime(1992, 7, 20).date(),
                plan="Basic",
                plan_expiry_date=datetime.now().date() + timedelta(days=60),
                status="active"
            )
        ]
        
        for student in students:
            db.session.add(student)
        
        db.session.commit()
        
        # Assign workouts to students
        students[0].workouts = [workouts[0], workouts[2]]  # João: Treino A e C
        students[1].workouts = [workouts[3]]               # Maria: Full Body
        students[2].workouts = [workouts[1], workouts[2]]  # Pedro: Treino B e C
        students[3].workouts = [workouts[3]]               # Ana: Full Body
        
        db.session.commit()
        
        # Create classes
        today = datetime.now().date()
        classes = [
            Class(
                title="Musculação Avançada",
                description="Treino intenso focado em hipertrofia para alunos avançados",
                date=today,
                start_time="07:00",
                end_time="08:30",
                instructor="Carlos Silva",
                max_participants=15,
                type="Musculação",
                room="Sala de Musculação 1"
            ),
            Class(
                title="Spinning",
                description="Aula de ciclismo indoor com alta queima calórica",
                date=today,
                start_time="09:00",
                end_time="10:00",
                instructor="Amanda Oliveira",
                max_participants=15,
                type="Spinning",
                room="Sala de Spinning"
            ),
            Class(
                title="Yoga",
                description="Relaxamento e alongamento para todos os níveis",
                date=today + timedelta(days=1),
                start_time="11:00",
                end_time="12:00",
                instructor="Juliana Costa",
                max_participants=12,
                type="Yoga",
                room="Sala de Yoga"
            ),
            Class(
                title="Crossfit",
                description="Treino funcional de alta intensidade",
                date=today + timedelta(days=1),
                start_time="18:00",
                end_time="19:30",
                instructor="Rafael Mendes",
                max_participants=12,
                type="Crossfit",
                room="Box de Crossfit"
            ),
        ]
        
        for cls in classes:
            db.session.add(cls)
        
        db.session.commit()
        
        # Register students for classes
        classes[0].students = [students[0], students[2]]  # Musculação: João e Pedro
        classes[1].students = [students[1], students[3]]  # Spinning: Maria e Ana
        classes[2].students = [students[1]]              # Yoga: Maria
        classes[3].students = [students[0], students[2], students[3]]  # Crossfit: João, Pedro e Ana
        
        db.session.commit()
        
        print("Database seeded successfully!")

if __name__ == "__main__":
    seed_database()
