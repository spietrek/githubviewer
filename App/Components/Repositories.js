import React, {
  Component, ScrollView, View, Text, TouchableHighlight, StyleSheet
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import Badge from './Badge';
import Separator from './Helpers/Separator';
import Web_View from './Helpers/WebView';

class Repositories extends Component {
  openPage(url){
    this.props.navigator.push({
     component: Web_View,
     title: 'Repo',
     passProps: {
       url: url
     }
    })
  }
  
  render() {
    /* beautify ignore:start */ 
    let userInfo = this.props.userInfo;
    let repos = this.props.repos;
    let list = repos.map((item, index) => {
      let desc = repos[index].description ? <Text style={styles.description} numberOfLines={1}> {repos[index].description} </Text> : <View />;
      return (
        <View key={index}>
          <View style={styles.rowContainer}>
            <TouchableHighlight
              onPress={this.openPage.bind(this, repos[index].html_url)}
              underlayColor='transparent'>
              <Text style={styles.name}> {repos[index].name} </Text>
            </TouchableHighlight>
            <Text style={styles.stars}> Stars: {repos[index].stargazers_count} </Text>
            {desc}
          </View>
          <Separator />
        </View>
      )
    });
    
    const titleConfig = {
      title: 'Repos',
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

Repositories.propTypes = {
  userInfo: React.PropTypes.object.isRequired,
  repos: React.PropTypes.array.isRequired
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollContainer: {
    flex: 1
  },
  rowContainer: {
    flexDirection: 'column',
    flex: 1,
    padding: 10
  },
  name: {
    color: '#48BBEC',
    fontSize: 18,
    paddingBottom: 5
  },
  stars: {
    color: '#48BBEC',
    fontSize: 14,
    paddingBottom: 5
  },
  description: {
    fontSize: 14,
    paddingBottom: 5
  }
});

module.exports = Repositories;