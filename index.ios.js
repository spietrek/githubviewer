'use strict';

import React, {
  AppRegistry, Component, StyleSheet, Navigator, View
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import Main from './App/Components/Main';

function renderScene(route, navigator) {
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

  //  return (
  //     <NavigatorIOS
  //       barTintColor='#333333'
  //       tintColor='#48BBEC'
  //       titleTextColor='#FFF'
  //       style={styles.container}
  //       initialRoute={{
  //         title: 'github viewer',
  //         component: Main
  //       }}
  //     />
  //   );

