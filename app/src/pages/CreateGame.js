import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CreateGameScreen() {
  return (
    <View style={styles.container}>
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
