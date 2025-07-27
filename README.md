# Flask Event Registration App

A simple Flask web application for event registration with form validation and user management.

## Features

- **User Registration Form**: Clean, responsive registration form with validation
- **Form Validation**: Server-side validation for email, phone, and required fields
- **Success Page**: Confirmation page after successful registration
- **Admin View**: View all registered users in a table format
- **Responsive Design**: Mobile-friendly interface
- **Flash Messages**: User feedback for errors and success messages

## Project Structure

```
devops/
├── app.py                      # Main Flask application
├── templates/                  # HTML templates
│   ├── registration.html       # Registration form
│   ├── success.html           # Success confirmation page
│   └── registrations.html     # Admin view for all registrations
├── requirements.txt           # Python dependencies
└── README.md                 # This file
```

## Installation

1. **Create a virtual environment** (recommended):
   ```bash
   python -m venv venv
   venv\Scripts\activate  # On Windows
   # source venv/bin/activate  # On macOS/Linux
   ```

2. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

## Running the Application

1. **Start the Flask development server**:
   ```bash
   python app.py
   ```

2. **Open your browser** and navigate to:
   ```
   http://localhost:5000
   ```

## Usage

### Registration Form
- Navigate to the home page (`/`) to access the registration form
- Fill out all required fields (marked with *)
- Submit the form to register for an event

### View Registrations
- Navigate to `/registrations` to view all registered users
- This acts as an admin panel to see all submissions

### Form Validation
The application includes validation for:
- Required fields (first name, last name, email, phone, event type)
- Email format validation
- Phone number validation (minimum 10 digits)
- Duplicate email prevention

## API Endpoints

- `GET /` - Registration form
- `POST /register` - Process registration
- `GET /success` - Success confirmation page
- `GET /registrations` - View all registrations

## Configuration

### Security
- Change the `secret_key` in `app.py` for production use
- The current key is for development only

### Data Storage
- Currently uses in-memory storage (lost on restart)
- For production, consider integrating with a database like SQLite, PostgreSQL, or MySQL

## Customization

### Adding New Event Types
Edit the `event_type` select options in `templates/registration.html`:
```html
<option value="new_type">New Event Type</option>
```

### Styling
Modify the CSS in the `<style>` sections of the HTML templates to customize the appearance.

### Additional Fields
To add new form fields:
1. Add the field to `templates/registration.html`
2. Update the form processing logic in `app.py`
3. Update the display in `templates/registrations.html`

## Development Notes

- The app runs in debug mode for development
- Flash messages provide user feedback
- Form data is preserved on validation errors
- Responsive design works on mobile devices

## Future Enhancements

- Database integration for persistent storage
- User authentication and admin panel
- Email confirmation system
- Export registrations to CSV/Excel
- Event capacity management
- Payment integration
- Multi-event support

## License

This project is for educational purposes and can be freely modified and distributed.
