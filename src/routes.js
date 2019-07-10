import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator,
  createBottomTabNavigator,
  createStackNavigator,
  createDrawerNavigator,
} from 'react-navigation';

import Icon from 'react-native-vector-icons/FontAwesome';
// import Main from '~/pages/Main';
import Modelo from '~/pages/Modelo';
import Home from '~/pages/Home/';
import Menu from './components/Menu';
import SignIn from '~/pages/signin';
import Products from '~/pages/Products';
import Product from '~/pages/Product';
import Chat from '~/pages/Chat';
import Called from '~/pages/Called';
import CalledUsers from '~/pages/CalledUsers';
import Message from '~/pages/message';
/* import Flat from '~/pages/Flat'; */


const Routes = createStackNavigator({
 /*  Flat: {
    screen: Flat,
    navigationOptions: () => ({
      header: null,
    }),
  }, */

  Home: {
    screen: createDrawerNavigator(
      {
        Home: { screen: Home },
        Message: { screen: Message },
      },
      {
        drawerWidth: 250,
        drawerType: 'slide',
        contentComponent: ({ navigation }) => <Menu navigation={navigation} />,
      },
    ),
    navigationOptions: {
      header: null,
      tabBarIcon: ({ tintColor }) => <Icon name="home" size={24} color={tintColor} />,
    },
  },

  SignIn: {
    screen: SignIn,
    navigationOptions: () => ({
      header: null,
    }),
  },

  Products: {
    screen: Products,
    navigationOptions: () => ({
      header: null,
    }),
  },

  Product: {
    screen: Product,
    navigationOptions: () => ({
      header: null,
    }),
  },

  Called: {
    screen: Called,
    navigationOptions: () => ({
      header: null,
    }),
  },

  CalledUsers: {
    screen: CalledUsers,
    navigationOptions: () => ({
      header: null,
    }),
  },

  Chat: {
    screen: Chat,
    navigationOptions: () => ({
      header: null,
    }),
  },

  Modelo: {
    screen: Modelo,
    navigationOptions: () => ({
      header: null,
    }),
  },
});

export default createAppContainer(Routes);
