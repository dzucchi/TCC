import { createMaterialTopTabNavigator } from 'react-navigation';

import GrupoBasquete from "./GrupoBasquete";
import GrupoFutebolForm from "./GrupoFutebolForm";
import GrupoVolei from "./GrupoVolei";

export default createMaterialTopTabNavigator({
	GrupoFutebolForm: {
		screen: GrupoFutebolForm,
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