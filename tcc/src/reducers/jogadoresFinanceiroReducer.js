import { SET_JOGADORES_FINANCEIRO, SET_FIELD_JOGADOR_FINANCEIRO } from "../actions";

export default function (state = null, action) {
    switch (action.type) {
        case SET_FIELD_JOGADOR_FINANCEIRO:
            const newStateGrupo = [ ...state ]; // Object.assign({}, state)
            newStateGrupo[action.index][action.field] = action.value;
            return newStateGrupo;
        case SET_JOGADORES_FINANCEIRO:
            return action.jogadores;
        default:
            return state;
    }
}