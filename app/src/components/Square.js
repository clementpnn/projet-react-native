import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Square = ({ value, onPress }) => (
    <TouchableOpacity style={styles.square} onPress={onPress}>
        <Text style={styles.squareText}>{value}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    square: {
        width: 100,
        height: 100,
        backgroundColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'black',
    },
    squareText: {
        fontSize: 30,
        color: 'blue',
    },
});

export default Square;
