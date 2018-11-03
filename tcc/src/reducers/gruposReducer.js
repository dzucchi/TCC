import { SET_GRUPOS } from "../actions";

export default function(state = {}, action) {
    switch (action.type) {
        case SET_GRUPOS:
            return action.grupos;
        default:
            return state;
    }
}