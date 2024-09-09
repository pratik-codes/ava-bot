from flask import request, jsonify
from handlers import handle_chat
from flask_cors import CORS, cross_origin


def init_routes(app):
    # Health check route
    @app.route('/')
    def health_check():
        return 'Ava Chat Bot is up and running!'

    # Chat route for handling OpenAI requests
    @app.route('/chat', methods=['POST', 'OPTIONS'])
    @cross_origin(origins='*', allow_headers=['Content-Type','Authorization'])
    def chat():
        # return ok for preflight requests
        if request.method == 'OPTIONS':
            return jsonify({}), 200

        if not request.is_json or 'message' not in request.json:
            return jsonify({"error": "Invalid request"}), 400

        # Extract message from the request
        user_message = request.json["message"]

        # Handle the OpenAI interaction
        try:
            response = handle_chat(user_message)
            return jsonify({"response": response})
        except Exception as e:
            return jsonify({"error": str(e)}), 200
