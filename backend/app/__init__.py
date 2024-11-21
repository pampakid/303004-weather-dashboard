# backend/app/__init__.py 
from flask import Flask, jsonify  # Add jsonify to imports
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
    
    # Configure CORS with specific origins
    CORS(app, resources={
        r"/api/*": {
            "origins": [
                "http://localhost:3000",
                "https://weather-dashboard-2b0ac.web.app",     # Your Firebase URL
                "https://weather-dashboard-2b0ac.firebaseapp.com"
            ],
            "methods": ["GET", "POST", "PUT", "DELETE"],
            "allow_headers": ["Content-Type"]
        }
    })

    # Initialize database only if DATABASE_URL is provided
    if os.getenv('DATABASE_URL'):
        app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
        app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
        db.init_app(app)
        migrate.init_app(app, db)
    else:
        # Add dummy config to prevent SQLAlchemy errors
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite://'
        db.init_app(app)

    # Register blueprints
    from .routes.weather import weather_bp
    app.register_blueprint(weather_bp)

    @app.route('/')
    def index():
        return jsonify({"message": "Weather Dashboard API", "status": "active"})
    
    return app