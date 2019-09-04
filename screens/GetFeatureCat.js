import React from 'react';
import { StyleSheet, Text, View,ActivityIndicator,Image,ScrollView,TouchableOpacity} from 'react-native';
import { Appbar,Button,List } from 'react-native-paper';

export default class GetFeatureCat extends React.Component {
  state = {
    categories:[],
    loaded:false,
    products:[],
  }
  componentDidMount(){
        this.loadcategory();
    }
  loadcategory(){
        fetch(`https://aslbazar.com/api/v1/getfeaturedcategorieswithproducts`).then(res => res.json()).then(json => {
        
        this.setState({
          categories:json.categories,
          loaded:true,
        });
        
      })
        }

  render() {
    const {navigation} = this.props;
    const {categories,loaded} = this.state;
    const cats = categories.map((category)=>
//    <List.Item
//    title={category.name}
//    key={category.id}
//    onPress={() => {
//            /* 1. Navigate to the Details route with params */
//            navigation.navigate('Children', {
//              id: category.id,
//              name: category.name,
//            });
//          }}/>
                                
    <View key={category.id} style={{marginTop:5,marginRight:3,marginLeft:3,height:400}}>
                                    
        <View style={{flex:1, justifyContent: 'space-between',alignItems:'space-between',flexDirection:'row',height:100}}>
            <Text style={{fontSize:18,maxWidth:'50%'}}>{category.name}</Text>
            <Button onPress={() => {
            navigation.navigate('Products', {
              id: category.id,
              name: category.name,
            });
          }} style={{fontSize:10}}>Ko'proq ko'rish</Button>
        </View>
            <ScrollView horizontal="true">
           <View style={{flexDirection:'row',height:300}}>
            {category.products.map((product)=>
                <TouchableOpacity key={product.id} onPress={() => {
            navigation.navigate('Info', {
              id: product.id,
              name: product.name,
            });
          }}>
                <View  key={product.id} style={styles.card}>
                   <Image style={{width:200,height:200}} source={{uri:product.image}}/>
                                       <View style={styles.title}><Text style={{textAlign:'center',fontSize:15,color:'white'}}>{product.name}</Text></View>
                    <Text style={{textAlign:'center',paddingTop:10,color:'#e26826',fontSize:15}}>{product.price}</Text>
                 </View>
                </TouchableOpacity>
              )}
            </View>
             </ScrollView>
    </View>
    );


  return (
      <View style={{marginBottom:100}}>


      {loaded?cats:<ActivityIndicator style={{flex:1,justifyContent:'center',alignItems:'center'}} color="orange" size="large" />}
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
    card:{height:300,
          width:200,
          margin:10,
          borderRadius:5,
          borderWidth:1,
          borderRadius:2,
          borderColor:'#ddd',
          borderBottomWidth:1,
          shadowColor:'#000',
          shadowOffset:{width:5,height:5},
          shadowOpacity:0.1,
          shadowRadius:5,
          elevation:3
         },
    title:{
        backgroundColor:'#0d2956',
        paddingVertical:15,
        borderRadius:5,
        maxHeight:50,
        
    }
});
