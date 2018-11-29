import { SET_FIELD, SET_FIELD_SEGUNDO_NIVEL, SET_JOGADOR, OUT_JOGADOR } from "../actions";

export default function(state = null, action) {
    switch (action.type) {
        case SET_FIELD:
            const newState = { ...state }; // Object.assign({}, state)
            newState[action.field] = action.value;
            return newState;
        case SET_FIELD_SEGUNDO_NIVEL:
            const newState2 = { ...state }; // Object.assign({}, state)
            newState2[action.field][action.field2] = action.value;
            return newState2;
        case SET_JOGADOR:
            return action.jogador;
        case OUT_JOGADOR:
            return null;
        default:
            return state;
    }
}