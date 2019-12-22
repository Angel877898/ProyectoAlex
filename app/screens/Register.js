import React, {Component} from 'react';
import { View , Text, Image, TouchableOpacity, TextInput, Keyboard,ScrollView ,KeyboardAvoidingView} from 'react-native';
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
      name:'',
      email:'',
      password:'',
      password2:''
    }
  }
  validate(){
    
    Keyboard.dismiss()
    const{email,password,password2}=this.state;
      if(email,password,password2){
        if(validator.isEmail(email)){
          //console.log("es mail")
          if((validator.isAlphanumeric(password2,'es-ES'))&&(validator.isAlphanumeric(password,'es-ES'))&&(password.length>=6)&&(password2.length>=6)){
            //console.log("es contra")
            if(password===password2){
              //console.log("TODO CORRECTOOOO")
              this.exito()
              
            }else{
              this.refs.toast.show('Contraseñas no coinciden',200);
            }
          }else{
            this.refs.toast.show('Contraseña minimo de 6 caracteres alfanuméricos',200);
          }
        }else{
          this.refs.toast.show('Correo no valido',200);
        }
      }else{
        this.refs.toast.show('Rellena todos los campos',200);
      }
    
  }
  exito(){
    const{name,email,password,password2}=this.state;
    //console.log("n"+name)
    //console.log(email)
    //console.log(password2)
    //console.log(password)
    firebase.auth().createUserWithEmailAndPassword(email,password).then(resolve =>{
      this.refs.toast.show('Registro Correcto', 500, () => {
        this.props.navigation.navigate('login')
      });
    }).catch(err=>{
      this.refs.toast.show('Error en el registro',200);
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView style={styles.viewBody}behavior="padding" enabled >
        <View>
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
            <Image source = {require('../utils/imgs/logo.png')} style = {styles.logo}></Image>
            {/* <Text style = {styles.Registertitles}>Reminder-Info    </Text> */}
            <Text style = {styles.Registertitles2}>Regístrate  </Text>
              
              <TextInput placeholder="Correo" style={styles.input} onChangeText={email=>this.setState({email})}></TextInput>
              <TextInput placeholder="Contraseña" style={styles.input} secureTextEntry={true} onChangeText={password=>this.setState({password})}></TextInput>
              <TextInput placeholder="Repite Contraseña" style={styles.input} secureTextEntry={true} onChangeText={password2=>this.setState({password2})}></TextInput>
            <View style={styles.RegisterContainer}>
            <Boton onPress = {() => this.validate()} texto = "Regístarme"/> 
              
             
            <BotonTrans onPress = {() => this.props.navigation.navigate('login')} texto = "¿Ya tienes cuenta?"/> 
            
              
            </View>
        </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

