import { SET_JOGADORES_FROM_SELECTED_GRUPO } from "../actions";

export default function (state = null, action) {
    switch (action.type) {
        case SET_JOGADORES_FROM_SELECTED_GRUPO:
            return action.jogadores;
        default:
            return state;
    }
}