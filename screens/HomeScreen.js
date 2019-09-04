import React from 'react';
import { StyleSheet, Text, View,ScrollView } from 'react-native';
import { Appbar,Button,List } from 'react-native-paper';
import GetCategory from './GetCategory'
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Kategoriyalar Ro'yhati",
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    }};

  render() {
    return (
      <View>
      <ScrollView>
     <GetCategory navigation={this.props.navigation} />
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
