import React, {
  Component, Text, View, StyleSheet, Image, TouchableHighlight
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import Profile from './Profile';
import Repositories from './Repositories';
import Notes from './Notes';
import Api from '../Utils/Api';

class Dashboard extends Component {
  makeBackground(btn) {
    let obj = {
      flexDirection: 'row',
      alignSelf: 'stretch',
      justifyContent: 'center',
      flex: 1
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
          component: Notes,
          title: 'Notes',
          passProps: {
            notes: res,
            userInfo: this.props.userInfo
          }
        });
      });
  };
  
  render() {
    /* beautify ignore:start */
    const titleConfig = {
      title: this.props.userInfo.name || 'Select an Option',
      tintColor: '#FFF'
    };
 
    const leftButtonConfig = {
      title: '< Back',
      tintColor: '#48BBEC',
      handler: () => this.props.navigator.pop(),
    };

    const statusBarConfig = {
      hidden: false,
      showAnimation: 'fade',
      hideAnimation: 'fade',
      style: 'light-content'
    };
    
    return (
      <View style={styles.container}>
        <NavigationBar
          tintColor='#444444'
          title={titleConfig}
          leftButton={leftButtonConfig}
          statusBar={statusBarConfig}
        />
        <View style={styles.viewContainer}>
          <Image
            source={{uri: this.props.userInfo.avatar_url}}
            style={styles.image}
          />
          <TouchableHighlight
            onPress={this.gotoProfile.bind(this)}
            style={this.makeBackground(0)}
            underlayColor='#14aaeb'>
            <Text style={styles.buttonText}>
              View Profile
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={this.gotoRepos.bind(this)}
            style={this.makeBackground(1)}
            underlayColor='#e62e00'>
            <Text style={styles.buttonText}>
              View Repos
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={this.gotoNotes.bind(this)}
            style={this.makeBackground(2)}
            underlayColor='#425ff0'>
            <Text style={styles.buttonText}>
              View Notes
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
    backgroundColor: '#333333'
  },
  image: {
    height: 350
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
