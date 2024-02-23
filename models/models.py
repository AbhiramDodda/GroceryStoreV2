from database.db import db
from sqlalchemy import *

class User(db.Model):
    __tablename__ = "users"
    email = db.Column(db.String, primary_key = True)
    password = db.Column(db.String, nullable = False)
    role_id = db.Column(db.String, db.ForeignKey("roles.role_id"), nullable = False)

class Roles(db.Model):
    __tablename__ = "roles"
    role_id = db.Column(db.String, primary_key = True)
    role_name = db.Column(db.String, nullable = False)

class Categories(db.Model):
    __tablename__ = "categories"
    category_id = db.Column(db.String, primary_key = True)
    category_name = db.Column(db.String, unique = True, nullable = False)
    search = db.Column(db.String,nullable = False)

class Products(db.Model):
    __tablename__ = "products"
    product_id = db.Column(db.String, nullable = False)
    category_id = db.Column(db.String, db.ForeignKey("categories.category_id"), nullable = False)
    product_name = db.Column(db.String, primary_key = True, nullable = False)
    price = db.Column(db.Float, nullable = False)
    unit = db.Column(db.String, nullable = False)
    fractal_allowed = db.Column(db.Boolean, nullable = False)
    stock = db.Column(db.Float, nullable = False)
    search = db.Column(db.String,nullable = False)