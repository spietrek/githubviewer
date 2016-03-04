'use strict';

import React, {
  AppRegistry, Component, StyleSheet, NavigatorIOS, View, StatusBarIOS
} from 'react-native';
import Main from './App/Components/Main';

class GitHub extends Component {
  render() {
    /* beautify ignore:start */
    const initialRoute = {
      title: 'GitHub Viewer',
      component: Main
    };
    
    StatusBarIOS.setStyle('light-content');

    return (
      <NavigatorIOS
        barTintColor='#333333'
        tintColor='#48BBEC'
        titleTextColor='#FFF'
        backButtonTitle='Back'
        style={styles.container}
        initialRoute={initialRoute}
      />
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
