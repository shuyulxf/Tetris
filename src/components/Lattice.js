import React from 'react';
import { StyleSheet, View } from 'react-native';
import { getLatticeSize, getPosition } from '../static/utils.js';
import { latticeColorList } from '../static/config.js';

let size = getLatticeSize();
export default class Lattice extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    componentDidUpdate() {
        //this.move();
    }
    move() {
        // new Animated.Value(0)
        let { left: x, top: y } = getPosition(this.props.seqX, this.props.seqY+5);
        Animated.timing(
            this.state.moveStart,
            {
                toValue: y,
                easing: Easing.back,
                duration: 3000,
            }
        ).start(() => {
           
        });
    }

    render() {
        let { data, seqX, seqY } = this.props,
            position = getPosition(seqX, seqY);

        return (
            <View style={[styles.container, position, { backgroundColor: latticeColorList[data.color]}]}>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: size,
        height: size,
        position: 'absolute',
        borderRadius: 2
    }
});