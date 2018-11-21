import { SET_NOTIFICACOES } from "../actions";

export default function(state = null, action) {
    switch (action.type) {
        case SET_NOTIFICACOES:
            return action.notificacoes;
        default:
            return state;
    }
}