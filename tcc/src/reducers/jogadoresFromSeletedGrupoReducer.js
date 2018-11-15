import { SET_JOGADORES_FROM_SELECTED_GRUPO, SET_FIELD_PARTIDA } from "../actions";

export default function (state = null, action) {
    switch (action.type) {
        case SET_FIELD_PARTIDA:
            const newState = { ...state }; // Object.assign({}, state)
            newState[action.field] = action.value;
            return newState;
        case SET_JOGADORES_FROM_SELECTED_GRUPO:
            return action.jogadores;
        default:
            return state;
    }
}