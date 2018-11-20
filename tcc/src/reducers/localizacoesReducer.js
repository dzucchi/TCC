import { SET_LOCALIZACOES } from "../actions";

export default function(state = null, action) {
    switch (action.type) {
        case SET_LOCALIZACOES:
            return action.localizacoes;
        default:
            return state;
    }
}