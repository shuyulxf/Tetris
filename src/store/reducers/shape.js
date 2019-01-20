import { SAVE_CUR_SHAPE } from '../actions/shape';
export default function (state = [], action) {
    switch (action.type) {
        case SAVE_CUR_SHAPE:
            return [...(action.data ? action.data : state)];
        default:
            return state;
    }
}