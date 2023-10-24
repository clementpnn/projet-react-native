import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function JoinGameScreen() {
  return (
    <View style={styles.container}>
      <Text>Rejoindre une partie ici</Text>
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
