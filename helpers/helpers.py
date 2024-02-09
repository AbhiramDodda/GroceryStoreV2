from database.db import db
from models.models import User, Role
import hashlib
import jwt
import datetime

secret_key = 'Secret_Key9@+'

# SHA256
def encrypt(password):
    ''' SHA256 '''
    hash_pass = hashlib.sha256()
    hash_pass.update(password.encode("utf-8"))
    return str(hash_pass.digest())


# Checking functions
def validateUser(email, password):
    user = db.session.query(User).filter(User.email == email).first()
    if not user:
        return ""
    if user.password == encrypt(password):
        return user.role

def checkUser(email):
    user = db.session.query(User).filter(User.email == email)
    if user:
        return True
    return False

# Generation functions
def generateToken(email):
    user = db.session.query(User).filter(User.email == email).first()
    role = db.session.query(Role).filter(Role.role_id == user['role_id']).first()
    payload = {
        'email': email,
        'role': role,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes = 60),
    }
    token = jwt.encode(payload, secret_key, algorithm = 'HS256')

def newUser(email,password):
    ''' User registration '''
    try:
        new_user = User(email = email, password = encrypt(password))
        db.session.add(new_user)
        db.session.commit()
    except:
        return False
    else:
        return True
    