'use strict';

import React, {
  AppRegistry, Component, StyleSheet, Navigator, View, StatusBarIOS
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import Main from './App/Components/Main';
import Search from './App/Components/Search';

function renderScene(route, navigator) {
  return <route.component {...route.passProps} route={route} navigator={navigator} />;
}

class GitHub extends Component {
  render() {
    /* beautify ignore:start */
    const initialRoute = {
      //title: 'GitHub Viewer',
      component: Main,
      /*rightButtonIcon: require('./App/Images/search-20.png'),
      onRightButtonPress: () => {
        this.refs.nav.push({
          title: 'Search Users',
          component: Search
        });
      }*/
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

     /*<NavigatorIOS
        ref='nav'
        barTintColor='#333333'
        tintColor='#48BBEC'
        titleTextColor='#FFF'
        backButtonTitle='Back'
        style={styles.container}
        initialRoute={initialRoute}
      />*/
 
