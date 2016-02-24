import React, {
  Component, WebView, View, StyleSheet
} from 'react-native';

class Web extends Component {
  render() {
   /* beautify ignore:start */ 
   return (
      <View style={styles.container}>
        <WebView source={{uri: this.props.url}}/>
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
    backgroundColor: '#F6F6EF',
    flexDirection: 'column',
  }
});

module.exports = Web;