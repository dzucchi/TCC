import { SET_FIELD_GRUPO, GRUPO_SAVED_SUCCESS, SET_WHOLE_GRUPO, RESET_FORM } from "../actions";

const INITIAL_STATE = {
    id: null,
    id_lider: 0,
    nome: '',
    dia_da_semana: 'Segunda-feira',
    hora_inicio: '',
    hora_fim: '',
    privado: false,
    estagio: 0,
    categoria: 'Society',
    endereco: ''
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_FIELD_GRUPO:
            const newState = { ...state }; // Object.assign({}, state)
            newState[action.field] = action.value;
            return newState;
        case SET_WHOLE_GRUPO:
            return action.serie;
        case RESET_FORM:
        case GRUPO_SAVED_SUCCESS:
            return INITIAL_STATE;    
        default:
            return state;
    }
}