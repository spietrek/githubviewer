import React, {
  Component, ScrollView, View, Text, TouchableHighlight, StyleSheet, Image
} from 'react-native';
import SearchBar from 'react-native-search-bar';
import Api from '../Utils/Api';
import Separator from './Helpers/Separator';
import Dashboard from './Dashboard';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      searchText: '',
      error: false
    }
  }
  
  handleChange(search) {
    this.setState({
      users: []
    })
    if (search.length > 3) {
      Api.getSearchUsers(search)
        .then((data) => {
          this.setState({
            users: data.items
          })
        })
        .catch((error) => {
          console.log('Search request failed', error);
          this.setState({
            error,
            users: []
          })
        });
    }
 }
 
 openUser(userInfo){
    Api.getBio(userInfo.login).then((res) => {
      this.props.navigator.push({
        title: res.name || res.login,
        component: Dashboard,
        passProps: {
          userInfo: res
        }
      });
    })   
  }
  
  render() {
    /* beautify ignore:start */ 
    let users = this.state.users;
    let list = [];
    if (users) {
      list = users.map((item, index) => {
        return (
          <View key={index}>
            <TouchableHighlight
              onPress={this.openUser.bind(this, item)}
              underlayColor='transparent'>
              <View style={styles.rowContainer}>
                <Image style={styles.image} source={{ uri: item.avatar_url }}/>
                <Text style={styles.name}> {item.login} </Text>
              </View>
            </TouchableHighlight>
            <Separator />
          </View>
        )
      });
    }

    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer} keyboardDismissMode='on-drag'>
          <SearchBar
            ref='searchBar'
            placeholder='Search'
            onSearchButtonPress={this.handleChange.bind(this)}
          />
          {list}
        </ScrollView>
      </View>
    )
    /* beautify ignore:end */
  }
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
    flexDirection: 'row',
    flex: 1,
    padding: 10
  },
  name: {
    color: '#48BBEC',
    fontSize: 18,
    paddingTop: 3
  },
  image: {
    height: 30,
    width: 30,
    borderRadius: 4
  }
});

module.exports = Search;
