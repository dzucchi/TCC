import { SET_JOGADORES_DISPONIVEIS, SET_FIELD_JOGADOR_DISPONIVEL } from "../actions";

export default function (state = null, action) {
    switch (action.type) {
        case SET_FIELD_JOGADOR_DISPONIVEL:
            const newStateGrupo = [ ...state ]; // Object.assign({}, state)
            newStateGrupo[action.index][action.field] = action.value;
            return newStateGrupo;
        case SET_JOGADORES_DISPONIVEIS:
            return action.jogadores;
        default:
            return state;
    }
}