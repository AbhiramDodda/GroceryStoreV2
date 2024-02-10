from database.db import db
from models.models import User, Roles, Categories, Products
import hashlib
import jwt
import datetime
import random

secret_key = 'Secret_Key9@+'

# SHA256
def encrypt(password):
    ''' SHA256 '''
    hash_pass = hashlib.sha256()
    hash_pass.update(password.encode("utf-8"))
    return str(hash_pass.digest())


# Checking functions
def validateUser(email, password):
    ''' User validation '''
    user = db.session.query(User).filter(User.email == email).first()
    if not user:
        return None
    if user.password == encrypt(password):
        return user.role_id
    return None

def checkUser(email):
    ''' Checking for user existance '''
    user = db.session.query(User).filter(User.email == email).first()
    if user:
        return True
    return False

# Generation functions
def generateToken(email):
    ''' Token Generation '''
    user = db.session.query(User).filter(User.email == email).first()
    role = db.session.query(Roles).filter(Roles.role_id == user.role_id).first()
    payload = {
        'email': email,
        'role': role.role_name,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes = 60),
    }
    token = jwt.encode(payload, secret_key, algorithm = 'HS256')
    return token

def newUser(email,password):
    ''' User registration '''
    try:
        new_user = User(email = email, password = encrypt(password), role_id = "USER")
        db.session.add(new_user)
        db.session.commit()
    except:
        return False
    else:
        return True

def newManager(email, password):
    ''' Manager Registration '''
    try:
        new_manager = User(email = email, password = encrypt(password), role_id = "MANAGER")
        db.session.add(new_manager)
        db.session.commit()
    except:
        return False
    else:
        return True

# Category functios
def getCategories():
    ''' List of category objects is returned '''
    categories = db.session.query(Categories).all()
    #categories = [cat.name for cat in categories]
    return categories

def newCategory(name):
    ''' Creation of new category by manager '''
    le = int(random.random()*10000000)+random.randint(1,100)
    le = name[0]+str(le)+name[-1]
    name = name.strip()
    if len(name) < 1:
        return "Enter valid name"
    sname = name.lower()
    try:
        db.session.add(Categories(category_id = le,name = name,search = sname))
        db.session.commit()
    except:
        return "Enter valid details"
    else:
        return "true"

def updateCategory(name,id):
    ''' Categorry editing by manager '''
    name = name.strip()
    if len(name) < 1:
        return "Enter valid name"
    sname = name.lower()
    try:
        db.session.query(Categories).filter(Categories.category_id == id).update({"name":name,"search":sname})
        db.session.commit()
    except:
        return "Enter valid details"
    else:
        return "true"
    
def removeCategory(id):
    ''' Category deletion by manager '''
    try:
        db.session.query(Products).filter(Products.category_id == id).delete()
        db.session.query(Categories).filter(Categories.category_id == id).delete()
        db.session.commit()
    except:
        return False
    else:
        return True


# Product functions
def getProducts():
    ''' Gives all the products in a list with respective category_id as key in dictionary '''
    categories = getCategories()
    products = {}
    for i in categories:
        products[i] = db.session.query(Products).filter(Products.category_id == i.category_id).all()
    return products

def getaProduct(prod_id):
    ''' Single product search through product id '''
    return db.session.query(Products).filter(Products.product_id == prod_id).first()

def newProduct(cat_id,name,price,unit,stock,fractal):
    ''' New product creation '''
    name = name.strip()
    if len(name) < 1:
        return False
    sname = name.lower()
    prods = db.session.query(Products).all()
    le = int(random.random()*10000000)+random.randint(1,100)
    le = name[0]+str(le)+name[-1]
    try:
        price = float(price)
        stock = float(stock)
    except:
        try:
            price = float(price)
            return "Enter valid stock."
        except:
            return "Enter valid price."
    if price <= 0 or stock <= 0:
        return "Enter valid price/stock"
    new_product = Products(product_id = le,category_id = cat_id,name = name,price = price,unit = unit,stock = stock,fractal_allowed = fractal, search = sname)
    try:
        db.session.add(new_product)
        db.session.commit()
    except:
        return "Enter valid category"
    else:
        return "true"
    
def updateProduct(prod_id,cat_id,changed_name,price,unit,stock,fractal):
    ''' Product updation by manager'''
    changed_name = changed_name.strip()
    if len(changed_name) < 1:
        return False
    sname = changed_name.lower()
    try:
        price = float(price)
        stock = float(stock)
    except:
        try:
            price = float(price)
            return "Enter valid stock."
        except:
            return "Enter valid price."
    if price <= 0 or stock <= 0:
        return "Enter valid price/stock"
    try:
        db.session.query(Products).filter(Products.category_id == cat_id,Products.product_id == prod_id).update({"name":changed_name,"price":price,"unit":unit,"stock":stock,"fractal_allowed":fractal,"search":sname})
        db.session.commit()
    except:
        return "Enter valid details"
    else:
        return "true"

def removeProduct(cat_id, prod_id):
    ''' Deleting product by manager '''
    try:
        db.session.query(Products).filter(Products.category_id == cat_id, Products.product_id == prod_id).delete()
        db.session.commit()
    except:
        return False
    else:
        return True