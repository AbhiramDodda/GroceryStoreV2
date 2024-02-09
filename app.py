from build import app, api, token_required
from flask import render_template, redirect, url_for
from flask_restful import Api
from api.api import LoginValidation, SignupValidation

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/admin')
@token_required
def admin():
    pass

@app.route('/manager')
@token_required
def manager():
    pass

@app.route('/user')
@token_required
def user():
    pass


# API routes
api.add_resource(LoginValidation, '/login_validation') # POST
api.add_resource(SignupValidation, '/signup_validate') # GET, POST

if __name__ == '__main__':
    app.run(debug = False)