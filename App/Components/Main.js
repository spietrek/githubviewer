import React, {
  Component, Text, View, StyleSheet, TextInput, TouchableHighlight, ActivityIndicatorIOS, StatusBar
} from 'react-native';
import Api from '../Utils/Api';
import Dashboard from './Dashboard';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      isLoading: false,
      error: false
    }
  }

  handleChange(event) {
    this.setState({
      username: event.nativeEvent.text
    });
  }

  handleSubmit(event) {
    this.setState({
      isLoading: true
    });
    Api.getBio(this.state.username).then((res) => {
      if (res.message === 'Not Found') {
        this.setState({
          error: 'User not found',
          isLoading: false
        })
      } else {
        this.props.navigator.push({
          title: res.name || 'Select an Option',
          component: Dashboard,
          passProps: {
            userInfo: res
          }
        });
        this.setState({
          isLoading: false,
          error: false,
          username: ''
        })
      }
    })
  }

  input() {
    /* beautify ignore:start */
    return(
      <TextInput
          style={styles.searchInput}
          value={this.state.username}
          autoCapitalize='none'
          onChange={this.handleChange.bind(this)}
      />
    )
    /* beautify ignore:end */
  }

  render() {
    /* beautify ignore:start */
    let showErr = (this.state.error
      ? <Text style={styles.error}>{this.state.error}</Text>
      : <View></View>)
    return (
      <View style={styles.mainContainer}>
        <StatusBar barStyle='light-content'/>
        <Text style={styles.title}>
          Search for a GitHub User
        </Text>
        {this.input()}
        <TouchableHighlight style={styles.button} onPress={this.handleSubmit.bind(this)} underlayColor='white'>
          <Text style={styles.buttonText}>
            SEARCH
          </Text>
        </TouchableHighlight>
        <ActivityIndicatorIOS animating={this.state.isLoading} color='#FFF' size="large"/>
        {showErr}
      </View>
    )
    /* beautify ignore:end */
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#404040'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff'
  },
  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  error: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center'
  }
});

module.exports = Main;
