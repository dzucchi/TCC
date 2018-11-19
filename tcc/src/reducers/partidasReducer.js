import { SET_PARTIDAS } from "../actions";

export default function(state = null, action) {
    switch (action.type) {
        case SET_PARTIDAS:
            return action.partidas;
        default:
            return state;
    }
}