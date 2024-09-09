import pytest
from flask import Flask
from routes import AvaChatBot

@pytest.fixture
def app():
    app = Flask(__name__)
    AvaChatBot(app)
    return app

@pytest.fixture
def client(app):
    return app.test_client()

def test_app_initialization(app):
    assert isinstance(app, Flask)
    assert '/chat' in [rule.rule for rule in app.url_map.iter_rules()]

def test_health_check_route(client):
    response = client.get('/')
    assert response.status_code == 200
    assert response.data.decode() == 'Ava Chat Bot is up and running!'
