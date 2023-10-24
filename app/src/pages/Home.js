import React from 'react';
import { View, StyleSheet } from 'react-native';
import Button from '../components/Button'
import Input from '../components/Input'

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        text="Créer une partie"
        onPress={() => navigation.navigate('CreateGame')}
      />
      <Input
        placeholder={"Entrez le code secret"}
      />
      <Button
        text="Rejoindre la partie"
        onPress={() => navigation.navigate('JoinGame')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
});
