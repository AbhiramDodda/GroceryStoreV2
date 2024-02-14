from flask_restful import Resource
from flask import request
from helpers.helpers import validateUser, generateToken, checkUser, newUser, getCategories, getProducts, newCategory, newProduct

class LoginValidation(Resource):
    def get(self):
        pass
    def put(self):
        pass
    def post(self):
        data = request.get_json()
        response_obj = {}
        if validateUser(data['email'], data['password']):
            token = generateToken(data['email'])
            response_obj = {'valid_login': True, 'auth_token': token}, 200
        else:
            response_obj = {'valid_login': False}, 200
        return response_obj
    def delete(self):
        pass

class SignupValidation(Resource):
    def get(self):
        if checkUser(request.headers['email']):
            print("'user exists")
            return {'user_exists': True}, 200
        return {'user_exists': False}, 200
    def post(self):
        data = request.get_json()
        if checkUser(data['email']):
            return {'valid_signup': False}, 200
        else:
            if newUser(data['email'], data['password']):
                token = generateToken(data['email'])
                return {'valid_signup': True, 'auth_token': token, 'unknown_error': False}, 200
            else:
                return {'valid_signup': True, 'unknown_error': True}, 200
    def put(self):
        pass
    def delete(self):
        pass

class CategoryCRUD(Resource):
    def get(self):
        data = getProducts()
        return {'data': data}, 200
    def post(self):
        pass
    def put(self):
        pass
    def delete(self):
        pass

class ProductCRUD(Resource):
    def get(self):
        pass
    def post(self):
        pass
    def put(self):
        pass
    def delete(self):
        pass

class SearchAPI(Resource):
    def get(self):
        pass
    def post(self):
        pass
    def put(self):
        pass
    def delete(self):
        pass