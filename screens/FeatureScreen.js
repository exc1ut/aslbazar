import React from 'react';
import { StyleSheet, Text, View,Button,ScrollView } from 'react-native';
import { Appbar } from 'react-native-paper';
import GetFeatureCat from './GetFeatureCat'

export default class FeatureScreen extends React.Component {
  static navigationOptions = {
    title: 'Asosiy',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
    
  render() {
    const { navigation } = this.props;
    const name = navigation.getParam('name', 'NO-ID');
    return (
      <View>
        <ScrollView>
     <GetFeatureCat navigation={this.props.navigation} />
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
