import { SAVE_CUR_SHAPE_TYPE } from '../actions/shape';
export default function (state = 2, action) {
    switch (action.type) {
        case SAVE_CUR_SHAPE_TYPE:
            return action.data ? action.data : state;
        default:
            return state;
    }
}