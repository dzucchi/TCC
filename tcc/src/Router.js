import React from "react";

import { 
	createStackNavigator, 
	createMaterialTopTabNavigator,
	getActiveChildNavigationOptions
} from "react-navigation";

import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import LoginPage from './pages/LoginPage'

import FutebolPerfilDetail from './pages/perfil/FutebolPerfilDetail'
import FutebolPerfilForm from './pages/perfil/FutebolPerfilForm'
import BasquetePerfil from './pages/perfil/BasquetePerfil'
import VoleiPerfil from './pages/perfil/VoleiPerfil'

import JogosJogo from './pages/jogo/JogosJogo'
import FinanceiroJogo from './pages/jogo/FinanceiroJogo'
import HistoricoJogo from './pages/jogo/HistoricoJogo'

import MapaPesquisa from './pages/pesquisa/MapaPesquisa'
import BuscarPesquisa from './pages/pesquisa/BuscarPesquisa'

const PerfilMatTab = createMaterialTopTabNavigator({
	Futebol: FutebolPerfilDetail,
	Basquete: BasquetePerfil,
	Volei: VoleiPerfil
});

const JogoMatTab = createMaterialTopTabNavigator({
	Jogos: JogosJogo,
	Financeiro: FinanceiroJogo,
	Historico: HistoricoJogo
});

const PesquisaMatTab = createMaterialTopTabNavigator({
	Mapa: MapaPesquisa,
	Buscar: BuscarPesquisa,
});

const TabNav = createMaterialBottomTabNavigator({
	Perfil: {
		screen: PerfilMatTab,
		navigationOptions: {
			tabBarIcon: ({ tintColor }) => (
				<Icon name='account-circle' color={tintColor} size={26} />
			)
		}
	},
	Jogo: {
		screen: JogoMatTab,
		navigationOptions: {
			tabBarIcon: ({ tintColor }) => (
				<Icon name='soccer-field' color={tintColor} size={26} />
			)
		}
	},
	Pesquisar: {
		screen: PesquisaMatTab,	
		navigationOptions: {
			tabBarIcon: ({ tintColor }) => (
				<Icon name='google-maps' color={tintColor} size={26} />
			),
		}
	},
},{
	shifting: true,
    barStyle: {
	  height: 55,
	  backgroundColor: '#3868f7',
    }
});

TabNav.navigationOptions = ({ navigation, screenProps }) => {
	const childOptions = getActiveChildNavigationOptions(navigation, screenProps);
	return {
		title: childOptions.title,
	};
};

export default createStackNavigator({
	'Login': {
		screen: LoginPage,
		navigationOptions: {
			title: 'Kevin',
		}
	},
	'Main' : TabNav,
	'FutebolPerfilForm' : {
		screen: FutebolPerfilForm,
		navigationOptions: {
			title: 'Perfil',
		}
	},
}, {
	navigationOptions: {
		title: 'Séries!',
		headerTintColor: 'white',
		headerStyle: {
			backgroundColor: '#006dcc',
			borderBottomWidth: 1,
			borderBottomColor: '#C5C5C5'
		},
		headerTitleStyle: {
			color: 'white',
			fontSize: 30,
		}
	}
});