const WebSocket = require('ws');

const gameLogic = (wss) => {
    let gameState = Array(9).fill(null);
    let currentPlayer = 'X';

    wss.on('connection', (ws) => {
        console.log('Client connected');
        ws.send(JSON.stringify({ type: 'state', state: gameState, nextPlayer: currentPlayer }));

        ws.on('message', (message) => {
            const move = JSON.parse(message);

            if (move.type === 'restart') {
                gameState = Array(9).fill(null);
                currentPlayer = 'X';
                broadcast({ type: 'state', state: gameState, nextPlayer: currentPlayer });
                return;
            }

            if (gameState[move.index] || currentPlayer !== move.player) {
                return;
            }

            gameState[move.index] = move.player;
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

            const winner = calculateWinner(gameState);
            const isDraw = !gameState.includes(null)
            if (winner) {
                broadcast({ type: 'winner', winner });
                gameState = Array(9).fill(null);
                currentPlayer = 'X';
                broadcast({ type: 'state', state: gameState, nextPlayer: currentPlayer });
            } else if (isDraw) {
                broadcast({ type: 'draw' })
                gameState = Array(9).fill(null)
                currentPlayer = 'X';
                broadcast({ type: 'state', state: gameState, nextPlayer: currentPlayer });
            } else {
                broadcast({ type: 'state', state: gameState, nextPlayer: currentPlayer });
            }
        });

        ws.on('close', () => console.log('Client disconnected'));
    });

    const broadcast = (data) => {
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(data));
            }
        });
    };
}

const calculateWinner = (squares) => {
  const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a];
      }
  }
  return null;
};

module.exports = gameLogic;