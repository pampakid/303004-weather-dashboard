# backend/app/models/base.py
from datetime import datetime
from .. import db

class BaseModel(db.Model):
    """Base model with common fields"""
    __abstract__ = True

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)