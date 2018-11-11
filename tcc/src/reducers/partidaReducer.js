import { SET_FIELD_PARTIDA, PARTIDA_SAVED_SUCCESS } from "../actions";

const INITIAL_STATE = {
    id: null,
    dia_do_jogo: '',
    hora_inicio: '',
    hora_fim: '',
    endereco: '',
    localizacao: {
        lat: 0,
        lng: 0
    },
    valor_gastos: '',
    times: {},
    jogadores: {}
}

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_FIELD_PARTIDA:
            const newState = { ...state }; // Object.assign({}, state)
            newState[action.field] = action.value;
            return newState;
        case PARTIDA_SAVED_SUCCESS:
            return INITIAL_STATE;
        default:
            return state;
    }
}