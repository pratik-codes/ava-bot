from flask import Flask
from routes import init_routes
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Initialize the Flask app
app = Flask(__name__)

# Initialize routes
init_routes(app)

# Run the app
if __name__ == '__main__':
    debug_mode = os.getenv("DEBUG_MODE") == "True"
    app.run(debug=debug_mode)
