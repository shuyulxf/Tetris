import { SAVE_CUR_STATUS } from '../actions/shape';
export default function (state = 1, action) {
    switch (action.type) {
        case SAVE_CUR_STATUS:
            return action.data ? action.data : state;
        default:
            return state;
    }
}