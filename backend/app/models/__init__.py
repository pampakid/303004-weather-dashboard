# backend/app/models/__init__.py
from .base import BaseModel
from .weather import WeatherRecord, LocationPreference

__all__ = ['BaseModel', 'WeatherRecord', 'LocationPreference']