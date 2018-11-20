import { SET_SEARCHED_GRUPO } from "../actions";

export default function (state = null, action) {
    switch (action.type) {
        case SET_SEARCHED_GRUPO:
            return action.grupo;
        default:
            return state;
    }
}