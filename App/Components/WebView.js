import React, {
  Component, WebView, View, StyleSheet
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import Header from './Helpers/Header';

class Web extends Component {
  render() {
   /* beautify ignore:start */ 
    return (
      <View style={styles.container}>
        <Header title='Repo' />
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