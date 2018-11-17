import { SET_TIMES } from "../actions";

export default function (state = null, action) {
    switch (action.type) {
        case SET_TIMES:
            return action.times;
        default:
            return state;
    }
}