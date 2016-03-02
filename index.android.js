'use strict';

import React, {
  AppRegistry, Component, StyleSheet, Navigator, View, BackAndroid
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import Main from './App/Components/Main';

var _navigator;

BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator.getCurrentRoutes().length === 1  ) {
     return false;
  }
  _navigator.pop();
  return true;
});

function renderScene(route, navigator) {
  _navigator = navigator;
  return <route.component {...route.passProps} route={route} navigator={navigator} />;
}

class GitHub extends Component {
  render() {
    /* beautify ignore:start */
    const initialRoute = {
      component: Main
    };

    return (
      <View style={styles.container}>
        <Navigator
          initialRoute={initialRoute}
          renderScene={renderScene}/>
      </View>
    );
    /* beautify ignore:end */
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

AppRegistry.registerComponent('GitHub', () => GitHub);
