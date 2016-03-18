import React, {
  Component, TouchableOpacity, Image
} from 'react-native';

class SearchIcon extends Component {
  render() {
    /* beautify ignore:start */
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Image
          source={require('../../Images/search-20.png')}
          style={{ tintColor: '#48BBEC', width: 20, height: 20, marginRight: 15 }}
        />
      </TouchableOpacity>
    );
    /* beautify ignore:end */
  }
}

SearchIcon.propTypes = {
  onPress: React.PropTypes.func.isRequired
};

module.exports = SearchIcon;
