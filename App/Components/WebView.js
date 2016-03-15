import React, {
  Component, WebView, View, StyleSheet
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import Header from './Helpers/Header';

class Web extends Component {
  render() {
    /* beautify ignore:start */
    const titleConfig = {
      title: 'Profile',
      tintColor: '#FFF'
    };

    const leftButtonConfig = {
      title: '< Repos',
      tintColor: '#48BBEC',
      style: {
        marginTop: 5
      },
      handler: () => this.props.navigator.pop(),
    };

    const statusBarConfig = {
      hidden: false,
      showAnimation: 'fade',
      hideAnimation: 'fade',
      style: 'light-content'
    };
        
    return (
      <View style={styles.container}>
        <Header title='Repo' />
        <NavigationBar
          tintColor='#444444'
          title={titleConfig}
          leftButton={leftButtonConfig}
          statusBar={statusBarConfig}
         />            
        <View style={styles.viewContainer}>
          <WebView source={{uri: this.props.url}}/>
        </View>
      </View>
    )
   /* beautify ignore:end */
  }
};

Web.propTypes = {
 url: React.PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  viewContainer: {
    flex: 1,
    backgroundColor: '#F6F6EF',
    flexDirection: 'column',
  }
});

module.exports = Web;