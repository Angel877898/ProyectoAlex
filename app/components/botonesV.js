import React, { Component } from 'react'
import { Text, StyleSheet, TouchableOpacity,Keyboard} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
export default class BotonV extends Component {
    render() {
      return (
        // con onPress se tomará la función que se pase en el archivo que se llame el boton
        <TouchableOpacity style = {styles.boton} onPress = {this.props.onPress} >           
                        <Text style = {styles.textoBoton2}>{this.props.texto}</Text>
                    </TouchableOpacity>
      )
    }
  }
 
  
  
  const styles = new StyleSheet.create({
    boton: {
      justifyContent: "center",
      backgroundColor: '#EE1811',
      padding: 8.5,
      marginLeft:25,
      marginTop:30,
      borderRadius: 20,
      width: wp('40%'),
      height: 40,
      alignSelf: 'center',
      
  },    
  textoBoton2:{
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
}
  })