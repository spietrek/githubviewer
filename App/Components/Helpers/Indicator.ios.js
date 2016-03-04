import React, {
  Component, View
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

class Indicator extends Component {
  render() {
    /* beautify ignore:start */ 
    return (
      <Spinner size='large' visible={this.props.isLoading} />
    )
    /* beautify ignore:end */
  }
};

Indicator.propTypes = {
  isLoading: React.PropTypes.bool.isRequired
}

module.exports = Indicator;
