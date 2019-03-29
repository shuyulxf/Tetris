import { Dimensions, PixelRatio } from 'react-native';
import { latticeNumber, designSize, pd, operationHeight, gridItem, whiteSpaceGap, centerIndex, baseCoords, latticeColorList } from './config.js';

const { width, height } = Dimensions.get("window");


const getViewScale = ((fn) => {
    let scale;
    return function () {
        return scale || (scale = fn.apply(this, arguments));
    }
})(dealViewScale);
function dealViewScale () {
    const dp2px = dp => PixelRatio.getPixelSizeForLayoutSize(dp),
        pxRatio = PixelRatio.get(),
        design_scale_x = designSize.width / dp2px(width);
    return 1;
}

const getViewSize = ((fn) => {
    let size;
    return function () {
        return size || (size = fn.apply(this, arguments));
    }
})(dealViewSize);
function dealViewSize() {
    let scale = getViewScale();
    return {
        width: width / scale,
        height: height / scale
    }
}

const getLatticeSize = ((fn) => {
    let size;
    return function () {
        return size || (size = fn.apply(this, arguments));
    }
})(dealLatticeSize);
function dealLatticeSize() {
    let width = Math.floor((getViewSize().width - pd * 2 - (latticeNumber - 1)) / latticeNumber);
    return width % 2 === 0 ? width : width - 1;
}

const getGridSize = ((fn) => {
    let size;
    return function () {
        return size || (size = fn.apply(this, arguments));
    }
})(dealGridSize);
function dealGridSize() {
    let { height } = getViewSize();
    return {
        x: latticeNumber,
        y: Math.floor((height - operationHeight) / (getLatticeSize() + whiteSpaceGap * 2))
    }
}

const getGridItem = () => {
    return Object.assign({}, gridItem);
}

const createRandom = (l, h) => {
    var range = h - l + 1;
    return Math.floor(Math.random() * range + l);
}

let size = getLatticeSize();
const getPosition = (x, y) => {
    return {
        left: (size + whiteSpaceGap) * x,
        top: (size + whiteSpaceGap) * y
    };
}

const getShapes = () => {
    let coords = [];
    for (let i = 0; i < baseCoords.length; i++) {
        let baseCoord = baseCoords[i],
            coord = [];
        for (let j = 0; j < baseCoord.length; j++) {
            coord.push(Object.assign({}, baseCoord[j], {
                x: centerIndex + baseCoord[j].x
            })) 
        }
        coords.push(coord);
    }
    return coords;
}

const clockwiseRotatePure = (coord, shapeCenter, d = 90) => {
    let { x, y } = coord,
        { x: x1, y: y1 } = shapeCenter,
        copied = {};
    d = Math.PI * 2 / 360 * d;
    copied.x = Math.round((x - x1) * Math.cos(d) + (y - y1) * Math.sin(d) + x1);
    copied.y = Math.round((y - y1) * Math.cos(d) - (x - x1) * Math.sin(d) + y1);
    return copied;
}

const clockwiseRotate = (coord, shapeCenter, d = 90) => {
    let { x, y } = coord,
        { x: x1, y: y1 } = shapeCenter;

    d = Math.PI * 2 / 360 * d;
    coord.x = Math.round((x - x1) * Math.cos(d) + (y - y1) * Math.sin(d) + x1);
    coord.y = Math.round((y - y1) * Math.cos(d) - (x - x1) * Math.sin(d) + y1);
}

const anticlockwiseRotate = (coord, shapeCenter, d = 90) => {
    let { x, y } = coord,
        { x: x1, y: y1 } = shapeCenter,
        copied = {};
    copied.x = (x - x1) * Math.cos(d) - (y - y1) * Math.sin(d) + x1;
    copied.y = (y - y1) * Math.cos(d) + (x - x1) * Math.sin(d) + y1;
    return copied;
}

const initShape = (props) => {
    let shapes = getShapes();
    let range = latticeColorList.length - 1;
    let color = createRandom(1, range);
    let type = createRandom(0, shapes.length - 1);
    let coords = shapes[type];
    // this.props.saveCurCoords(coords);
    // this.props.saveCurShapeColor(color);
    // this.props.saveCurShapeType(type);
    props.saveCurCoords(coords);
    props.saveCurShapeColor(color);
    props.saveCurShapeType(type);
}

const initGridRow = () => {
    let { x: x_num } = getGridSize(),
        row = [];
    for (let i = 0; i < x_num; i++) {
        row.push(getGridItem());
    }
    return row;
}

const initGridData = () => {
    let grid = [],
        { y: y_num } = getGridSize();
    for (let i = 0; i < y_num; i++) {
        grid[i] = initGridRow();
    }
    return grid;
}

export {
    getViewSize,
    getViewScale,
    getLatticeSize,
    getGridSize,
    getGridItem,
    createRandom,
    getPosition,
    clockwiseRotatePure,
    clockwiseRotate,
    anticlockwiseRotate,
    getShapes,
    initShape,
    initGridRow,
    initGridData
}
