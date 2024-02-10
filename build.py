from flask import Flask, jsonify, request
from flask_restful import Api
import os
from database.db import db
from functools import wraps
import jwt

secret_key = 'Secret_Key9@+'

def build_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = 'postgresql://postgres:abhi9@localhost:5432/GroceryStore'
    api = Api(app)
    app.app_context().push()
    app.secret_key = os.urandom(36)
    db.init_app(app)
    return app, api

app, api = build_app()

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.cookies.get('auth_token')
        if not token:
            return jsonify({'message': 'Token missing'})
        try:
            data = jwt.decode(token, secret_key, algorithms = ['HS256'])
        except:
            return jsonify({'message':'Invalid'}), 403
        return f(*args, **kwargs)
    return decorated