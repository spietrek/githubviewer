import React, {
  Component, ScrollView, View, Text, TextInput, ListView, TouchableHighlight, StyleSheet
} from 'react-native';
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
    console.log('delete row', rowID);
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
  
  renderRowData(rowData, secID, rowID){
    return (
      <View>
        <View style={styles.rowContainer}>
          <Text> {rowID} - {rowData} </Text>
        </View>
      </View>
    )
  }
  
  renderRowDelete(rowID, userInfo) {
    return (
      <View>
        <View style={styles.rowContainer}>
          <TouchableHighlight
            style={styles.button}
            onPress={() => this.deleteRow(rowID, userInfo)}
            underlayColor="#88D4F5">
            <Text style={styles.buttonText}> 
              Delete 
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
  
  editor(){
    return (
      <View style={styles.footerContainer}>
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
  }
  
  render(){
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData, secID, rowID) => 
            <View>
              {this.renderRowData(rowData, secID, rowID)}
              {this.renderRowDelete(rowID, this.props.userInfo)}
            </View>}
          renderHeader={() => <Badge userInfo={this.props.userInfo}/>}
          renderSeparator={(secID, rowID) => <Separator key={`${secID}-${rowID}`}/>}
        />
        {this.editor()}
      </View>
    )
  }
};

Notes.propTypes = {
  userInfo: React.PropTypes.object.isRequired,
  notes: React.PropTypes.object.isRequired
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  buttonText: {
    fontSize: 18,
    color: 'white'
  },
  button: {
    height: 60,
    backgroundColor: '#48BBEC',
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchInput: {
    height: 60,
    padding: 10,
    fontSize: 18,
    color: '#111',
    flex: 10
  },
  rowContainer: {
    padding: 10,
  },
  footerContainer: {
    backgroundColor: '#E3E3E3',
    alignItems: 'center',
    flexDirection: 'row'
  }
});

module.exports = Notes;
