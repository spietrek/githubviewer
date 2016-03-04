import React, {
  Component, View, Text, StyleSheet
} from 'react-native';

class Header extends Component {
  render() {
    /* beautify ignore:start */ 
    return (
      <View style={styles.container}>
      </View> 
    )
    /* beautify ignore:end */
  }
};

Header.propTypes = {
  title: React.PropTypes.string.isRequired
}

const styles = StyleSheet.create({
  container: {
    marginTop: 0
  }
});

module.exports = Header;
