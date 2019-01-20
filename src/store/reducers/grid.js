import { SAVE_GRID } from '../actions/shape';
export default function (state = [], action) {
    switch (action.type) {
        case SAVE_GRID:
            let grids = [],
                data = action.data;
            if (data) {
                for (let i = 0; i < data.length; i++) {
                    let grid = [];
                    for (let j = 0; j < data[i].length; j++) {
                        grid.push(Object.assign({}, data[i][j]));
                    }
                    grids.push(grid);
                }
            }
            return grids;
        default:
            return state;
    }
}