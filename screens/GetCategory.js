import React from 'react';
import { StyleSheet, Text, View,ActivityIndicator,Image} from 'react-native';
import { Appbar,Button,List } from 'react-native-paper';
import HTML from 'react-native-render-html';

export default class GetCategory extends React.Component {
  state = {
    categories:[],
    loaded:false
  }
  componentDidMount(){
        this.loadcategory();
    }
  loadcategory(){
        fetch(`https://aslbazar.com/api/v1/getnestedcategories`).then(res => res.json()).then(json => {
     
        this.setState({
          categories:json.categories,
          loaded:true
        });
        
      })
        }

  render() {
    const {navigation} = this.props;
    const {categories,loaded} = this.state;
    const cats = categories.map((category)=><List.Item
    title={category.name}
    key={category.id}
    onPress={() => {
            /* 1. Navigate to the Details route with params */
            navigation.navigate('Products', {
              id: category.id,
              name: category.name,
            });
          }}
    left={props => <Image style={{height:30,width:30}} source={{ uri: category.icon }} />}
  />);


  return (
      <View>


      {loaded?cats:<ActivityIndicator style={{marginTop:250}} color="orange" size="large" />}
      </View>)
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
