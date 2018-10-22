import { SET_FIELD, SET_JOGADOR, INITIAL_STATE } from "../actions";

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_FIELD:
            const newState = { ...state }; // Object.assign({}, state)
            newState[action.field] = action.value;
            return newState;
        case SET_JOGADOR:
            return action.jogador;
        default:
            return state;
    }
}