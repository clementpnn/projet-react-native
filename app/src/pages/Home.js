
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Button from '../components/Button';
import Input from '../components/Input';
import Logo from '../components/svg/Logo';
import { useWebSocket } from '../context/WebSocketContext';

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
          navigation.navigate('Game');
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
        <Button
          text="Créer une partie"
          onPress={{createGame}}
        />
        <View style={styles.joinParty}>
          <Input
            placeholder={"Entrez le code secret"}
          />
          <Button
            text="Rejoindre la partie"
            onPress={joinGame}
          />
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingHorizontal: 20,
    display: 'flex',
    justifyContent: 'center',
  },
  subContainer: {
    display: 'inline-flex',
    justifyContent: 'flex-start',
    gap: 40,
    marginTop: 140,
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
