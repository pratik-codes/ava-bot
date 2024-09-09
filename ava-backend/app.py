import os
from flask import Flask
from routes import init_routes
from dotenv import load_dotenv
from flask_cors import CORS

# Load environment variables from .env file
load_dotenv()

# Initialize the Flask app
app = Flask(__name__)
cors = CORS(app, resources={r"/chat": {"origins": "*"}})

# Initialize routes
init_routes(app)

if __name__ == '__main__':
    debug_mode = os.getenv("DEBUG_MODE") == "True"
    port = int(os.getenv("PORT", 4000))
    app.run(debug=debug_mode, port=port)
