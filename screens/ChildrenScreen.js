import React from 'react';
import { StyleSheet, Text, View,Button, ScrollView,ActivityIndicator } from 'react-native';
import { Appbar, List } from 'react-native-paper';

export default class ChildrenScreen extends React.Component {
  
  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    }};

  state = {
    categories:[],
    subcats:[],
    loaded:false
  }

  componentDidMount(){
        this.loadcategory();
    }
   loadcategory(){
        var  { navigation } = this.props;
        var  id = navigation.getParam('id', 'NO-ID');
        var  name = navigation.getParam('name', 'some default value');
        var  sub = [];
        fetch(`https://aslbazar.com/api/v1/getnestedcategories`).then(res => res.json()).then(json => {
        
        json.categories.map((category)=>{
          
          if(category.id == id){
            
            sub = category.children.map((child)=>
              <List.Item
                      title={child.name}
                      key={child.id} 
                      onPress={() => {
            navigation.navigate('Products', {
              id: child.id,
              name: child.name,
            });
          }}
                      left={props => <List.Icon {...props} icon="star" />}
                        />
            )
          }
        })
        this.setState({
          subcats: sub,
          loaded: true
        });
        
        
      })

        }



  render() {
    const { navigation } = this.props;
    const id = navigation.getParam('id', 'NO-ID');
    const name = navigation.getParam('name', 'some default value');




    const {categories,subcats,loaded} = this.state;
    var scats = subcats;



    return (
      <View>
      <Appbar.Header style={{backgroundColor:'orange'}} >
        <Appbar.BackAction
          onPress={() => this.props.navigation.goBack()}
        />
        <Appbar.Content
          title= {name}
          subtitle="aslbazar"
        />
      </Appbar.Header>
      <ScrollView>
      <View>
        {loaded?subcats:<ActivityIndicator style={{marginTop:250}} color="orange" size="large" />}
      </View>
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
