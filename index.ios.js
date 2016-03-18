'use strict';

import React, {
  AppRegistry, Component, StyleSheet, Navigator, View
} from 'react-native';
import Main from './App/Components/Main';

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
           renderScene={(route, navigator) => {
             return (
              <route.component navigator={navigator}
                route={route}
                {...route.passProps}
              />
            );
           }}
         />
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
