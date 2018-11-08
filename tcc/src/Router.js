import React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
  getActiveChildNavigationOptions,
} from 'react-navigation';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Login
import LoginPage from "./pages/LoginPage";

// Perfil
import PerfilFutebol from "./pages/perfil/PerfilFutebol";
import PerfilBasquete from "./pages/perfil/PerfilBasquete";
import PerfilVolei from "./pages/perfil/PerfilVolei";

// Perfil-Form
import PerfilFutebolForm from "./pages/perfil/PerfilFutebolForm";

// Grupo-Form
import GrupoTabNav from "./pages/grupo/GrupoTabNav";

// Jogo
import Jogo from "./pages/jogo/Jogo";
import JogoNovaPartida from "./pages/jogo/JogoNovaPartida";
import Financeiro from "./pages/jogo/Financeiro";
import Historico from "./pages/jogo/Historico";

// Pesquisa
import Pesquisa from './pages/pesquisa/Pesquisa';
import Mapa from './pages/pesquisa/Mapa';

// PERFIL
const PerfilTabNav = createMaterialTopTabNavigator({
	PerfilFutebol: {
		screen: PerfilFutebol,
		navigationOptions: {
			tabBarLabel: 'Perfil',
		}
	},
	PerfilBasquete: {
		screen: PerfilBasquete,
		navigationOptions: {
			tabBarLabel: 'Basquete',
		}
	},
	PerfilVolei: {
		screen: PerfilVolei,
		navigationOptions: {
			tabBarLabel: 'Vôlei',
		}
	}
});

// JOGO
const JogoTabNav = createMaterialTopTabNavigator({
	Jogo : {
		screen: Jogo,
		navigationOptions: ({ navigation }) => {
			if (navigation.state.params && navigation.state.params.grupo) {
				return {
					title: navigation.state.params.grupo.nome,
					tabBarLabel: 'Jogo',
				} 
			}
			return {
				title: 'Jogo',
				tabBarLabel: 'Jogo',
			}
      	},
	},
	Financeiro: {
		screen: Financeiro,
		navigationOptions: {
			title: 'Financeiro',
			tabBarLabel: 'Financeiro',
		}
	},
	Historico: {
		screen: Historico,
		navigationOptions: {
			title: 'Histórico',
			tabBarLabel: 'Histórico',
		}
	},
});

// PESQUISAR
const PesquisaTabNav = createMaterialTopTabNavigator({
	Mapa: {
		screen: Mapa,
		navigationOptions: {
			title: 'Mapa',
			tabBarLabel: 'Mapa',
		}
	},
	Pesquisa: {
		screen: Pesquisa,
		navigationOptions: {
			title: 'Pesquisa',
			tabBarLabel: 'Pesquisa',
		}
	},
});

const TabNav = createBottomTabNavigator({
    PerfilTab: {
		screen: PerfilTabNav,
      	navigationOptions: {
			title: 'Perfil',
			tabBarLabel: 'Perfil',
			tabBarIcon: ({ tintColor }) => (
				<Icon
					name='account-circle'
					size={26}
					style={{ color: tintColor }}
				/>
			),
      	},
    },
    JogoTab: {
      	screen: JogoTabNav,
      	navigationOptions: ({ navigation }) => {
			const { params } = navigation.state.routes[navigation.state.index];
			let nomeGrupo = 'Jogo';
			if (params && params.grupo) {
				nomeGrupo = params.grupo.nome;
			}
			return {
				title: nomeGrupo,
				tabBarLabel: 'Jogo',
				tabBarIcon: ({ tintColor }) => (
					<Icon
						name='soccer-field'
						size={26}
						style={{ color: tintColor }}
					/>
				),
			}
      	},
	},
	PesquisaTab: {
		screen: PesquisaTabNav,
		navigationOptions: {
			title: 'Pesquisar',
			tabBarLabel: 'Pesquisar',
		  	tabBarIcon: ({ tintColor }) => (
				<Icon
					name='google-maps'
					size={26}
					style={{ color: tintColor }}
				/>
		  	),
		},
	},
}, {
	tabBarPosition: 'bottom',
	animationEnabled: false,
	swipeEnabled: false,
});



TabNav.navigationOptions = ({ navigation, screenProps }) => {
	const childOptions = getActiveChildNavigationOptions(navigation, screenProps);
	return {
		title: childOptions.title,
	};
};

export default StacksOverTabs = createStackNavigator({
	Login: {
		screen: LoginPage,
		navigationOptions: {
			title: 'Kevin',
		}
	},
	Main: {
		screen: TabNav
	},
	PerfilFutebolForm: {
		screen: PerfilFutebolForm,
		navigationOptions: {
			title: 'Perfil',
		},
	},
	GrupoForm: {
		screen: GrupoTabNav
	},
	JogoNovaPartida: {
		screen: JogoNovaPartida
	}
}, {
	navigationOptions: {
		title: 'Kevin',
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