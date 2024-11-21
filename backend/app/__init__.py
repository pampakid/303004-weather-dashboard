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
    app = Flask(__name__)
    # Configure CORS
    CORS(app, resources={
        r"/api/*": {
            "origins": [
                "http://localhost:3000",                    # Local development
                "https://weather-dashboard-2b0ac.web.app",        # Replace with your Firebase URL
                "https://weather-dashboard-2b0ac.firebaseapp.com" # Replace with your Firebase URL
            ],
            "methods": ["GET", "POST", "PUT", "DELETE"],
            "allow_headers": ["Content-Type"]
        }
    })
    
    # Configure the database if DATABASE_URL is provided
    if os.getenv('DATABASE_URL'):
        app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
        app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
        
        # Initialize extensions
        db.init_app(app)
        migrate.init_app(app, db)
    
    # Register blueprints
    from .routes.weather import weather_bp
    app.register_blueprint(weather_bp)
    
    return app