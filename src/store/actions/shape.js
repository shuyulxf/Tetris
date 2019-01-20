export const SAVE_CUR_SHAPE = 'SAVE_CUR_SHAPE';
export const SAVE_CUR_COLOR = 'SAVE_CUR_COLOR';
export const SAVE_CUR_SHAPE_TYPE = 'SAVE_CUR_SHAPE_TYPE';
export const SAVE_CUR_STATUS = 'SAVE_CUR_STATUS';
export const SAVE_GRID = 'SAVE_GRID';

import { PAUSE_STATUS, START_STATUS } from '../../static/config';

export function saveCurCoords(coords = []) {
    return {
        type: SAVE_CUR_SHAPE,
        data: coords
    }
}

export function saveCurShapeColor(color) {
    return {
        type: SAVE_CUR_COLOR,
        data: color
    }
}

export function saveCurShapeType(type) {
    return {
        type: SAVE_CUR_SHAPE_TYPE,
        data: type
    }
}

export function saveCurStatus(status) {
    return {
        type: SAVE_CUR_STATUS,
        data: status ? (status === PAUSE_STATUS ? START_STATUS : PAUSE_STATUS) : PAUSE_STATUS
    }
}

export function saveGrid(grid) {
    return {
        type: SAVE_GRID,
        data: grid
    }
}

