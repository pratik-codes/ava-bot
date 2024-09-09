from flask import request, jsonify
from flask_cors import CORS, cross_origin
import handlers

class AvaChatBot:
    def __init__(self, app):
        self.app = app
        self.init_routes()

    def init_routes(self):
        # Health check route
        @self.app.route('/')
        def health_check():
            return self.health_check_response()

        # Chat route for handling OpenAI requests
        @self.app.route('/chat', methods=['POST'])
        @cross_origin(origins='*', allow_headers=['Content-Type', 'Authorization'])
        def chat():
            return self.handle_chat_request()

    @staticmethod
    def health_check_response():
        return 'Ava Chat Bot is up and running!'

    def handle_chat_request(self):
        # Validate request
        if not request.is_json or 'message' not in request.json:
            return jsonify({"error": "Invalid request"}), 400

        # Extract and process the message
        user_message = request.json["message"]
        try:
            response = handlers.handle_chat(user_message)
            return jsonify({"response": response})
        except Exception as e:
            return jsonify({"error": str(e)}), 200
