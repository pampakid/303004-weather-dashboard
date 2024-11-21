## Deployment on Render

1. Fork or clone this repository
2. Create a new Web Service on Render
3. Connect to this repository
4. Set the following:
   - Environment: Python
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn wsgi:app`
5. Add environment variables:
   - FLASK_APP: wsgi.py
   - FLASK_ENV: production
   - WEATHER_API_KEY: your_openweather_api_key