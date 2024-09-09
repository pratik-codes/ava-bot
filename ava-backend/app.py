import os
from flask import Flask
from dotenv import load_dotenv
from flask_cors import CORS
from routes import AvaChatBot

# Load environment variables from .env file
load_dotenv()

# Initialize the Flask app
app = Flask(__name__)

# Initialize AvaChatBot with the app
AvaChatBot(app)

if __name__ == '__main__':
    debug_mode = os.getenv("DEBUG_MODE") == "True"
    port = int(os.getenv("PORT", 4000))
    app.run(debug=debug_mode, host="0.0.0.0", port=port)
