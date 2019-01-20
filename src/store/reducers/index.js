import { combineReducers } from 'redux';
import Shape from './shape';
import Color from './color';
import Type from './type';
import Status from './status';
import Grid from './grid';

const allReducers = {
    coords: Shape,
    color: Color,
    type: Type,
    status: Status,
    grid: Grid
}

const rootReducer = combineReducers(allReducers);

export default rootReducer;