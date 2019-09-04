import React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import { Appbar } from 'react-native-paper';

export default class Settings extends React.Component {
  static navigationOptions = {
    title: 'Settings',
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
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => this.props.navigation.goBack()}
        />
        <Appbar.Content
          title= {name}
          subtitle="Subtitle"
        />
      </Appbar.Header>
      <View style={styles.container}>

        <Text>Settings</Text>
        <Button
          title="Back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
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
