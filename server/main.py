from flask import Flask, send_from_directory
from flask_socketio import SocketIO, emit

app = Flask(__name__)
socketio = SocketIO(app)

@app.route('/')
def index():
    return send_from_directory('public', 'index.html')

@socketio.on('move')
def handle_move(json):
    print('Received move: ' + str(json))
    socketio.emit('move', json, broadcast=True)

if __name__ == '__main__':
    socketio.run(app, debug=True)
