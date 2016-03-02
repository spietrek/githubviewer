import React, {
  Component, ScrollView, View, Text, ActionSheetIOS, TextInput, ListView, TouchableHighlight, StyleSheet
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import Badge from './Badge';
import Separator from './Helpers/Separator';
import Api from '../Utils/Api';

class Notes extends React.Component{
  constructor(props){
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.notes),
      note: '',
      error: ''
    }
  }
  
  handleChange(e){
    this.setState({
      note: e.nativeEvent.text
    })
  }
  
  handleSubmit(){
    let note = this.state.note;
    if (note === '') return;
    this.setState({
      note: ''
    });
    Api.addNote(this.props.userInfo.login, note)
      .then((data) => {
        Api.getNotes(this.props.userInfo.login)
          .then((data) => {
            this.setState({
              dataSource: this.ds.cloneWithRows(data)
            })
          });
      })
      .catch((error) => {
        console.log('Post request failed', error);
        this.setState({error})
      });
  }
  
  deleteRow(rowID, userInfo) {
    const BUTTONS = [
      'Delete Note',
      'Cancel',
    ];
    const DESTRUCTIVE_INDEX = 0;
    const CANCEL_INDEX = 1;
    ActionSheetIOS.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: CANCEL_INDEX,
      destructiveButtonIndex: DESTRUCTIVE_INDEX
    },
    (buttonIndex) => {
      if (buttonIndex === 0) {
        Api.deleteNote(userInfo.login, rowID)
          .then((data) => {
            Api.getNotes(userInfo.login)
              .then((data) => {
                this.setState({
                  dataSource: this.ds.cloneWithRows(data)
                })
              });
          })
          .catch((error) => {
            console.log('Delete request failed', error);
            this.setState({error})
          });
      }
    });
   }
  
  renderRow(rowData, secID, rowID, userInfo){
    /* beautify ignore:start */
    return (
      <View style={styles.dataContainer}>
        <Text numberOfLines={1}
          style={styles.dataText}> {rowData} </Text>
        <TouchableHighlight
          style={styles.deleteButton}
          onPress={() => this.deleteRow(rowID, userInfo)}
          underlayColor="#F2F2F2">
          <Text style={styles.redButtonText}> 
            X 
          </Text>
        </TouchableHighlight>
    </View>
    )
    /* beautify ignore:end */
  }
  
  editor(){
    /* beautify ignore:start */
    return (
      <View style={styles.editorContainer}>
        <TextInput
          style={styles.searchInput}
          value={this.state.note}
          onChange={this.handleChange.bind(this)}
          placeholder="New Note" 
        />
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this)}
          underlayColor="#88D4F5">
          <Text style={styles.buttonText}> 
            Submit 
          </Text>
        </TouchableHighlight>
      </View>
    )
    /* beautify ignore:end */
  }
  
  render(){
    /* beautify ignore:start */
    const titleConfig = {
      title: 'Profile',
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
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData, secID, rowID) => 
              <View>
                {this.renderRow(rowData, secID, rowID, this.props.userInfo)}
              </View>}
            renderHeader={() => 
              <View>
                <Badge userInfo={this.props.userInfo}/>
                {this.editor()}
              </View>
            }
            renderSeparator={(secID, rowID) => <Separator key={`${secID}-${rowID}`}/>}
          />
        </View>
      </View>
    )
    /* beautify ignore:end */
  }
};

Notes.propTypes = {
  userInfo: React.PropTypes.object.isRequired,
  notes: React.PropTypes.object.isRequired
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  viewContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  buttonText: {
    fontSize: 18,
    color: 'white'
  },
  redButtonText: {
    fontSize: 18,
    color: 'red',
    fontWeight: 'bold'
  },
  button: {
    height: 50,
    backgroundColor: '#48BBEC',
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchInput: {
    height: 50,
    padding: 10,
    fontSize: 16,
    color: '#111',
    flex: 8
  },
  rowContainer: {
    padding: 10,
  },
  editorContainer: {
    backgroundColor: '#E3E3E3',
    alignItems: 'center',
    flexDirection: 'row'
  },
  dataContainer: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  dataText: {
    margin: 10,
    fontSize: 16,
    flex: 12
  },
  deleteButton: {
    width: 25,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

module.exports = Notes;
