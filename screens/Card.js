import React from 'react';
import { StyleSheet,View} from 'react-native';

const Card = ()=>{
    return (
    <View style={styles.container}></View>
    
    )
}


const styles = StyleSheet.create({
  container: {
    borderWidth:1,
    borderRadius:2,
      borderColor:'#ddd',
      borderBottomWidth:1,
      shadowColor:'#000',
      shadowOffset:{width:2,height:2},
      shadowOpacity:0.1,
      shadowRadius:2,
      elevation:1
  },
});
 
export default Card;