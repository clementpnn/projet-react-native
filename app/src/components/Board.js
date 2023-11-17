import React from 'react';
import { View, StyleSheet } from 'react-native';
import Square from './Square';

const Board = ({ squares, onPress }) => {
    console.log(squares);
    return (
        <View style={styles.board}>
            {squares.map((square, i) => (
                <Square key={i} value={square} onPress={() => onPress(i)} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    board: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: 302,
        height: 300,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#999',
    },
});

export default Board;
