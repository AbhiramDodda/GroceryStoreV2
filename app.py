from build import app, api, token_required
from flask import render_template, redirect, url_for, request
from flask_restful import Api
from api.api import LoginValidation, SignupValidation
import jwt

secret_key = 'Secret_Key9@+'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/admin')
@token_required
def admin():
    token = request.cookies.get('auth_token')
    if token:
        try:
            token = jwt.decode(token, secret_key, algorithms=['HS256'])
            if token['role'] != 'admin':
                return redirect(url_for(index))
            return render_template('admindashboard.html')
        except:
            return redirect(url_for('index'))
    else:
        return redirect(url_for('index'))

@app.route("/dashboard")
@token_required
def dashboard():
    token = request.cookies.get('auth_token')
    if token:
        try:
            token = jwt.decode(token, secret_key, algorithms=['HS256'])
            if token['role'] == 'manager':
                return redirect(url_for('manager'))
            elif token['role'] == 'admin':
                return redirect(url_for('admin'))
            else:
                return redirect(url_for('user'))
        except:
            return redirect(url_for('index'))
    else:
        return redirect(url_for('index'))

@app.route('/manager')
@token_required
def manager():
    token = request.cookies.get('auth_token')
    if token:
        try:
            token = jwt.decode(token, secret_key, algorithms=['HS256'])
            if token['role'] != 'manager':
                return redirect(url_for('index'))
            return render_template('managerdashboard.html')
        except:
            return redirect(url_for('index'))
    else:
        return redirect(url_for('index'))

@app.route('/user')
@token_required
def user():
    token = request.cookies.get('auth_token')
    if token:
        try:
            token = jwt.decode(token, secret_key, algorithms=['HS256'])
            if token['role'] != 'user':
                return redirect(url_for(index))
            return render_template('userdashboard.html')
        except:
            return redirect(url_for('index'))
    else:
        return redirect(url_for('index'))


# API routes
api.add_resource(LoginValidation, '/login_validate') # POST
api.add_resource(SignupValidation, '/signup_validate') # GET, POST

if __name__ == '__main__':
    app.run(debug = False)