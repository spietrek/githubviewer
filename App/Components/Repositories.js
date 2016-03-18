import React, {
  Component, ScrollView, View, Text, TouchableHighlight, StyleSheet, Platform
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import Badge from './Badge';
import Separator from './Helpers/Separator';
import WebViewer from './WebViewer';
import Header from './Helpers/Header';

class Repositories extends Component {
  openPage(url) {
    this.props.navigator.push({
      component: WebViewer,
      passProps: {
        url
      }
    });
  }

  render() {
    /* beautify ignore:start */
    const userInfo = this.props.userInfo;
    const repos = this.props.repos;
    const list = repos.map((item, index) => {
      const desc = repos[index].description ?
        <Text
          numberOfLines={1}
          style={styles.description}
        >
          {repos[index].description}
        </Text> : <View />;
      return (
        <View key={index}>
          <View style={styles.rowContainer}>
            <TouchableHighlight
              onPress={this.openPage.bind(this, repos[index].html_url)}
              underlayColor='transparent'
            >
              <Text style={styles.name}> {repos[index].name} </Text>
            </TouchableHighlight>
            <Text style={styles.stars}> Stars: {repos[index].stargazers_count} </Text>
            {desc}
          </View>
          <Separator />
        </View>
      );
    });

    const titleConfig = {
      title: 'Repos',
      tintColor: '#FFF'
    };

    const leftButtonConfig = {
      title: `< ${this.props.userInfo.login}`,
      tintColor: '#48BBEC',
      handler: () => this.props.navigator.pop(),
    };

    const statusBarConfig = {
      hidden: false,
      showAnimation: 'fade',
      hideAnimation: 'fade',
      style: 'light-content'
    };

    const header = Platform.OS === 'android' ? <Header title='Repos' /> :
      <NavigationBar
        leftButton={leftButtonConfig}
        statusBar={statusBarConfig}
        tintColor='#444444'
        title={titleConfig}
      />;

    return (
      <View style={styles.container}>
        {header}
        <ScrollView style={styles.scrollContainer}>
          <Badge userInfo={userInfo}/>
          {list}
        </ScrollView>
      </View>
    );
    /* beautify ignore:end */
  }
}

Repositories.propTypes = {
  navigator: React.PropTypes.object.isRequired,
  repos: React.PropTypes.array.isRequired,
  userInfo: React.PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
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
