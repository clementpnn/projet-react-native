import React, { useEffect, useState } from 'react';
import { View, Button, Text, StyleSheet, Dimensions } from 'react-native';
import Board from '../components/Board';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Game = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);
    const [ws, setWs] = useState(null);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const getUsername = async () => {
            const storedUsername = await AsyncStorage.getItem('userName');
            if (storedUsername) {
              setUsername(storedUsername);
            }
        };
      
        getUsername();

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
        } else if (message.type === 'draw') {
            alert('C\'est un match nul !')
        }
    };
    

    const handleClick = (i) => {
        if (calculateWinner(squares) || squares[i] || !ws) {
            return;
        }
        ws.send(JSON.stringify({ index: i, player: xIsNext ? 'X' : 'O' }));
    };

    const restartGame = () => {
        setSquares(Array(9).fill(null))
        if (ws) {
            ws.send(JSON.stringify({ type: 'restart' }))
        }
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

    return (
        <View style={styles.gameContainer}>
            <Text style={styles.usernameText}>{username}</Text>
            <View style={styles.statusContainer}>
                <Text style={xIsNext? styles.crossText: styles.defaultText}>X</Text>
                <Text style={xIsNext? styles.defaultText:styles.circleText}>O</Text>
            </View>

            <View style={styles.boardContainer}>
                <Board squares={squares} onPress={handleClick} />
            </View>
            <View style={styles.restartContainer}>
                <Button 
                    title="Restart" 
                    onPress={restartGame}
                    color="#6666FF"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    gameContainer: {
        gap: 20,
        flex: 1,
        padding: 20,
        alignContent: 'center',
        justifyContent: 'center',
    },
    usernameText: {
        paddingHorizontal: 20,
        fontSize: 18,
        textTransform: "uppercase",
        fontWeight: 'bold',
    },
    boardContainer: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    statusText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    crossText: {
        fontSize: 40,
        color: '#6666FF',
        fontWeight: "bold"
    },
    circleText: {
        fontSize: 40,
        color: '#E85454',
        fontWeight: "bold"
    },
    defaultText: {
        fontSize: 40,
        color: '#A3A3A3',
        fontWeight: "bold"
    },
    statusContainer: {
        flexDirection: "row",
        width: "100%",
        padding: 20,
        justifyContent: "space-between",
        alignContent: "center",
    },
    restartContainer: {
        padding: 16,
        justifyContent: "center",
        alignContent: "center",
    },
    game: {
        alignItems: 'center',
    },
    status: {
        fontSize: 20,
    },
});

export default Game;
