import React, {Component} from 'react';
import { View , Text, Image, TouchableOpacity, TextInput, Keyboard,ScrollView,KeyboardAvoidingView} from 'react-native';
import * as firebase2 from "firebase"

import Boton from '../../components/botones'
import BotonTrans from '../../components/botonesTrans'
import {firebaseApp} from "../../utils/FireBase";
import firebase from "firebase/app"
import "firebase/firestore";
import validator from 'validator';
const db=firebase.firestore(firebaseApp)
import Toast, {DURATION} from 'react-native-easy-toast';
import styles from '../../styles/globalStyles'
export default class add extends Component {
    
    constructor(props){
        super(props)
        this.state={
            email:'',
            usuarios:null
          
        }
      }
     
      listaUsuarios=async()=>{
        const email=this.state.email
        
        let resultUsuarios=[];
        
        const usuariosdb=db.collection("usuarios")
        await usuariosdb.get().then(response =>{
            response.forEach(doc=>{
                let usuarios=doc.data()
                

                resultUsuarios.push(usuarios.email)
                
            })
            this.setState({
                usuarios:resultUsuarios
            })
            
            this.verlistaUsuarios()
        })
      }
      verlistaUsuarios=()=>{
        Keyboard.dismiss()
        let usuarios=this.state.usuarios
        const emailFriend=this.state.email.toLowerCase()
        const email=firebase2.auth().currentUser.email.toLowerCase()
        let agregar=null
       
        if(emailFriend){
            console.log(usuarios);
            
            if(validator.isEmail(emailFriend)){
                if(email===emailFriend){
                    this.refs.toast.show('No te puedes agregar a ti',150);
                    
                }else{
                usuarios.forEach(function(element){
                    if(emailFriend==element){
                        console.log("Posible amigo encontrado");
                        agregar=element
                        
                    }
                
                    
                    
                }
                
                )
                if(agregar){
                    db.collection("amigos").add({user1:email,user2:agregar}).then(resolve=>{
                        this.exito()
                        
                        }).catch(()=>{
                            
                            this.refs.toast.show('Error de servidor',150);
                        
                            
                        })
                    
                }else{
                    this.refs.toast.show('Usuario no registrado',150);
                    
                }
                
            }
            }else{
                this.refs.toast.show('Ingresa un correo electronico',150);
            }
        }else{
            this.refs.toast.show('Rellena todos los campos',150);
        }
        
      }
      exito=()=>{
        this.refs.toast.show('Invitacion Enviada', 20, () => {
            this.props.navigation.navigate('main')
          });
        
      }

    render() {
        return(
        <View style={styles.container}>
        <KeyboardAvoidingView style={styles.viewBody}behavior="padding" enabled >
        <View>
            <Toast
              ref="toast"
              style={styles.toastR}
              position='center'
              positionValue={900}
              fadeInDuration={1000}
              fadeOutDuration={1000}
              opacity={3}
              textStyle={{color:"#fff"}}
            />
            <Image source = {require('../../utils/imgs/logo.png')}style = {styles.logo} ></Image>
            {/* <Text style = {styles.titles}>Remider-Info  </Text> */}
            <Text style = {styles.titles2}>Agrega amigos  </Text>
            <TextInput placeholder="Correo del usuario" style={styles.input} onChangeText={email=>this.setState({email})}></TextInput>
            
            <View style={styles.RegisterContainer}>
            <Boton onPress = {() => this.listaUsuarios()}  texto = "Enviar solicitud"/> 
            
            
            <BotonTrans onPress = {() => this.props.navigation.navigate('main')} texto = "Regresar"/>  
            
            </View>
        </View>
        </KeyboardAvoidingView>
      </View>
        );
    }
    
}
