import React, {Component} from 'react';
import { View , Text, Image, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import * as firebase2 from 'firebase';
import validator from 'validator';
import styles from '../styles/globalStyles'
import Toast, {DURATION} from 'react-native-easy-toast';
import Boton from '../components/botones'

import {firebaseApp} from "../utils/FireBase";
import firebase from "firebase/app"
import "firebase/firestore"
const db=firebase.firestore(firebaseApp)
export default class datos extends Component {
    constructor(props){
        super(props)
        this.state={
          name:''
          
        }
      }
      validate(){
        Keyboard.dismiss()
        const{name}=this.state;
        if((validator.isAlphanumeric(name,'es-ES'))){
            if(name.length>=6){
                this.enviar()


            }else{
                this.refs.toast.show('El nombre tiene que ser minimo de 6 caracteres alfanumericos',200);
            }
        }else{
            this.refs.toast.show('El nombre tiene que ser minimo de 6 caracteres alfanumericos',200);
        }
      }
      enviar(){

        const{name}=this.state
        const up={
            displayName: name
        }
        firebase2.auth().currentUser.updateProfile(up);
        const userr =firebase2.auth().currentUser.displayName
        const email=firebase2.auth().currentUser.email

        db.collection("usuarios").add({email}).then(resolve=>{
           console.log("correcto");
           
        }).catch(()=>{
            console.log("error");
            
            
        })


        this.props.navigation.navigate('main')
      }

    render() {
        return(
            <View style={styles.container}>
                <Toast
                    ref="toast"
                    style={styles.toast}
                    position='center'
                    positionValue={900}
                    fadeInDuration={1000}
                    fadeOutDuration={1000}
                    opacity={3}
                    textStyle={{color:"#fff"}}
                />
                <Text style = {styles.Datostitles}>Agrega tu nombre de usuario      </Text>
                <TextInput placeholder="Username" style={styles.input} onChangeText={name=>this.setState({name})}></TextInput>
                <Boton onPress = {() => this.validate()} texto = "Enviar"/> 
            </View>
        );
    }
}