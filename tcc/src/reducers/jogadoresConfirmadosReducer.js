import { SET_JOGADORES_CONFIRMADOS, SET_FIELD_JOGADOR_PRESENTE } from "../actions";

export default function (state = null, action) {
    switch (action.type) {
        case SET_FIELD_JOGADOR_PRESENTE:
            const newStateGrupo = [ ...state ]; // Object.assign({}, state)
            newStateGrupo[action.index][action.field] = action.value;
            return newStateGrupo;
        case SET_JOGADORES_CONFIRMADOS:
            return action.jogadores;
        default:
            return state;
    }
}