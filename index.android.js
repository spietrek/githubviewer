import React, {
  AppRegistry, Component, StyleSheet, Navigator, View, BackAndroid
} from 'react-native';
import Main from './App/Components/Main';

let _navigator;

BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator.getCurrentRoutes().length === 1) {
    return false;
  }
  _navigator.pop();
  return true;
});

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
             _navigator = navigator;
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
