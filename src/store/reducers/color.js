import { SAVE_CUR_COLOR } from '../actions/shape';
export default function (state = 0, action) {
    switch(action.type) {
        case SAVE_CUR_COLOR:
            return action.data ? action.data : state;
        default:
            return state;
    }
}