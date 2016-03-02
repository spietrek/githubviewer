import React, {
  Component, WebView, View, StyleSheet
} from 'react-native';
import NavigationBar from 'react-native-navbar';

class Web extends Component {
  render() {
   /* beautify ignore:start */ 
   const titleConfig = {
      title: 'Repo',
      tintColor: '#FFF'
    };
 
    const leftButtonConfig = {
      title: '< Back',
      tintColor: '#48BBEC',      
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