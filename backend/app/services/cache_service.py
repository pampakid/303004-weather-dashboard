# backend/app/services/cache_service.py
from datetime import datetime, timedelta
from typing import Dict, Tuple, Optional, Any

class WeatherCache:
    """
    A cache service for weather data implementing a simple time-based invalidation strategy.
    """
    
    def __init__(self, cache_duration_minutes: int = 30):
        self._cache: Dict[str, Tuple[Any, datetime]] = {}
        self._cache_duration = timedelta(minutes=cache_duration_minutes)
    
    def get(self, key: str) -> Optional[Any]:
        """
        Retrieve data from cache if it exists and is still valid.
        Time Complexity: O(1) - constant time lookup
        """
        if key in self._cache:
            data, timestamp = self._cache[key]
            if datetime.now() - timestamp < self._cache_duration:
                return data
            else:
                # Clean up expired cache entry
                del self._cache[key]
        return None
    
    def set(self, key: str, data: Any) -> None:
        """
        Store data in cache with current timestamp.
        Time Complexity: O(1) - constant time insertion
        """
        self._cache[key] = (data, datetime.now())
    
    def clear(self) -> None:
        """Clear all cache entries."""
        self._cache.clear()