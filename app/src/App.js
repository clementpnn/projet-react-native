import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Game from './pages/Game';

const App = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Game />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default App;
