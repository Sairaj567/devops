from flask import Flask, render_template, request, redirect, url_for, flash
import re

app = Flask(__name__)
app.secret_key = 'your-secret-key-here'  # Change this in production

# Simple in-memory storage for demo purposes
registered_users = []

def validate_email(email):
    """Validate email format"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def validate_phone(phone):
    """Validate phone number format"""
    # Remove all non-digit characters
    digits_only = re.sub(r'\D', '', phone)
    return len(digits_only) >= 10

@app.route('/')
def index():
    """Home page with registration form"""
    return render_template('registration.html')

@app.route('/register', methods=['POST'])
def register():
    """Handle registration form submission"""
    # Get form data
    first_name = request.form.get('first_name', '').strip()
    last_name = request.form.get('last_name', '').strip()
    email = request.form.get('email', '').strip()
    phone = request.form.get('phone', '').strip()
    event_type = request.form.get('event_type', '')
    dietary_restrictions = request.form.get('dietary_restrictions', '').strip()
    
    # Validation
    errors = []
    
    if not first_name:
        errors.append('First name is required')
    if not last_name:
        errors.append('Last name is required')
    if not email:
        errors.append('Email is required')
    elif not validate_email(email):
        errors.append('Please enter a valid email address')
    if not phone:
        errors.append('Phone number is required')
    elif not validate_phone(phone):
        errors.append('Please enter a valid phone number (at least 10 digits)')
    if not event_type:
        errors.append('Please select an event type')
    
    # Check if email already exists
    if email and any(user['email'] == email for user in registered_users):
        errors.append('This email is already registered')
    
    if errors:
        for error in errors:
            flash(error, 'error')
        return render_template('registration.html', 
                             first_name=first_name,
                             last_name=last_name,
                             email=email,
                             phone=phone,
                             event_type=event_type,
                             dietary_restrictions=dietary_restrictions)
    
    # Save registration
    user_data = {
        'first_name': first_name,
        'last_name': last_name,
        'email': email,
        'phone': phone,
        'event_type': event_type,
        'dietary_restrictions': dietary_restrictions
    }
    registered_users.append(user_data)
    
    flash('Registration successful!', 'success')
    return redirect(url_for('success', email=email))

@app.route('/success')
def success():
    """Success page after registration"""
    email = request.args.get('email')
    return render_template('success.html', email=email)

@app.route('/registrations')
def registrations():
    """View all registrations (admin view)"""
    return render_template('registrations.html', users=registered_users)

if __name__ == '__main__':
    app.run(debug=True)
