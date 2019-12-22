import React, {Component} from 'react';
import { View , Text, Image, TouchableOpacity, TextInput, Keyboard,ScrollView,KeyboardAvoidingView } from 'react-native';
// Componentes
import Boton from '../components/botones'
import BotonTrans from '../components/botonesTrans'
import Input from '../components/inputs' //-- revisar --
//Estilos
import styles from '../styles/globalStyles'
import * as firebase from 'firebase';
import validator from 'validator';
import Toast, {DURATION} from 'react-native-easy-toast';

export default class login extends Component {

  constructor(props){
    super(props)
    this.state={
      email:'',
      password:'',
    }
  }

  validate(){
    Keyboard.dismiss()
    const{email,password}=this.state;
    if(email && password){
        if(validator.isEmail(email)){
          firebase.auth().signInWithEmailAndPassword(email,password).then(resolve =>{
            this.refs.toast.show('Acceso Correcto', 20, () => {
              this.entra();
            });
          }).catch(err=>{
            this.refs.toast.show('Usuario o contraseña incorrecta',150);
          })
        }else{
          this.refs.toast.show('Ingresa un correo electronico',150);
        }
    }else{
      this.refs.toast.show('Rellena todos los campos',150);
    }
    
  }



  //funciones
  entra(){
    
    if(firebase.auth().currentUser.displayName==null){
      this.props.navigation.navigate('datos')
    }else{
      this.props.navigation.navigate('main')
    }
    
  }

 
  render() {
    return (
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
            <Image source = {require('../utils/imgs/logo.png')}style = {styles.logo} ></Image>
            {/* <Text style = {styles.titles}>Remider-Info  </Text> */}
            <Text style = {styles.titles2}>Inicia Sesión  </Text>
            <TextInput placeholder="Correo" style={styles.input} onChangeText={email=>this.setState({email})}></TextInput>
            <TextInput placeholder="Contraseña" style={styles.input} secureTextEntry={true} onChangeText={password=>this.setState({password})}
            />
            <View style={styles.RegisterContainer}>
            <Boton onPress = {() => this.validate()}  texto = "Entrar"/> 
            
            
            <BotonTrans onPress = {() => this.props.navigation.navigate('register')} texto = "Crear Cuenta"/>  
            
            </View>
        </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}