import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './pages/Home';
import { WebSocketProvider } from './context/WebSocketContext';
import CreateGameScreen from './pages/CreateGame';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <WebSocketProvider>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="GameScreen" component={CreateGameScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </WebSocketProvider>
    </NavigationContainer>
  );
}
