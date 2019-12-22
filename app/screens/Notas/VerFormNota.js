import React, {Component} from 'react';
import { View ,  TouchableOpacity, TextInput, Keyboard,StyleSheet,ActivityIndicator,KeyboardAvoidingView,ScrollView } from 'react-native';
import Boton from '../../components/botones'
import {Input,Image,Text,Overlay} from "react-native-elements"
import DatePicker from 'react-native-datepicker'
import Toast, {DURATION} from 'react-native-easy-toast';
import {firebaseApp} from "../../utils/FireBase"
import firebase from "firebase/app"
import "firebase/firestore"
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import * as firebase2 from "react-native-firebase"
const db=firebase.firestore(firebaseApp)
export default class verFormNota extends Component {

    constructor(props){
        super(props);
        
        
        this.state={
            loading:false,
            materia:"",
            titulo:"",
            contenido:""
        }
    }
   cancelar(){
       Keyboard.dismiss()
        this.props.navigation.navigate('main')
   }
   enviar(){
    const {materia,titulo,contenido} =this.state
    
    if(materia && titulo && contenido){
        this.setState({
            loading:true
        })
        db.collection("notas").add({materia,titulo,contenido,id:"",user:"",original:"",date:new Date()}).then(resolve=>{
            const idNota=resolve.id
            const contenido=db.collection("notas").doc(idNota)
            const user=firebase.auth().currentUser.email
            contenido.update({id:idNota}).then(()=>{
                
                contenido.update({user:user,original:user}).then(()=>{
                    this.setState({
                        loading:false
                    })
                    this.refs.toast.show("Nota Creada correctamente",50,()=>{
                        this.props.navigation.state.params.loadNotas();
                        this.props.navigation.navigate('main')
                    })
                })
            })
        }).catch(()=>{
            this.refs.toast.show("Error del servidor")
            this.setState({
                loading:false
            })
        })



    }else{
        this.refs.toast.show('Rellena todos los campos')
        
        
    }
        
   }
    render() {
        const {loading} =this.state
        return(
            <ScrollView style={styles.viewContainer2}>
            
                <View style={styles.viewPhoto}>
                    <Image source={{uri:"https://www.mentesliberadas.com/wp-content/uploads/2018/10/apuntes-bonitos-principal-1024x567.jpg"}} style={{width:500,height:200}}/>
                </View>
                <View>
                <TextInput placeholder="Nombre de la Materia" style={styles.input} onChangeText={materia=>this.setState({materia})}></TextInput>
                <TextInput placeholder="Titulo del Apunte" style={styles.input} onChangeText={titulo=>this.setState({titulo})}></TextInput>
                <TextInput
                    placeholder={"Contenido"}
                    multiline={true}
                    onChangeText={contenido=>this.setState({contenido})}
                    style={styles.inputContainer}
                />
                
                </View>
                <View style={styles.bottom}>
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
                <Boton onPress = {() => this.enviar()}  texto = "Agregar"/> 
                <TouchableOpacity style = {styles.boton} onPress = {()=>this.cancelar()} >  
             
                <Text style = {styles.textoBoton}> Cancelar</Text>
                </TouchableOpacity>
                </View>
                
                
                <View>
                    <Overlay overlayStyle={styles.overlayLoading} isVisible={loading} width="auto" height="auto">
                        <View>
                        <Text style={styles.textOverlay}>Creando Nota</Text>
                        <ActivityIndicator size="large" color="#00a680" />
                        </View>
                    </Overlay>
                </View>
            </ScrollView> 
        );
    }
}
const styles =StyleSheet.create({
    viewContainer2:{
        flex: 1,
        
        
        
        backgroundColor:"#fff"
    },viewPhoto:{
        
        alignItems:"center",
        height:hp('34%'),
       
    }, input:{
        justifyContent: "center",
        backgroundColor: '#F3F3F3',
        padding: 5,
        margin: 10,
        borderRadius: 20,
        width: "90%",
        height: 41.5,
        textAlign: 'center',
        alignSelf: 'center'
      },inputContainer:{
        justifyContent: "center",
        backgroundColor: '#F3F3F3',
        padding: 5,
        margin: 10,
        borderRadius: 20,
        width: "90%",
        height: 150.5,
        textAlign: 'center',
        alignSelf: 'center'
    },bottom:{
        marginTop:20
    }, boton: {
        marginTop:24,
        justifyContent: "center",
        backgroundColor: '#FC4F24',
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
    },toastR:{
        marginTop:-460,
        width:200,
        height:40,
        alignContent:"center",
        backgroundColor:"#1DA379"
    },overlayLoading:{
        padding:20,
    },textOverlay:{
        color:"#00a680",
        marginBottom: 20,
        fontSize:15
    }
})