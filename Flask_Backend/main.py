from flask import Flask, jsonify, flash, request
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import check_password_hash, generate_password_hash
from db_config import db  # Import the SQLAlchemy object
from flask_mail import Mail
from flask_mail import Message  # Import the Message class from flask_mail
from flask_cors import CORS  # Import the CORS module
import random

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes in the app
app.secret_key = "secret key"

# Configure the Flask app to use the SQLAlchemy object
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:root@localhost/cancer'  # Replace with your actual database URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False




# Configure Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587  # Use the appropriate port for your mail server
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = 'careconnectibm@gmail.com'
app.config['MAIL_PASSWORD'] = 'qkrlybhefefrnhdu'
app.config['MAIL_DEFAULT_SENDER'] = 'careconnectibm@gmail.com'

mail = Mail(app)

# Initialize the SQLAlchemy object with the Flask app
db.init_app(app)

# Define the User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_firstname = db.Column(db.String(255))
    user_lastname = db.Column(db.String(255))
    user_email = db.Column(db.String(255), unique=True)
    user_password = db.Column(db.String(255))

# Create the tables within the Flask application context
with app.app_context():
    db.create_all()

@app.route('/register', methods=['POST'])
def add_user():
    try:
        data = request.get_json()
        _firstname = data.get('FirstName')
        _lastname = data.get('LastName')
        _email = data.get('Email')
        _password = data.get('Password')

        # validate the received values
        if _firstname and _lastname and _email and _password and request.method == 'POST':
            # do not save the password as plain text
            _hashed_password = generate_password_hash(_password)


            otp = generate_otp()
            
            # save edits
            new_user = User(user_firstname=_firstname, user_lastname=_lastname, user_email=_email, user_password=_hashed_password)
            db.session.add(new_user)
            db.session.commit()
            send_otp_email(_email, otp)

            flash('User added successfully!')
            return jsonify({'message': 'User registered successfully!'})
        else:
            return jsonify({'error': 'Missing required fields'}), 400

    except Exception as e:
        print(e)
        return jsonify({'error': 'Internal Server Error'}), 500
    


def generate_otp():
    # Generate a random 6-digit OTP
    return str(random.randint(100000, 999999))

def send_otp_email(email, otp):
    # Compose and send the OTP email
    msg = Message('Your OTP for Registration', recipients=[email])
    msg.body = f'Your OTP is: {otp}'
    mail.send(msg)

@app.route('/login', methods=['POST'])
def login_user():
    try:
        data = request.get_json()
        _email = data.get('Email')
        _password = data.get('Password')

        # validate the received values
        if _email and _password and request.method == 'POST':
            user = User.query.filter_by(user_email=_email).first()
            print(user)

            if user and check_password_hash(user.user_password, _password):
                # User is authenticated

                return jsonify({'message': 'Login successful!',
                'FirstName': user.user_firstname,
                'LastName': user.user_lastname})

                return jsonify({'error': 'Invalid email or password'}), 401
        else:
            return jsonify({'error': 'Missing required fields'}), 400

    except Exception as e:
        print(e)
        return jsonify({'error': 'Internal Server Error'}), 500

if __name__ == "__main__":
    app.run(debug=True)
