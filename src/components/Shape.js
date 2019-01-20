import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createRandom } from '../static/utils.js';
import { latticeColorList } from '../static/config.js';
import { getGridItem, initShape } from '../static/utils.js';
import Lattice from './Lattice.js';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../store/connect.js';

class Shape extends React.PureComponent {
    constructor(props) {
        super(props);
    } 
    componentDidMount() {
        initShape(this.props);
    }
    render() {
        let color = this.props.color;
        let coords = this.props.coords;
        return (
            <View style={styles.container}>
                {
                    coords.map((coord, idx) => {
                        let data = getGridItem();
                        data.color = color;
                        return (<Lattice type='shape' key={idx} data={data} seqX={coord.x} seqY={coord.y}></Lattice>)
                    })
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        borderRadius: 2,
        zIndex: 1
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Shape);
