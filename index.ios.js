'use strict';

import React, {
  AppRegistry, Component, StyleSheet, Navigator, View, StatusBarIOS
} from 'react-native';
import Main from './App/Components/Main';
import Search from './App/Components/Search';

function renderScene(route, navigator) {
  return <route.component {...route.passProps} route={route} navigator={navigator} />;
}

class GitHub extends Component {
  render() {
    /* beautify ignore:start */
    const initialRoute = {
      component: Main
    };
    
    /*StatusBarIOS.setStyle('light-content');*/

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
