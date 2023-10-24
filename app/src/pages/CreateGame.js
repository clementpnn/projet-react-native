import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../components/Button'

export default function CreateGameScreen({ navigation }) {
  // return (
  //   <View style={styles.container}>
  //     <Button
  //       text="Retour"
  //       onPress={() => navigation.navigate('Home')}
  //     />
  //     <Text>Créer une nouvelle partie ici</Text>
  //   </View>
  // );

// import React, { useEffect } from 'react';
// import { View, Text, Button } from 'react-native';
// import io from 'socket.io-client';

// const CreateGameScreen = ({ route }) => {
//     const { roomCode } = route.params;
//     const socket = io('http://localhost:5000');


    useEffect(() => {
        socket.emit('join', { username: 'Player1', room: roomCode });

        socket.on('user_joined', (data) => {
            console.log(`${data.username} joined the room.`);
        });

        return () => {
            socket.emit('leave', { username: 'Player1', room: roomCode });
            socket.off();
        };
    }, []);

    return (
        <View>
            <Text>Room Code: {roomCode}</Text>
            <Button title="Leave Game" onPress={() => {
                socket.emit('leave', { username: 'Player1', room: roomCode });
            }} />
        </View>
    );
};

export default CreateGameScreen;
