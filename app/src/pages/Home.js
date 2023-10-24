import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Button from '../components/Button'
import Input from '../components/Input'
import { useWebSocket } from '../context/WebSocketContext';
import Logo from '../components/svg/Logo';

export default function HomeScreen({ navigation }) {
  const [roomCode, setRoomCode] = useState('');
  const [isHost, setIsHost] = useState(false);
  const websocket = useWebSocket();

  useEffect(() => {
    if (websocket) {
      websocket.onmessage = (e) => {
        console.log('Message received:', e.data);
        const message = JSON.parse(e.data);
        
        if (message.action === 'start_game') {
          navigation.navigate('Game');x
        } else if (message.action === 'created') {
          setRoomCode(message.room_code);
          setIsHost(true);
        }
      };
    }
  }, [websocket]);

  const createGame = () => {
    if (websocket) {
      websocket.send(JSON.stringify({ action: 'create' }));
      console.log('Create game message sent');

    }
  };

  const joinGame = () => {
    if (websocket) {
      websocket.send(JSON.stringify({ action: 'join', room_code: roomCode }));
      console.log('Join game message sent with room code:', roomCode);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo/>
      </View>
      <View style={styles.subContainer}>
        <Button text="Créer une partie" onPress={createGame} />
      {isHost && (
        <View style={styles.roomCodeContainer}>
          <Text>Code de la salle :</Text>
          <Text style={styles.roomCode}>{roomCode}</Text>
        </View>
      )}
      {!isHost && (
        <View style={styles.joinContainer}>
          <Input 
            style={styles.input} 
            placeholder="Entrez le code de la salle" 
            onChangeText={text => setRoomCode(text)} 
            value={roomCode} 
          />
          <Button text="Rejoindre la partie" onPress={joinGame} />
        </View>
      )}
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingBottom: 140,
    paddingHorizontal: 20,
    display: 'flex',
    justifyContent: 'space-between',
    height: "100vh"
  },
  roomCodeContainer: {
    alignItems: 'center',
  },
  roomCode: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  joinContainer: {
    display: "flex",
    gap: 20
  },
  subContainer: {
    display: 'inline-flex',
    justifyContent: 'flex-start',
    gap: 40,
    marginTop: 140
  },
  joinParty: {
    display: 'flex',
    gap: 20,
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  }
});
