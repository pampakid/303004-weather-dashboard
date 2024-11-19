# backend/app/models/weather.py
from .base import db, BaseModel
from sqlalchemy.dialects.postgresql import JSONB

class WeatherRecord(BaseModel):
    """Store weather data with location and timestamp"""
    ___tablename__ = 'weather_records'

    id = db.Column(db.Integer, primary_key=True)
    location = db.Column(db.String(100), nullable=False)
    temperature = db.Column(db.Float, nullable=False)
    humidity = db.Column(db.Float)
    description = db.Column(db.String(200))
    raw_data = db.Column(JSONB) # Store complete API response

    # Index for faster location-based queries
    __table_args__ = (
        db.Index('idx_weather_location_created', 'location', 'created_at'),
    )

class LocationPreference(BaseModel):
    """Store user's preferred locations"""
    __tablename__ = 'location_preferences'

    id = db.Column(db.Integer, primary_key=True)
    location = db.Column(db.String(100), nullable=False)
    is_default = db.Column(db.Boolean, default=False)
    refresh_interval = db.Column(db.Integer, default=30) # minutes