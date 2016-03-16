import React, {
  Component, TouchableOpacity, Image, StyleSheet
} from 'react-native';

class SearchIcon extends Component {
  render() {
    /* beautify ignore:start */ 
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Image
          source={require('../../Images/search-20.png')}
          style={{ tintColor:'#48BBEC', width: 20, height: 20, marginRight: 15 }}/>
      </TouchableOpacity>
    );
    /* beautify ignore:end */
  }
};

const styles = StyleSheet.create({
  container: {
    marginTop: 0
  }
});

module.exports = SearchIcon;