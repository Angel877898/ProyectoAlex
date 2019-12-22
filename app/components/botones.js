import React, { Component } from 'react'
import { Text, StyleSheet, TouchableOpacity,Keyboard} from 'react-native'

export default class Boton extends Component {
    render() {
      return (
        // con onPress se tomará la función que se pase en el archivo que se llame el boton
        <TouchableOpacity style = {styles.boton} onPress = {this.props.onPress} >  
             {/* con texto se el texto que se pase en el archivo que se llame el boton */}
            <Text style = {styles.textoBoton}> {this.props.texto}</Text>
        </TouchableOpacity>
      )
    }
  }
 
  
  
  const styles = new StyleSheet.create({
      boton: {
          justifyContent: "center",
          backgroundColor: '#1DA379',
          padding: 8.5,
          margin: 9.0,
          borderRadius: 20,
          width: 300,
          height: 40,
          alignSelf: 'center'
      },  
      textoBoton:{
          color: '#FFF',
          fontWeight: 'bold',
          fontSize: 15,
          textAlign: 'center',
      }
  })