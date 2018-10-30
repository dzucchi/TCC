import { combineReducers } from "redux";

import userReducer from './userReducer';
import jogadorReducer from './jogadorReducer';
import gruposReducer from "./gruposReducer";

export default combineReducers({
    user: userReducer,
    jogador: jogadorReducer,
    grupos: gruposReducer,
});