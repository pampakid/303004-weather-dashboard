# backend/app/services/weather_service.py
from datetime import datetime
from typing import Dict, List, Optional
import requests 
from .cache_service import WeatherCache

class WeatherService:
    """
    Service for handling weather data fetching and processing.
    Implements caching adn the Oberserver pattern ofr real-time updates.
    """

    def __init__(self, api_key: str):
        self._api_key = api_key
        self._cache = WeatherCache(cache_duration_minutes=30)
        self._observers: List[callable] = [] # For Observer pattern
        self._base_url = "https://api.openweathermap.org/data/2.5"

    def add_observer(self, observer: callable) -> None:
        """
        Add an observer for weather updates.
        Implements the Observer pattern.
        """
        self._observers.append(observer)

    def remove_observer(self, observer: callable) -> None:
        """Remove an observer from updates."""
        self._observers = [obs for obs in self._observers if obs != observer]

    def _notify_observers(self, data: Dict) -> None:
        """Notify all obervers of new weather data."""
        for observer in self._observers:
            observer(data)
    
    def get_weather(self, location: str) -> Dict:
        """
        Get weather data for a location, using cache when available.
        
        Args:
            location: City name or coordinates
        
        Returns:
            processed weather data dictionary
        
        Time Complexity: 0(1) for cache hit, 0(n) for processing on cache miss
        """
        # Try to get from cache first
        cached_data = self._cache.get(location)
        if cached_data:
            return cached_data
        
        # If not in cache, fetch from API
        try:
            response = requests.get(
                f"{self._base_url}/weather",
                params={
                    "q": location,
                    "appid": self._api_key,
                    "units": "metrics"
                }
            )
            response.raise_for_status()
            data = response.json()

            # Process the raw weather data
            processed_data = self._process_weather_data(data)

            # Cache the processed results
            self._cache.set(location, processed_data)

            # Notify observers of new data
            self._notify_observers(processed_data)

            return processed_data
    
        except requests.exceptions.RequestException as e:
            # Log error and raise custom exception
            print(f"Error fetching weather data: {e}")
            raise WeatherServiceError(f"Failed to fetch weather data: {str(e)}")

    def _process_weather_data(self, raw_data: Dict) -> Dict:
        """
        Process raw weather API data into a more usable format.
        Time Complexity: 0(1) as we are processing a fixed number of fields.
        """
        return {
            "location": raw_data["name"],
            "temperature": {
                "current": raw_data["main"]["temp"],
                "feels_like": raw_data["main"]["feels_like"],
                "min": raw_data["main"]["temp_min"],
                "max": raw_data["main"]["temp_max"]
            },
            "description": raw_data["weather"][0]["description"],
            "timestamp": datetime.now().isoformat()
        }
    

class WeatherServiceError(Exception):
    """Custom exception for weather service errors."""
    pass