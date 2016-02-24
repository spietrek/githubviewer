import React, {
  Component, View, StyleSheet
} from 'react-native';

class Seperator extends Component {
  render() {
   /* beautify ignore:start */ 
   return (
       <View style={styles.separator}>
      </View>
    )
   /* beautify ignore:end */
  }
};

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: '#E4E4E4',
    flex: 1,
    marginLeft: 15,
    marginRight: 15
  }
});

module.exports = Seperator;
