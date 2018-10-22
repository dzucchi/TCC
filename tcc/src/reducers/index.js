import { combineReducers } from "redux";

import userReducer from './userReducer';
import jogadorReducer from './jogadorReducer';

export default combineReducers({
    user: userReducer,
    jogador: jogadorReducer,
});