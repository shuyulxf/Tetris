import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Alert } from 'react-native';
import { connect } from 'react-redux';
import { pd, operationHeight, colorMap, status, PAUSE_STATUS, shapeCenter } from '../static/config.js';
import { getOperateSize, clockwiseRotate, getGridSize, initShape, initGridRow, initGridData, clockwiseRotatePure} from '../static/utils.js';
import { mapStateToProps, mapDispatchToProps } from '../store/connect.js';

let statusSize = Math.floor(operationHeight / 3 * 2),
    opSize = Math.floor(operationHeight / 2);
let { opColor } = colorMap;
let { x: x_num, y: y_num } = getGridSize();

class Operate extends React.Component {
    constructor(props) {
        super(props);
        this.timer = null;
        this.initTetris();
        this.state = {
            line: 0,
            score: 0,
            isEnding: false
        };
    }
    initTetris() {
        this.props.saveCurStatus();
        this.props.saveGrid(initGridData());
        initShape(this.props);
    }
    reUpdateData() {
        this.setState({
            line: 0,
            score: 0,
            isEnding: false
        });
        this.timer = null;
    }
    changeStatus() {
        if (!this.state.isEnding) {
            this.props.saveCurStatus(this.props.status);
        }
    }
    componentDidUpdate() {
        let status = this.props.status,
            timer = this.timer;
        if (status === PAUSE_STATUS) {
            if (timer !== null) {
                clearInterval(timer);
                this.timer = null;
            }
        } else {
            if (timer === null) {
                this.timer = setInterval(() => {
                    this.move('down');
                }, 800);
            }
        }
    }
    isHorizonOverlaped(grid, coords, sign) {
        for (let i = 0; i < coords.length; i++) {
            let { x, y } = coords[i];
            if (x + sign < 0 || x + sign >= x_num || (y >= 0 && y < y_num && grid[y][x + sign].isTaked !== 0)) {
                return true;
            }
        }
        return false;
    }
    isVerticalOverlaped(grid, coords, sign) {
        for (let i = 0; i < coords.length; i++) {
            let { x, y } = coords[i]; 
            if (y + sign >= y_num || (y >= 0 && x >= 0 && x < x_num && grid[y + sign][x].isTaked !== 0)) {
                return true;
            }
        }
        return false;
    }
    dealEndShapeStatus(grid, coords) {
        let flag = false,
            { color } = this.props;

        for (let i = 0; i < coords.length; i++) {
            let { x, y } = coords[i];
            if (y >= y_num - 1 || y >= 0 && y + 1 < y_num && grid[y+1][x].isTaked) {
                flag = true;
                break;
            }
        }
        if (flag) {
            // update grid
            for (let i = 0; i < coords.length; i++) {
                let {x, y} = coords[i];
                if (y >= 0) {
                    grid[y][x].isTaked = 1;
                    grid[y][x].color = color;
                }
            }
            // 看看能否消除一整行, 
            grid = this.bingo(grid);
            this.props.saveGrid(grid);
            // 更新shape的位置
            initShape(this.props);

            // isEnding
            let isEnding = false;
            for (let i = 0; i < x_num; i++) {
                if (grid[0][i].isTaked) {
                    isEnding = true;
                }
            }
            if (isEnding) {
                this.props.saveCurStatus();
                this.setState({
                    isEnding
                })
                Alert.alert(
                    '提示', 
                    '游戏结束', 
                    [
                        { 
                            text: '重新开始', 
                            onPress: () => {
                                this.initTetris();
                                this.reUpdateData();
                            } 
                        },
                        { 
                            text: '取消', 
                            onPress: () => console.log('Cancel Pressed')
                        }
                    ],
                    { 
                        cancelable: false 
                    }
                );
            }
        }
    }
    bingo(grid) {
        let { line, score } = this.state;
        for (let i = y_num - 1; i >= 0; i--) {
            let j = 0;
            for (; j < x_num; j++) {
                if (grid[i][j].isTaked === 0) {
                    break;
                }
            }
            if (j >= x_num) {
                grid = [initGridRow()].concat(grid.slice(0, i), grid.slice(i + 1));
                line++;
                i++;
            }
            
        }
        if (line !== this.state.line) {
            this.setState({
                line,
                score: score + x_num
            });
        }
        
        return grid;
    }
    updateCoords(key, sign) {
        let coords = this.props.coords;
        for (let i = 0; i < coords.length; i++) {
            coords[i][key] += sign;
        }
        this.props.saveCurCoords(coords);
    }
    rotate(grid) {
        let coords = this.props.coords,
            type = this.props.type;
        let centerCoord = this.props.coords[shapeCenter[type]];

        for (let i = 0; i < coords.length; i++) {
            let { x, y } = clockwiseRotatePure(Object.assign({}, coords[i]), centerCoord);
            if (y < 0 || y >= y_num || x < 0 || x >= x_num || grid[y][x].isTaked) return;
        }
        
        for (let i = 0; i < coords.length; i++) {
            clockwiseRotate(coords[i], centerCoord);
        }
        
        this.props.saveCurCoords(coords);
    }
    move(type) {
        if (this.props.status === PAUSE_STATUS) return;
        let isHorizonOverlaped = this.isHorizonOverlaped,
            isVerticalOverlaped = this.isVerticalOverlaped,
            { grid, coords } = this.props,
            sign = 1;
        switch(type) {
            case 'left':
                sign = -1;
                if (isHorizonOverlaped(grid, coords, sign)) return;
                this.updateCoords('x', sign);
                break;
            case 'right': 
                sign = 1;
                if (isHorizonOverlaped(grid, coords, sign)) return;
                this.updateCoords('x', 1);
                break;
            case 'down':
                if (isVerticalOverlaped(grid, coords, 1)) return;
                this.updateCoords('y', 1);
                break;
            case 'rotate':
                this.rotate(grid);
                break;
            default:
                break;
        }
        this.dealEndShapeStatus(grid, coords);
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.item, styles.alignStart]}>
                    <TouchableOpacity style={styles.status}
                        onPress={() => {
                            this.changeStatus()
                        }}>
                        <Text style={styles.text}>{status[this.props.status]}</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.score]}>
                    <View>
                        <Text style={[styles.scoreType]}>Line: </Text>
                        <Text style={[styles.scoreType]}>Score: </Text>
                    </View>
                    <View>
                        <Text style={[styles.scoreType]}>{this.state.line}</Text>
                        <Text style={[styles.scoreType]}>{this.state.score}</Text>
                    </View>
                </View>
                <View style={[styles.item, styles.direction]}>
                    <View style={styles.directionLine}>
                        <TouchableOpacity 
                            style={[styles.circle, styles.mr5]}
                            onPress={() => {
                                this.move('left');
                            }}>
                            <View style={[styles.arrow, styles.left]}></View>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.circle}
                            onPress={() => {
                                this.move('right');
                            }}>
                            <View style={[styles.arrow, styles.right]}></View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.directionLine}>
                        <TouchableOpacity 
                            style={[styles.circle, styles.mr5]}
                            onPress={() => {
                                this.move('rotate');
                            }}>
                            <Text style={styles.text}>R</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.circle}
                            onPress={() => {
                                this.move('down');
                            }}>
                            <View style={[styles.arrow, styles.down]}></View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: getOperateSize(),
        paddingLeft: pd,
        paddingRight: pd,
        flexDirection: 'row',
        alignItems: 'flex-start',
        alignContent: 'space-between',
        justifyContent: 'center'
    },
    item: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    alignStart: {
        alignItems: 'flex-start'
    },
    direction: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        color: colorMap.fontColor
    },
    score: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch'
    },
    scoreType: {
        color: '#f8f2dc',
        fontSize: 16,
    },
    status: {
        width: statusSize,
        height: statusSize,
        borderRadius: 6,
        backgroundColor: opColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: colorMap.fontColor
    },
    arrow: {
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderWidth: 7,
        borderTopColor: 'transparent',//下箭头颜色
        borderLeftColor: 'white',//右箭头颜色
        borderBottomColor: 'transparent',//上箭头颜色
        borderRightColor: 'transparent'//左箭头颜色
    },
    directionLine: {
        flexDirection: 'row'
    },
    circle: {
        width: opSize,
        height: opSize,
        borderRadius: opSize,
        backgroundColor: opColor,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5
    },
    mr5: {
        marginRight: 5
    },
    down: {
        transform: [
            { rotate: '90deg' },
            { translate: [5, 0, 0]}
        ]
    },
    left: {
        transform: [
            { rotate: '-180deg' },
            { translate: [5, 0, 0] }
        ]
    },
    right: {
        transform: [
            { translate: [5, 0, 0] }
        ]
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Operate);
