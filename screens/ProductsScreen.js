import React from 'react';
import { StyleSheet, Text, View, ScrollView,ActivityIndicator,Image,TouchableOpacity } from 'react-native';
import { Appbar, List, Button, Card, Title, Paragraph, Divider } from 'react-native-paper';

export default class ProductsScreen extends React.Component {
  

    static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('name', 'A Nested Details Screen'),
      headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    }
    };
  };

  state = {
    products:[],
    loaded:false
  }
  

  componentDidMount(){
        this.loadproducts();
    }
   loadproducts(){
        var  { navigation } = this.props;
        var  id = navigation.getParam('id', 'NO-ID');
        var  name = navigation.getParam('name', 'some default value');
        var  sub = [];
        fetch(`https://aslbazar.com/api/v1/getproductsbycategory?catId=${id}&offset=0&limit=20`).then(res => res.json()).then(json => {
        
        sub =  json.products.map((product)=>
         <TouchableOpacity key={product.id} onPress={() => {
            navigation.navigate('Info', {
              id: product.id,
              name: product.name,
            });
          }}>
          <View >
            <View style={styles.card}>
                <View style={{marginHorizontal:15,marginVertical:30}}><Image style={{width:100,height:100}} source={{uri:product.image}}/></View>
                <View style={{width:180}}>
                    <Text style={{fontSize:18,color:'#2b5eaf'}}>{product.name}</Text>
                    <View style={{flexDirection:'row',width:150}}>
                    <Text style={{color:'gray'}}>Narx:</Text>
                    <Text style={{fontSize:14}}>{product.price}</Text>
                    </View>
                </View>
            </View>
  </View>
        </TouchableOpacity>
        )
        this.setState({
          products: sub,
          loaded: true
        });
      })
      }



  render() {
    const { navigation } = this.props;
    const id = navigation.getParam('id', 'NO-ID');
    const name = navigation.getParam('name', 'some default value');




    const {products,loaded} = this.state;



    return (
      <View>
      <ScrollView>
      <View style={styles.container}>
        {loaded?products:<ActivityIndicator style={{marginTop:250}} color="orange" size="large" />}
      </View>
      </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card:{
      margin:2,
      flexDirection:'row',
      height:150,
      borderRadius:5,
          borderWidth:1,
          borderRadius:2,
          borderColor:'#ddd',
          borderBottomWidth:1,
          shadowColor:'#000',
          shadowOffset:{width:2,height:2},
          shadowOpacity:0.1,
          shadowRadius:2,
          elevation:1,
      overflow:'hidden'
  }
});
