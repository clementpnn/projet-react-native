import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import io from 'socket.io-client';
import Button from './components/Buttons'

const socket = io('http://localhost:5000');

export default function App() {
  const [board, setBoard] = useState([['', '', ''], ['', '', ''], ['', '', '']]);
  const [player, setPlayer] = useState('X');

  useEffect(() => {
    socket.on('move', (move) => {
      setBoard(move.board);
      setPlayer(move.player);
    });
  }, []);

  const handlePress = (row, col) => {
    if (board[row][col] === '') {
      board[row][col] = player;
      setBoard([...board]);
      setPlayer(player === 'X' ? 'O' : 'X');
      socket.emit('move', { board, player: player === 'X' ? 'O' : 'X' });
    }
  };

  return (
    <View>
      <Button text={'lala'} onPress={()=> console.log('prout')}/>
      {/* {board.map((row, rowIndex) => (
        <View key={rowIndex} style={{ flexDirection: 'row' }}>
          {row.map((cell, colIndex) => (
            <TouchableOpacity
              key={colIndex}
              onPress={() => handlePress(rowIndex, colIndex)}
              style={{
                width: 100,
                height: 100,
                borderWidth: 1,
                borderColor: 'black',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{ fontSize: 32 }}>{cell}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))} */}
    </View>
  );
}
