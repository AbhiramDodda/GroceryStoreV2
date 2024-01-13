from flask import Flask
from flask_restful import Api
import os
from database.db import db

def build_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = 'postgresql://postgres:abhi9@localhost:5432/GroceryStore'
    api = Api(api)
    app.app_context().push()
    app.secret_key = os.urandom(36)
    db.init_app(app)
    return app, api

app, api = build_app()