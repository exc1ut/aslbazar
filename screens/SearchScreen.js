import React from 'react';
import { StyleSheet, Text, View,ScrollView } from 'react-native';
import { Appbar,Button,List,TextInput } from 'react-native-paper';
import GetCategory from './GetCategory'
export default class SearchScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Search',
  };
  state = {
    text:'',
  }

  render() {
    return (
      <View>
      <Appbar.Header style={{backgroundColor:'orange'}}>
        <Appbar.Action icon="menu" onPress={() => this.props.navigation.toggleDrawer()} />
        <Appbar.Content
          title="Search"
          subtitle="Aslbazar"
        />
      </Appbar.Header>
      <ScrollView>
      <TextInput
        label='Search'
        value={this.state.text}
        onChangeText={text => this.setState({ text })}
      />
      </ScrollView>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
