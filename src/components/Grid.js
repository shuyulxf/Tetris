import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { getGridSize, getLatticeSize, initGridData } from '../static/utils.js';
import { pd, whiteSpaceGap } from '../static/config.js';
import Lattice from './Lattice.js';
import Shape from './Shape.js';
import { mapStateToProps, mapDispatchToProps } from '../store/connect.js';

let height = ((h) => {
    return (h + whiteSpaceGap) * getGridSize().y - whiteSpaceGap;
})(getLatticeSize());

class Grid extends React.Component {
    constructor(props) {
        super(props);
        //this.props.saveGrid(initGridData());
    }  
   
    initGrid = () => {
        return ((grid) => {
            let grids = [];
            grid.map((list, key) => {
                let row = [];
                list.map((item, idx) => {
                    row.push(<Lattice key={idx} data={item} seqX={idx} seqY={key}></Lattice>)
                });
                grids.push(row);
            });
            return grids;
        })(this.props.grid);
    }

    initShape = () => {
        return <Shape></Shape>
    }

    render() {
        let grids = this.initGrid();
        return (
            <View style={styles.container}>
                {
                    this.initShape()
                }
                {
                    grids.map((row, key) => {
                        return (
                            <View key={key}>{row}</View>
                        );
                    })
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        height: height,
        marginLeft: pd,
        marginRight: pd
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
