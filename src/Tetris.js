import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { getViewSize, getViewScale } from './static/utils.js';
import { colorMap } from './static/config.js';
import Grid from './components/Grid.js';
import Operation from './components/Operation.js';

let { bg } = colorMap;
let { width: win_width, height: win_height } = getViewSize();

import store from './store/store';

export default class Tetris extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <Grid></Grid>
                    <Operation></Operation>
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: win_width,
        height: win_height,
        backgroundColor: bg,
        transform: [
            {
                scale: getViewScale()
            }
        ],
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 12
    }
});
