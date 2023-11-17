import React, { useEffect, useState } from 'react';
import { View, Button, Text, StyleSheet, Dimensions } from 'react-native';
import Board from '../components/Board';

const Game = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);
    const [ws, setWs] = useState(null);

    useEffect(() => {
        const webSocket = new WebSocket('ws://localhost:3000');

        webSocket.onopen = () => {
            console.log('Connected to the server');
            setWs(webSocket);
        };

        webSocket.onmessage = (e) => {
            const message = JSON.parse(e.data);
            console.log('Message from server: ', message);
            handleServerMessage(message);
        };

        webSocket.onerror = (error) => {
            console.log('WebSocket error: ', error);
        };

        webSocket.onclose = () => {
            console.log('Disconnected from the server');
            setWs(null);
        };

        return () => {
            webSocket.close();
        };
    }, []);

    const handleServerMessage = (message) => {
        if (message.type === 'state') {
            setSquares(message.state);
            setXIsNext(message.nextPlayer === 'X');
        } else if (message.type === 'winner') {
            alert(`Le gagnant est ${message.winner}`);
            setSquares(Array(9).fill(null));
        }
    };
    

    const handleClick = (i) => {
        if (calculateWinner(squares) || squares[i] || !ws) {
            return;
        }
        ws.send(JSON.stringify({ index: i, player: xIsNext ? 'X' : 'O' }));
    };

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

    return (
        <View style={styles.gameContainer}>
            <View style={styles.boardContainer}>
                <Board squares={squares} onPress={handleClick} />
            </View>
            <View style={styles.statusContainer}>
                <Text style={styles.statusText}>Next player: {xIsNext ? 'X' : 'O'}</Text>
                <Button 
                    title="RESTART GAME" 
                    onPress={() => setSquares(Array(9).fill(null))}
                    color="#1E90FF"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    gameContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    boardContainer: {
        marginBottom: 20,
    },
    statusContainer: {
        alignItems: 'center',
        margin: 20,
    },
    statusText: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 10,
    },
    game: {
        alignItems: 'center',
        marginTop: 20,
    },
    status: {
        margin: 10,
        fontSize: 20,
    },
});

export default Game;
