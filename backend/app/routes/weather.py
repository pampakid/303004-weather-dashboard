# backend/app/routes/weather.py
from flask import Blueprint, jsonify, request
from ..services import WeatherService, WeatherServiceError
import os

weather_bp = Blueprint('weather', __name__, url_prefix='/api/v1')
weather_service = WeatherService(api_key=os.getenv('WEATHER_API_KEY'))

@weather_bp.route('/weather/<location>')
def get_weather(location):
    """
    Get current weather data for a specific location.
    Uses caching and implements proper error handling.
    """
    try:
        weather_data = weather_service.get_weather(location)
        return jsonify(weather_data)
    except WeatherServiceError as e:
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