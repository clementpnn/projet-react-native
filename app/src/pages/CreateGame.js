import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../components/Button'

export default function CreateGameScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        text="Retour"
        onPress={() => navigation.navigate('Home')}
      />
      <Text>Créer une nouvelle partie ici</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
