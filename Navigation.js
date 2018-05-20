import { createStackNavigator } from 'react-navigation';

import ResultScreen from './screens/ResultScreen';
import SearchScreen from './screens/SearchScreen';

export default createStackNavigator({
	search: SearchScreen,
	result: ResultScreen
}, { 
	navigationOptions: {
		swipeEnabled: true,
		animationEnabled: true
	}
});
