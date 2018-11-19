import { combineReducers } from "redux";

import userReducer from './userReducer';
import jogadorReducer from './jogadorReducer';
import gruposReducer from "./gruposReducer";
import grupoFormReducer from "./grupoFormReducer";
import grupoSelectedReducer from "./grupoSelectedReducer";
import partidaReducer from "./partidaReducer";
import jogadoresFromSeletedGrupoReducer from "./jogadoresFromSeletedGrupoReducer";
import jogadoresConfirmadosReducer from "./jogadoresConfirmadosReducer";
import jogadoresDisponiveisTimeReducer from "./jogadoresDisponiveisTimeReducer";
import timesReducer from "./timesReducer";
import partidasReducer from "./partidasReducer";

export default combineReducers({
    user: userReducer,
    jogador: jogadorReducer,
    grupos: gruposReducer,
    grupoForm: grupoFormReducer,
    grupoSelected: grupoSelectedReducer,
    partida: partidaReducer,
    jogadoresFromSeletedGrupo: jogadoresFromSeletedGrupoReducer,
    jogadoresConfirmados: jogadoresConfirmadosReducer,
    jogadoresDisponiveisTime: jogadoresDisponiveisTimeReducer,
    times: timesReducer,
    partidas: partidasReducer,
});