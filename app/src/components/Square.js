import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Square = ({ value, onPress }) => (
    <TouchableOpacity style={styles.square} onPress={onPress}>
        <Text style={value == "X" ? styles.crossText: styles.circleText }>{value}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    square: {
        width: 100,
        height: 100,
        backgroundColor: '#F1F1F1',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#A3A3A3',
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
});

export default Square;
