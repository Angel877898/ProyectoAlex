import React,{Component} from "react";
import {StyleSheet,View,Text,ScrollView,TouchableOpacity, TextInput,KeyboardAvoidingView} from "react-native"
import {Image,Icon,ListItem} from "react-native-elements"
import BotonV from '../../components/botonesV'
import BotonR from '../../components/botonesR'
import {firebaseApp} from "../../utils/FireBase";
import firebase from "firebase/app"
import "firebase/firestore"
const db=firebase.firestore(firebaseApp)
import Toast, {DURATION} from 'react-native-easy-toast';
import * as firebase2 from 'firebase';
export default class Nota extends Component{
    constructor(props){
        super(props)
        this.state={
            loading:false,
            materia1:"",
            titulo1:"",
            contenido1:""
        }
    }
    
    eliminar=()=>{
        console.log("elimina2");
        const {user,original,id}=this.props.navigation.state.params.nota.item.notas
        const usuario=firebase2.auth().currentUser.email
        db.collection('notas').doc(id).delete().then(resolve=>{
            this.refs.toast.show('Eliminacion exitosa',100,()=>{
                console.log("gg");
                this.props.navigation.navigate('main')

            })
        }).catch(()=>{
            this.refs.toast.show('Error de Servidor intenta luego')
            
            
        })
        
    }
    update=()=>{
        const {user,original,id,materia,titulo,contenido}=this.props.navigation.state.params.nota.item.notas
        const {materia1,titulo1,contenido1} =this.state
        let {materiaN,tituloN,contenidoN}=""
        if(materia1){
            materiaN=materia1
        }else{
            materiaN=materia
        }
        if(titulo1){
            tituloN=titulo1
        }else{
            tituloN=titulo
        }
        if(contenido1){
            contenidoN=contenido1
        }else{
            contenidoN=contenido
        }
        console.log(materiaN);
        console.log(tituloN);
        console.log(contenidoN);
        const ref=db.collection("notas").doc(id);
        ref.get().then(response =>{
            ref
            .update({contenido:contenidoN,materia:materiaN,titulo:tituloN})
            .then(()=>{
                this.props.navigation.navigate('main')
            })
        })
        
        
        
        
    }
    render(){
        const {titulo,materia,contenido}=this.props.navigation.state.params.nota.item.notas
        
        
        return(
            <View style={styles.viewBody}>
                <KeyboardAvoidingView style={styles.viewBody}behavior="padding" enabled >
                <View style={styles.header}>
                <Text style = {styles.textoBoton}>Tus Notas</Text>
                </View>
                <View>
                    <Text style = {styles.textoBoton2}>Materia:</Text>
                    <View style = {styles.Materia}>
                    <TextInput style = {styles.textoMateria} onChangeText={materia1=>this.setState({materia1})}>{materia} </TextInput>
                    </View>
                    <Text style = {styles.textoBoton2}>Titulo del apunte:</Text>
                    <View style = {styles.Materia}>
                    <TextInput style = {styles.textoMateria}onChangeText={titulo1=>this.setState({titulo1})}>{titulo}</TextInput>
                    
                    </View>
                    <KeyboardAvoidingView behavior="padding" enabled >
                    <View style={styles.header2}>
                    <Text style = {styles.textoBoton}>Contenido</Text>
                    </View>
                    <ScrollView style = {styles.contenido}>
                    <TextInput style = {styles.textoContenido}multiline={true}onChangeText={contenido1=>this.setState({contenido1})}>{contenido}</TextInput>
                    </ScrollView>
                    <View style={styles.footer}>
                
                <BotonV onPress = {() => this.eliminar()}  texto = "Eliminar"/> 
                <BotonR onPress = {() => this.update()}  texto = "Regresar"/> 
                
                </View>
                    </KeyboardAvoidingView>

                </View>
               
                
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
                </KeyboardAvoidingView>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    viewBody:{
        flex:1,
        backgroundColor:"#F8FBFB",
    },header:{
        justifyContent: "center",
        backgroundColor:"white",
        padding: 8.5,
        width: "100%",
        height: 45,
        alignSelf: 'center',
        borderBottomWidth:1,
        borderBottomColor:"#e3e3d3",
    },
    header2:{
        alignSelf: 'center',
        backgroundColor:"white",
        padding: 8.5,
        width: "90%",
        height: 45,
        marginTop:"5%",
        borderWidth:1,
        borderColor:"#e3e3d3",
    },textoBoton:{
        color: 'black',
        
        fontSize: 16,
        textAlign: 'center',
    },textoBoton2:{
        color: 'black',
        marginTop:5,
        fontSize: 16,
        textAlign: 'center',
        marginBottom:-9
    },Materia:{
        backgroundColor:"#ECF1EA",
        width: "90%",
        alignSelf: 'center',
        justifyContent: "center",
        marginTop:20,
        height:55,
        borderRadius:30
    },textoMateria:{
        color: 'black',
        
        fontSize: 16,
        textAlign: 'center',
    },contenido:{
        backgroundColor:"#ECF1EA",
        width: "90%",
        alignSelf: 'center',
        
        marginTop:0,
        height:"30%",
        borderRadius:3,
        borderWidth:.2,
        borderColor:"gray"
    },textoContenido:{
        color: 'black',
        fontSize: 14,
        margin:9,
        borderRadius:5
        
    },footer:{
        flexDirection:"row"
    },toastR:{
        marginTop:70,
        width:200,
        height:40,
        alignContent:"center",
        backgroundColor:"#1DA379"
    },
    
    
})