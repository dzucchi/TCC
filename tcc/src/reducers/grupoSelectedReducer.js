import { SET_SELECTED_GRUPO } from "../actions";

export default function (state = null, action) {
    switch (action.type) {
        case SET_SELECTED_GRUPO:
            return action.grupo;
        default:
            return state;
    }
}