import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Button from '../components/Button'
import Input from '../components/Input'

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>
        Logo
      </Text>
      <View style={styles.subContainer}>
        <Button
          text="Créer une partie"
          onPress={() => navigation.navigate('CreateGame')}
        />
        <View style={styles.joinParty}>
          <Input
            placeholder={"Entrez le code secret"}
          />
          <Button
            text="Rejoindre la partie"
            onPress={() => navigation.navigate('JoinGame')}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 20,
    display: 'flex',
    justifyContent: 'center',
  },
  subContainer: {
    display: 'inline-flex',
    justifyContent: 'flex-start',
    gap: 40,
    marginTop: 200,
  },
  joinParty: {
    display: 'flex',
    gap: 20,
  }
});
