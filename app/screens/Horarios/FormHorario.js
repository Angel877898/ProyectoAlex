import React, {Component} from 'react';
import { View ,  TouchableOpacity, TextInput, Keyboard,StyleSheet,ActivityIndicator,Picker,ScrollView,KeyboardAvoidingView } from 'react-native';
import Boton from '../../components/botones'
import {Input,Image,Text,Overlay} from "react-native-elements"
import DateTimePicker from "react-native-modal-datetime-picker";
import Toast, {DURATION} from 'react-native-easy-toast';
import {firebaseApp} from "../../utils/FireBase"
import firebase from "firebase/app"
import "firebase/firestore"
import * as firebase2 from "react-native-firebase"
import moment from 'moment'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const db=firebase.firestore(firebaseApp)
export default class verFormNota extends Component {

    constructor(props){
        super(props);
        
        
        this.state={
            loading:false,
            materia:"",
            isVisible:false,
            chosenDate:"",
            duracion:"",
            dias:""
        }
    }
   cancelar(){
       Keyboard.dismiss()
        this.props.navigation.navigate('main')
   }
   enviar(){
    const {materia,chosenDate,duracion,dias} =this.state
    let x=chosenDate.split(":", 1)
    x=parseInt(x)
    let y=parseInt(duracion)+x
    console.log(y);
    const horaFin=y+":00"
    console.log(horaFin);
    

    
    
    if(materia && chosenDate && duracion&&horaFin&&dias){
        this.setState({
            loading:true
        })
        db.collection("horario").add({materia,HoraInicio:chosenDate,duracion,horaFin,dias,id:"",user:"",}).then(resolve=>{
            const idNota=resolve.id
            const contenido=db.collection("horario").doc(idNota)
            const user=firebase.auth().currentUser.email
            contenido.update({id:idNota}).then(()=>{
                
                contenido.update({user:user}).then(()=>{
                    this.setState({
                        loading:false
                    })
                    this.refs.toast.show("Horario creado correctamente",50,()=>{
                        
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
   handlePicker=(datetime)=>{
       this.setState({
           isVisible:false,
           chosenDate: moment(datetime).format('HH:mm')
       })
   }
   hidePicker=()=>{
    this.setState({
        isVisible:false,
        
    })
}
showPicker=()=>{
    this.setState({
        isVisible:true
    })
}
updatePicker = (duracion) => {
    this.setState({ duracion: duracion })
 }
 updatePicker2 = (dias) => {
    this.setState({ dias: dias })
 }
    render() {
        const {loading} =this.state
        return(
            <View style={styles.viewContainer}>
                
                <View style={styles.viewPhoto}>
                    <Image source={{uri:"https://www.mentesliberadas.com/wp-content/uploads/2018/10/apuntes-bonitos-principal-1024x567.jpg"}} style={{width:500,height:200}}/>
                </View>
                
                <ScrollView style={styles.otro}>
                <View >
                
                    <TextInput placeholder="Nombre de la Materia" style={styles.input} onChangeText={materia=>this.setState({materia})}></TextInput>
                    <TouchableOpacity style = {styles.botonHorario} onPress = {()=>this.showPicker()} >  

                    <Text style = {styles.textoBotonHorario}> Hora de inicio</Text>
                    </TouchableOpacity>
                    <Text style = {styles.textox}>Inicio: {this.state.chosenDate} </Text>
                    <Text style = {styles.textoy}> Duracion: </Text>
                    <Picker style = {styles.picker} itemStyle={styles.pickeri} selectedValue = {this.state.duracion} onValueChange = {this.updatePicker}>
                        <Picker.Item label = "Escoge un valor" value = "" />
                        <Picker.Item label = "2 horas" value = "2" />
                        <Picker.Item label = "4 horas" value = "4" />
                        
                    </Picker>
                    <Text style = {styles.textoy}> Días: </Text>
                    <Picker style = {styles.picker} itemStyle={styles.pickeri} selectedValue = {this.state.dias} onValueChange = {this.updatePicker2}>
                        <Picker.Item label = "Escoge un valor" value = "" />
                        <Picker.Item label = "Lunes-Miercoles" value = "Lunes" />
                        <Picker.Item label = "Martes y Jueves" value = "Martes" />
                        <Picker.Item label = "Viernes" value = "Viernes" />
                    </Picker>
                    <DateTimePicker
                    isVisible={this.state.isVisible}
                    onConfirm={this.handlePicker}
                    onCancel={this.hidePicker}
                    mode={'time'}
                    
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
                
                </ScrollView>
                
                <View>
                    <Overlay overlayStyle={styles.overlayLoading} isVisible={loading} width="auto" height="auto">
                        <View>
                        <Text style={styles.textOverlay}>Creando Horario</Text>
                        <ActivityIndicator size="large" color="#00a680" />
                        </View>
                    </Overlay>
                </View>
                
            </View> 
        );
    }
}
const styles =StyleSheet.create({
    viewContainer:{
        flex:1,
        
        backgroundColor:"#fff"
    },viewPhoto:{
        alignItems:"center",
        height: hp('8%'),
       
    }, input:{
        justifyContent: "center",
        backgroundColor: '#F3F3F3',
        padding: 5,
        margin: hp('2%'),
        borderRadius: 20,
        width: wp('90%'),
        height: hp('5%'),
        textAlign: 'center',
        alignSelf: 'center'
      },inputContainer:{
        justifyContent: "center",
        backgroundColor: '#F3F3F3',
        padding: 5,
        margin: 10,
        borderRadius: 20,
        width: wp('90%'),
        height: 150.5,
        textAlign: 'center',
        alignSelf: 'center'
    },otro:{
        marginTop: hp('20%'),
    },
    bottom:{
        marginTop:hp('5%')
    }, boton: {
        marginTop:24,
        justifyContent: "center",
        backgroundColor: '#FC4F24',
        padding: 8.5,
        margin: hp('9%'),
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
        width:300,
        height:40,
        alignContent:"center",
        backgroundColor:"#1DA379"
    },overlayLoading:{
        padding:20,
    },textOverlay:{
        color:"#00a680",
        marginBottom: 20,
        fontSize:15
    },botonHorario: {
        marginTop:hp('2%'),
        justifyContent: "center",
        backgroundColor: '#F3F3F3',
        padding: 8.5,
        margin: 1.0,
        borderRadius: 20,
        width: wp('90%'),
        height: hp('5%'),
        alignSelf: 'center'
    },  
    textoBotonHorario:{
        color: '#A8A7A7',
        
        fontSize: 15,
        textAlign: 'center',
    },textox:{
        fontSize: 15,
        textAlign: 'center',
        color: '#A8A7A7',
        marginBottom:hp('2%')
    },
    textoy:{
        fontSize: 15,
        textAlign: 'center',
        color: 'black',
        
    },picker:{
        width: wp('90%'),
        height:hp('5%'),
        marginTop:hp('1%'),
        justifyContent: "center",
        backgroundColor: '#F3F3F3',
        padding: 8.5,
        margin: 1.0,
        alignSelf: 'center',
        borderRadius: 20,
        color:"#C4C4C4",
        alignItems:"center",
        alignContent:"center"
    },pickeri:{
        fontSize: 15,
        textAlign: 'center',
        color: '#A8A7A7',
    }
})