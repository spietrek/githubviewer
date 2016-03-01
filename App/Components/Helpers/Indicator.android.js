import React, {
  Component, View, ProgressBarAndroid
} from 'react-native';

class Indicator extends Component {
  render() {
    /* beautify ignore:start */ 
   return (
     <ProgressBarAndroid animating={this.props.isLoading} styleAttr='Horizontal'/>
    )
   /* beautify ignore:end */
  }
};

Indicator.propTypes = {
  isLoading: React.PropTypes.bool.isRequired
}

module.exports = Indicator;
