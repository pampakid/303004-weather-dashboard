# backend/app/__init__.py 
from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Initialize extensions
db = SQLAlchemy()
migrate = Migrate()

def create_app():
    """Application factory function"""
    app = Flask(__name__)
    CORS(app)
    
    # Configure the database
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    
    # Register blueprints (we'll add these as we create them)
    # from .routes.weather import weather_bp
    # app.register_blueprint(weather_bp)
    
    return app