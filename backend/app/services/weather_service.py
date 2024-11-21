# backend/app/services/weather_service.py
from datetime import datetime
from typing import Dict, List, Optional
import requests
import os
from .cache_service import WeatherCache
from ..models import WeatherRecord
from .. import db

class WeatherServiceError(Exception):
    """Custom exception for weather service errors"""
    pass

class WeatherService:
    """
    Service for handling weather data fetching, caching, and storage.
    """
    
    def __init__(self, api_key: str):
        self._api_key = api_key
        self._cache = WeatherCache(cache_duration_minutes=30)
        self._observers: List[callable] = []
        self._base_url = "http://api.openweathermap.org/data/2.5"

    def add_observer(self, observer: callable) -> None:
        """Add an observer for weather updates."""
        self._observers.append(observer)

    def remove_observer(self, observer: callable) -> None:
        """Remove an observer from updates."""
        self._observers = [obs for obs in self._observers if obs != observer]

    def _notify_observers(self, data: Dict) -> None:
        """Notify all observers of new weather data."""
        for observer in self._observers:
            observer(data)

    def get_weather(self, location: str) -> Dict:
        """
        Get weather data for a location, using cache when available.
        """
        # Try to get from cache first
        cached_data = self._cache.get(location)
        if cached_data:
            return cached_data

        # If not in cache, fetch from API
        try:
            # Print the URL we're calling (for debugging)
            url = f"{self._base_url}/weather"
            params = {
                "q": location,
                "appid": self._api_key,
                "units": "metric"
            }
            print(f"Calling API: {url} with params: {params}")

            response = requests.get(url, params=params)
            
            # Print response status and content for debugging
            print(f"API Response Status: {response.status_code}")
            print(f"API Response Content: {response.text}")
            
            response.raise_for_status()
            data = response.json()
            
            # Process and store the data
            processed_data = self._process_weather_data(data)
            self._cache.set(location, processed_data)
            self._save_weather_record(location, processed_data)
            
            # Notify observers of new data
            self._notify_observers(processed_data)
            
            return processed_data
            
        except requests.exceptions.RequestException as e:
            raise WeatherServiceError(f"Failed to fetch weather data: {str(e)} - API key might not be activated yet")
        except Exception as e:
            raise WeatherServiceError(f"Unexpected error: {str(e)}")

    def _process_weather_data(self, raw_data: Dict) -> Dict:
        """
        Process raw weather API data into a more usable format.
        """
        return {
            "location": raw_data["name"],
            "temperature": {
                "current": raw_data["main"]["temp"],
                "feels_like": raw_data["main"]["feels_like"],
                "min": raw_data["main"]["temp_min"],
                "max": raw_data["main"]["temp_max"]
            },
            "humidity": raw_data["main"]["humidity"],
            "wind": {
                "speed": raw_data["wind"]["speed"],
                "direction": raw_data["wind"].get("deg", 0)
            },
            "description": raw_data["weather"][0]["description"],
            "timestamp": datetime.now().isoformat()
        }

    def _save_weather_record(self, location: str, data: Dict) -> None:
        """Save weather data to database if available."""
        if os.getenv('DATABASE_URL'):
            try:
                record = WeatherRecord(
                    location=location,
                    temperature=data["temperature"]["current"],
                    humidity=data["humidity"],
                    wind_speed=data["wind"]["speed"],
                    description=data["description"],
                    raw_data=data
                )
                db.session.add(record)
                db.session.commit()
            except Exception as e:
                print(f"Failed to save to database: {e}")
                # Continue without saving to database

    def get_historical_data(self, location: str, days: int = 7) -> List[Dict]:
        """
        Retrieve historical weather data from our database (not from API).
        Time Complexity: O(n) where n is number of records
        """
        records = WeatherRecord.query\
            .filter_by(location=location)\
            .order_by(WeatherRecord.created_at.desc())\
            .limit(days * 24)\
            .all()
        
        return [record.raw_data for record in records]