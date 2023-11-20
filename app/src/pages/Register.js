import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Erreur", "Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      await AsyncStorage.setItem('userName', username);
      navigation.navigate('Game');
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur est survenue lors de l’inscription');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>S'inscrire</Text>
      <View style={styles.subContainer}>
        <TextInput
          placeholder="Nom d'utilisateur"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />
        <TextInput
          placeholder="Mot de passe"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <TextInput
          placeholder="Confirmer le mot de passe"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          style={styles.input}
        />
        <View style={styles.buttonContainer}>
          <Button title="Inscription" onPress={handleRegister} color="#6666FF" style={styles.button}/>
          <Button
            title="Connexion"
            onPress={() => navigation.navigate('Login')}
            color="#6666FF" style={styles.button}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignContent: "center",
    padding: 20,
    paddingBottom: 90,
    gap: 80
  },
  subContainer: {
    flexDirection: "column",
    justifyContent: 'center',
    gap: 40,
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: 'center',
    gap: 20,
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: "flex-start",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#6666FF",
    borderRadius: 6,
  },
  button: {
    borderRadius: 6
  },
  h1: {
    fontSize: 48,
    textTransform: "uppercase",
    color: "#6666FF"
  }
});

export default RegisterScreen;