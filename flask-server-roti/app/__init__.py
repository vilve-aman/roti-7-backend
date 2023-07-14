from flask import Flask
from flask_cors import CORS

from .admin import admin
from .drivers import drivers

app = Flask("My Flask application")
CORS(app)

app.register_blueprint(admin)
app.register_blueprint(drivers)


@app.route('/')
def home():
    return 'roti-7 server in up here'
