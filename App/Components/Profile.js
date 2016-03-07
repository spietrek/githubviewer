import React, {
  Component, View, Text, StyleSheet, ScrollView
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import Badge from './Badge';
import Separator from './Helpers/Separator';
import Header from './Helpers/Header';

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
    
    return (
      <View style={styles.container}>
        <Header title='Profile' />
        <ScrollView style={styles.scrollContainer}>
          <Badge userInfo={userInfo}/>
          {list}
        </ScrollView>
      </View>
    )
    /* beautify ignore:end */
  }
};

Profile.propTypes = {
  userInfo: React.PropTypes.object.isRequired
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333'
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF'
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
