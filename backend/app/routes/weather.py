# backend/app/routes/weather.py
from flask import Blueprint, jsonify, request
from ..services.weather_service import WeatherService, WeatherServiceError
from .. import db
import os

weather_bp = Blueprint('weather', __name__, url_prefix='/api/v1')
weather_service = WeatherService(api_key=os.getenv('WEATHER_API_KEY'))

@weather_bp.route('/weather/<location>')
def get_weather(location):
    """
    Get weather data for a specific location.
    Uses caching and implements proper error handling.
    """
    try:
        weather_data = weather_service.get_weather(location)
        
        # Only try to save to database if it's configured
        if os.getenv('DATABASE_URL'):
            try:
                # Your database operations here
                pass
            except Exception as db_error:
                print(f"Database error: {db_error}")
                # Continue without database operations
        
        return jsonify(weather_data)
    except WeatherServiceError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@weather_bp.route('/weather/history/<location>')
def get_weather_history(location):
    """
    Get historical weather data for a location.
    Query params:
        days (int): Number of days of history to retrieve (default: 7)
    """
    try:
        days = int(request.args.get('days', 7))
        history = weather_service.get_historical_data(location, days)
        return jsonify(history)
    except ValueError:
        return jsonify({"error": "Invalid days parameter"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500