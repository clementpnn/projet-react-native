import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './pages/Home';
import CreateGameScreen from './pages/CreateGame';
import JoinGameScreen from './pages/JoinGame';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CreateGame" component={CreateGameScreen} options={{ headerShown: false }} />
        <Stack.Screen name="JoinGame" component={JoinGameScreen}  options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
