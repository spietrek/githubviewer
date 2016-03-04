import React, {
  Component, Text, View, StyleSheet, Image, TouchableHighlight
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import Profile from './Profile';
import Repositories from './Repositories';
import Notes from './Notes';
import Api from '../Utils/Api';
import Header from './Helpers/Header';
import Badge from './Badge';

class Dashboard extends Component {
  makeBackground(btn) {
    let obj = {
      flexDirection: 'row',
      justifyContent: 'center',
      flex: 1,
      height: 125,
      width: 125,
      borderRadius: 65,
      marginTop: 5,
      marginBottom: 5,
      alignSelf: 'center'
    }

    if (btn === 0) {
      obj.backgroundColor = '#43bbef';
    } else if (btn === 1) {
      obj.backgroundColor = '#ff5c33';
    } else if (btn === 2) {
      obj.backgroundColor = '#758BF4';
    }

    return obj;
  }

  gotoProfile() {
    this.props.navigator.push({
      title: 'Profile',
      component: Profile,
      passProps: {
        userInfo: this.props.userInfo
      }
    })
  };

  gotoRepos() {
    Api.getRepos(this.props.userInfo.login)
      .then((res) => {
        this.props.navigator.push({
          title: 'Repos',
          component: Repositories,
          passProps: {
            userInfo: this.props.userInfo,
            repos: res
          }
        });
      });
  };

  gotoNotes() {
    Api.getNotes(this.props.userInfo.login)
      .then((res) => {
        res = res || {};
        this.props.navigator.push({
          title: 'Notes',
          component: Notes,
          passProps: {
            notes: res,
            userInfo: this.props.userInfo
          }
        });
      });
  };
  
  render() {
    /* beautify ignore:start */
    return (
      <View style={styles.container}>
        <Header title={this.props.userInfo.name} />
        <View style={styles.viewContainer}>
          <Badge userInfo={this.props.userInfo}/>
          <TouchableHighlight
            onPress={this.gotoProfile.bind(this)}
            style={this.makeBackground(0)}
            underlayColor='#14aaeb'>
            <Text style={styles.buttonText}>
              Profile
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={this.gotoRepos.bind(this)}
            style={this.makeBackground(1)}
            underlayColor='#e62e00'>
            <Text style={styles.buttonText}>
              Repos
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={this.gotoNotes.bind(this)}
            style={this.makeBackground(2)}
            underlayColor='#425ff0'>
            <Text style={styles.buttonText}>
              Notes
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
    /* beautify ignore:end */
  }
}

Dashboard.propTypes = {
  userInfo: React.PropTypes.object.isRequired
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333'
  }, 
  viewContainer: {
    flex: 1,
    marginTop: 60,
    backgroundColor: '#333333'
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  },
  title: {
    color: 'black',
    fontSize: 30
  }
});

module.exports = Dashboard;
