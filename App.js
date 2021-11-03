import React from 'react';
import { StyleSheet, Text, View, LogBox } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Provider, connect } from 'react-redux';
import { persistStore, purgeStoredState } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import IntroduceScreen from './screens/IntroduceScreen';
import MainScreen from './screens/MainScreen';
import MapScreen from './screens/MapScreen';
import SettingsScreen from './screens/SettingsScreen';
import MakingScreen from './screens/MakingScreen';
import SoundScreen from  './screens/SoundScreen';
import store from './store';
import actions from './actions';

const persistor = persistStore(store); //store

class AppRouteOfRoute extends React.Component {
  render() {
    const SecondRouteSet = createStackNavigator({
      MainRoute: MainScreen,
      Map: MapScreen,
      Making: MakingScreen,
      Setting: SettingsScreen,
    }, {
      initialRouteName: 'MainRoute',
    });

    const FirstRouteSet = createStackNavigator({
      Introduce: IntroduceScreen,
      Main: createAppContainer(SecondRouteSet),
    }, {
      initialRouteName: this.props.toggle_introduction_screen ? 'Introduce' : 'Main',
      headerMode: 'none',
    });

    const AppRoute = createAppContainer(FirstRouteSet);

    return (
      <AppRoute/>
    );
  }
}

function mapStateToProps(state) {
  return state.userSetting.updateGlobalSetting;
}

const Temp = connect(mapStateToProps, actions)(AppRouteOfRoute);

export default class App extends React.Component {
  render() {
    LogBox.ignoreLogs(['Warning: ...']);
    // console.log(`\n\n\n\n\n\n\n\n\n\n${JSON.stringify(store,null,4)}\n\n\n\n\n\n\n\n\n\n\n`)
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Temp/>
        </PersistGate>
      </Provider>
    );
  }
}
