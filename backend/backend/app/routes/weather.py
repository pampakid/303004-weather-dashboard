# backend/app/routes/weather.py
from flask import Blueprint, jsonify, request
from ..services.weather_service import WeatherService, WeatherServiceError
import os

weather_bp = Blueprint('weather', __name__)
weather_service = WeatherService(api_key=os.getenv('WEATHER_API_KEY'))

@weather_bp.route('/weather/<location>')
def get_weather(location):
    """
    Get weather data for a specific location.
    Uses caching and implements proper error handling.
    """
    try:
        weather_data = weather_service.get_weather(location)
        return jsonify(weather_data)
    except WeatherServiceError as e:
        return jsonify({"error": str(e)}), 500