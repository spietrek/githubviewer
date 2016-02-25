'use strict';

import React, {
  AppRegistry, Component, StyleSheet, NavigatorIOS
} from 'react-native';
import Main from './App/Components/Main';

class GitHub extends Component {
  render() {
    /* beautify ignore:start */
    return (
      <NavigatorIOS
        barTintColor='#333333'
        tintColor='#48BBEC'
        titleTextColor='#FFF'
        style={styles.container}
        initialRoute={{
          title: 'GitHub Viewer',
          component: Main
        }}
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
