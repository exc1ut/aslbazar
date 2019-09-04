import React from 'react';
import { StyleSheet, Text, View,ScrollView } from 'react-native';
import { Appbar,Button,List } from 'react-native-paper';
import GetCategory from './GetCategory'
export default class Subcat extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Subcat',
  };
  state = {
    categories:[]
  }
  componentDidMount(){
        this.loadcategory();
    }
  loadcategory(){
        fetch(`https://aslbazar.com/api/v1/getnestedcategories`).then(res => res.json()).then(json => {
     
        this.setState({
          categories:json.categories
        });
        
      })
        }

  render() {
  //   const { navigation } = this.props;
  //   const id = navigation.getParam('id', 'NO-ID');
  //   const name = navigation.getParam('name', 'NO-ID');
  //   const {categories} = this.state;
  //   const cats = categories.map((category)=>{
  //     if(id == category.id){
  //       const subcats = category.children.map((subcategory)=>{
  //         <List.Item
  //   title={subcategory.name}
  //   key={subcategory.id}
  //   left={props => <List.Icon {...props} icon="mail" />}
  // />
  //       })
  //     }
  //   }
    return 
      <View>
            <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => this.props.navigation.toggleDrawer()} />
        <Appbar.Content
          title={name}
          subtitle="Aslbazar"
        />
        <Appbar.Action icon="search" onPress={this._onSearch} />
        <Appbar.Action icon="more-vert" onPress={this._onMore} />
              </Appbar.Header>
      <ScrollView>
            <View>
              {cats}
            </View>
      </ScrollView>
      </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
