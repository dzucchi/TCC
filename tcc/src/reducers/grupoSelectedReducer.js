import { SET_SELECTED_GRUPO, SET_FIELD_GRUPO_SELECTED } from "../actions";

export default function (state = null, action) {
    switch (action.type) {
        case SET_FIELD_GRUPO_SELECTED:
            const newState = { ...state }; // Object.assign({}, state)
            newState[action.field] = action.value;
            return newState;
        case SET_SELECTED_GRUPO:
            return action.grupo;
        default:
            return state;
    }
}