import { createMaterialTopTabNavigator } from 'react-navigation';

import GrupoBasquete from "./GrupoBasquete";
import GrupoFutebol from "./GrupoFutebol";
import GrupoVolei from "./GrupoVolei";

export default createMaterialTopTabNavigator({
	GrupoFutebol: {
		screen: GrupoFutebol,
		navigationOptions: {
			tabBarLabel: 'Futebol',
		}
	},
	GrupoBasquete: {
		screen: GrupoBasquete,
		navigationOptions: {
			tabBarLabel: 'Basquete',
		}
	},
	GrupoVolei: {
		screen: GrupoVolei,
		navigationOptions: {
			tabBarLabel: 'Vôlei',
		}
	}
});