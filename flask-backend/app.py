from flask import Flask, jsonify, flash, request
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import check_password_hash, generate_password_hash
from db_config import db  # Import the SQLAlchemy object
from flask_mail import Mail
from flask_mail import Message  # Import the Message class from flask_mail
from flask_cors import CORS  # Import the CORS module
from flask import session  # Assuming you're using Flask sessions
from PIL import Image
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from keras.models import load_model
from keras.preprocessing import image
from keras.applications.resnet_v2 import preprocess_input
import numpy as np
import os
import random
import cv2


app = Flask(__name__)
CORS(app)  # Enable CORS for all routes in the app
app.secret_key = "dhruv@12344#joshi"

# Configure the Flask app to use the SQLAlchemy object
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:Root@localhost/cancer'  # Replace with your actual database URI
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
    user_membership=db.Column(db.Integer)
    user_otp=db.Column(db.Integer)


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
        _membership = 100

        # validate the received values
        if _firstname and _lastname and _email and _password and request.method == 'POST':
            # do not save the password as plain text
            _hashed_password = generate_password_hash(_password)

            # Generate OTP
            otp = generate_otp()

            # Save edits
            new_user = User(
                user_firstname=_firstname,
                user_lastname=_lastname,
                user_email=_email,
                user_password=_hashed_password,
                user_membership=_membership,
                user_otp=otp  # Store OTP in the database
            )
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


@app.route('/verifyotp', methods=['POST'])
def verify_otp():
    try:
        data = request.get_json()
        _email = data.get('Email')
        _otp = data.get('OTP')

        user = User.query.filter_by(user_email=_email).first()

        if user:
            stored_otp = user.user_otp  # Assuming 'user_otp' is the field in the User model that stores the OTP

            if _otp == stored_otp:
                user.user_membership = 200  # Set membership to 200 if OTP is verified
                db.session.commit()
                return jsonify({'message': 'OTP verified successfully!'})
            else:
                user.user_membership = 300  # Set membership to 300 if OTP is not verified
                db.session.commit()
                return jsonify({'error': 'Invalid OTP'}), 400
        else:
            return jsonify({'error': 'User not found'}), 404

    except Exception as e:
        print(e)
        return jsonify({'error': 'Internal Server Error'}), 500

@app.route('/resendotp', methods=['POST'])
def resend_otp():
    try:
        data = request.get_json()
        _email = data.get('Email')

        # validate the received values
        if _email and request.method == 'POST':
            # Retrieve the user from the database based on the email
            user = User.query.filter_by(user_email=_email).first()

            if user:
                # Generate a new OTP
                new_otp = generate_otp()

                # Update the stored OTP in the database
                user.user_otp = new_otp
                db.session.commit()

                # Send the new OTP via email
                send_otp_email(_email, new_otp)

                return jsonify({'message': 'OTP resent successfully!'})
            else:
                return jsonify({'error': 'User not found'}), 404
        else:
            return jsonify({'error': 'Missing required fields'}), 400

    except Exception as e:
        print(e)
        return jsonify({'error': 'Internal Server Error'}), 500

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


cors = CORS(app, origins="*")
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['UPLOAD_FOLDER'] = 'local'


# Ensure the upload directory exists
if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

# Load your custom models
resnet50v2 = load_model('Model/ResNet50V2_model.h5')
resnet101 = load_model('Model/ResNet101V2_model.h5')
densenet121 = load_model('Model/DenseNet121_model.h5')
densenet169 = load_model('Model/DenseNet169_model.h5')
xceptionnet = load_model('Model/XceptionNet_model.h5')
inceptionresnetv2 = load_model('Model/InceptionResNetV2.h5')

# Define the custom classes
classes = ['carcinoma_in_situ', 'light_dysplastic', 'moderate_dysplastic', 'normal_columnar', 'normal_intermediate', 'normal_superficiel', 'severe_dysplastic']

# def nlm_filter(image):
#     filtered_image = cv2.fastNlMeansDenoisingColored(image, None, 10, 10, 7, 21)
#     return filtered_image

# # Function to make predictions with thresholding
# def preprocess_image(image_path):
#     # Read the image
#     img = cv2.imread(image_path)
#     # Convert to RGB
#     img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
#     # Apply NLM filter
#     img_rgb_filtered = nlm_filter(img_rgb)
#     # Resize to 224x224
#     img_resized = cv2.resize(img_rgb_filtered, (224, 224))
#     # Expand dimensions to match model input shape
#     img_array = np.expand_dims(img_resized, axis=0)
#     # Preprocess input for the model
#     img_array = preprocess_input(img_array)
#     return img_array

# Function to make predictions with thresholding
def preprocess_image(image_path):
    img = Image.open(image_path)
    img = img.convert('RGB')
    img = img.resize((224, 224))
    img_array = np.array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = preprocess_input(img_array)
    return img_array

# Define the determine_cancerous function
def determine_cancerous(class_name):
    cancerous_classes = {
        'carcinoma_in_situ': True,
        'light_dysplastic': True,
        'moderate_dysplastic': True,
        'normal_columnar': False,
        'normal_intermediate': False,
        'normal_superficiel': False,
        'severe_dysplastic': True,
    }

    return cancerous_classes.get(class_name, None)

# Function to make predictions with thresholding and majority voting
def predict_with_threshold_and_majority(models, img_path, threshold=0.8):
    img = preprocess_image(img_path)
    predictions = []

    for model in models:
        preds = model.predict(img)
        class_idx = np.argmax(preds)
        class_prob = preds[0, class_idx]
        class_name = classes[class_idx]
        predictions.append(class_name)

    print(f"Predictions: {predictions}")

    # Check if there are predictions
    if predictions:
        # Extract probabilities for known classes
        prob_known_classes = [pred_prob for pred_prob in preds[0, :-1] if pred_prob is not None]

        if prob_known_classes:
            # Check if the maximum probability for known classes is above the threshold
            max_prob_known_classes = np.max(prob_known_classes)
            print(f"Max Probability for Known Classes: {max_prob_known_classes}")

            if max_prob_known_classes > threshold:
                # Apply majority voting to determine the final prediction
                class_indices = [classes.index(class_name) for class_name in predictions]
                majority_class_idx = np.argmax(np.bincount(class_indices))
                majority_class_name = classes[majority_class_idx]
                chances = class_indices.count(majority_class_idx) / len(class_indices) * 100

                # Determine if the majority class is cancerous
                is_cancerous = determine_cancerous(majority_class_name)

                return {'prediction': majority_class_name, 'probability': chances, 'is_cancerous': is_cancerous}

    # Predicted as an unknown class
    return {'prediction': 'unknown', 'probability': 0, 'is_cancerous': False}

@app.route('/modelpredict', methods=['POST'])
@cross_origin()
def serve():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file:
        filename = 'local/' + file.filename  # Assuming 'uploads' is your desired upload folder
        file.save(filename)
        try:
            result = predict_with_threshold_and_majority([resnet50v2,resnet101,densenet121,densenet169,xceptionnet,inceptionresnetv2], filename)
            return jsonify(result)
        except Exception as e:
            print(str(e))
            return jsonify({'error': 'Oops Some Error Occurred'}), 400
    return jsonify({'error': 'Oops Some Error Occurred'}),400

if __name__ == "__main__":
    app.run(debug=True)
