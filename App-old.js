import { createAppContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import homeScreen from './app/screens/homeScreen';
import searchScreen from './app/screens/searchScreen';

const RootStack = createBottomTabNavigator({
  Home: {
    screen: homeScreen,

    navigationOptions: () => ({
      headerShown: false,
    }),
  },
  Search: {
    screen: searchScreen,
  },
});

const App = createAppContainer(RootStack);

export default App;