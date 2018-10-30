import { SET_GRUPOS } from "../actions";

export default function(state = {}, action) {
    switch (action.type) {
        case SET_GRUPOS:
            //if (state === null) {
            //    return action.grupo;
            //}
            return [...state, action.grupo];
        default:
            return state;
    }
}