import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Button from '../components/Button'
import Input from '../components/Input'
import Logo from '../components/svg/Logo'

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo/>
      </View>
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
