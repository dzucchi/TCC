import { createStackNavigator, createBottomTabNavigator, createMaterialTopTabNavigator } from "react-navigation";

import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import Icon from "react-native-vector-icons/Ionicons";

import LoginPage from './pages/LoginPage'

import FutebolPerfil from './pages/perfil/FutebolPerfil'
import BasquetePerfil from './pages/perfil/BasquetePerfil'
import VoleiPerfil from './pages/perfil/VoleiPerfil'

import JogosJogo from './pages/jogo/JogosJogo'
import FinanceiroJogo from './pages/jogo/FinanceiroJogo'
import HistoricoJogo from './pages/jogo/HistoricoJogo'

import MapaPesquisa from './pages/pesquisa/MapaPesquisa'
import BuscarPesquisa from './pages/pesquisa/BuscarPesquisa'

const PerfilMatTab = createMaterialTopTabNavigator({
	Futebol: FutebolPerfil,
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
			tabBarLabel: ({ tintColor }) => (
				<Icon name='ios-home' color={tintColor} size={24}/>
			)
		}
	},
	Jogo: JogoMatTab,
	Pesquisar: PesquisaMatTab,
},{
	tabBarOptions: {
		showIcon: true
	}
});

export default createStackNavigator({
	'Login': {
		screen: LoginPage,
		navigationOptions: {
			title: 'Kevin',
		}
	},
	'Main' : TabNav
}, {
	navigationOptions: {
		title: 'Séries!',
		headerTintColor: 'white',
		headerStyle: {
			backgroundColor: '#6ca2f7',
			borderBottomWidth: 1,
			borderBottomColor: '#C5C5C5'
		},
		headerTitleStyle: {
			color: 'white',
			fontSize: 30,
		}
	}
});