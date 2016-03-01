import React, {
  Component, View, Text, StyleSheet, ScrollView
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import Badge from './Badge';
import Separator from './Helpers/Separator';

class Profile extends Component {
  getRowTitle(user, item) {
    item = (item === 'public_repos') ? item.replace('_', ' ') : item;
    return item[0] ? item[0].toUpperCase() + item.slice(1) : item;
  }

  render() {
    /* beautify ignore:start */
    let userInfo = this.props.userInfo;
    let topicArr = ['company', 'location', 'followers', 'following', 'email', 'bio', 'public_repos', 'blog'];
    let list = topicArr.map((item, index) => {
      if(!userInfo[item]){
        return <View key={index}/>
      } else {
        return (
          <View key={index}>
            <View style={styles.rowContainer}>
              <Text style={styles.rowTitle}> {this.getRowTitle(userInfo, item)} </Text>
              <Text style={styles.rowContent}> {userInfo[item]} </Text>
            </View>
            <Separator />
         </View>
        )
      }
    });
    
    const titleConfig = {
      title: 'Profile',
      tintColor: '#FFF'
    };
 
    const leftButtonConfig = {
      title: 'Back',
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
        <ScrollView style={styles.scrollContainer}>
          <Badge userInfo={userInfo}/>
          {list}
        </ScrollView>
      </View>
    )
    /* beautify ignore:end */
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollContainer: {
    flex: 1
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  rowContainer: {
    padding: 10
  },
  rowTitle: {
    color: '#48BBEC',
    fontSize: 16
  },
  rowContent: {
    fontSize: 19
  }
});

module.exports = Profile;