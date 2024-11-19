from flask_migrate import Migrate 
from .models.base import db

def init_db(app):
    """Initialize database with migrations support"""
    db.init_app(app)
    Migrate(app, db)

    with app.app_context():
        db.create_all()