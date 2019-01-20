import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Tetris  from './src/Tetris.js';
export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
              <Tetris></Tetris>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
 