import React, {Component} from 'react';
import { View , Text, TouchableOpacity, TextInput, Keyboard,FlatList,ActivityIndicator,StyleSheet,ScrollView,AppState } from 'react-native';
import {Image} from "react-native-elements"
import * as firebase2 from 'firebase';
import RNLocalNotifications from 'react-native-local-notifications';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import PushController from '../utils/PushController'
import PushNotification from 'react-native-push-notification'
import {firebaseApp} from "../utils/FireBase";
import firebase from "firebase/app"
import "firebase/firestore"

const db=firebase.firestore(firebaseApp)

export default class main extends Component {
    constructor(){
        super()
        
        this.state={
            horarios:null,
            startHorarios:null,
            limitHorarios:8,
            isLoading:true,
            date:''
        }
    }
    componentDidMount(){
        
        this.loadHorarios()
    }
    

    loadHorarios=async()=>{
        const user=firebase2.auth().currentUser.email
        
        
      
        
        
        const {limitHorarios}=this.state;
        let resultHorarios=[]
        const horarios=db.collection("horario").where('user', '==', user).orderBy("HoraInicio","desc")
        
        await horarios.get().then(response=>{
            this.setState({
                startHorarios:response.docs[response.docs.length-1]
            })

            response.forEach(doc=>{
                let horarios=doc.data()
                
                horarios.id=doc.id
                resultHorarios.push({horarios})
            })
            console.log(resultHorarios);
            
            this.setState({
                horarios:resultHorarios,
                isLoading:false
            })
            
            
        })
    }
    renderFlatList=(horarios)=>{
        if(horarios){
            return(
                
                <FlatList
                    data={this.state.horarios} 
                    renderItem={this.renderRow}   
                    keyExtractor={(item,index)=>index.toString()}   
                    onEndReached={this.handleLoadMore} 
                    onEndReachedThreshold={0}          
                    ListFooterComponent={this.renderFooter}  
                />
                  
            )
        }else{
            return(
                <View style={styles.startLoadNotas}>
                    <ActivityIndicator size="large"/> 
                    <Text>Cargando Horarios</Text>
                </View> 
                
            )
        }
    }
    clickNota=(horario)=>{
        this.props.navigation.navigate("ClickHorario",{horario})
        
    }
    renderRow=(horario)=>{
        let {HoraInicio,horaFin,materia,dias} =horario.item.horarios;
        if(dias==="Lunes"){
            dias="Lunes y Miercoles"
        }if(dias==="Martes"){
            dias="Martes y Jueves"
        }
        return(
            <TouchableOpacity onPress={()=>this.clickNota(horario)}>
            <View style={styles.viewNotas}>
                <View>
                    <Image
                        resizeMode="cover"
                        source={require('../utils/imgs/reloj.png')}
                        style={styles.imgNotas}
                    />
                </View>
                <View style={styles.textos}>
                    <Text style={styles.flatListTitulo}>{materia} </Text>
                    <Text style={styles.flatListMateria}>{dias} </Text>
                    <Text style={styles.flatListContenido}>
                     de {HoraInicio} a {horaFin}
                    </Text>
                </View>
            </View>
            </TouchableOpacity>
        )
    }
    loadActionButton=()=>{
        return(
            <ActionButton
                buttonColor="#1DA379"
                onPress={() => { this.props.navigation.navigate('addHorario')}}
                />
        )
    }
    
   
    

    render() {
        const {horarios}=this.state
        return(
            <View style={styles.viewBody}>
                <View style={styles.header}>
                <Text style = {styles.textoBoton}>Horario</Text>
                </View>
                {this.renderFlatList(horarios)}
                {this.loadActionButton()}
                <PushController/>
            </View> 
        );
    }
}

const styles=StyleSheet.create({
    viewBody:{
        flex: 1,
        backgroundColor:"#F8FBFB",
        
    },
    header:{
        
        justifyContent: "center",
        backgroundColor:"white",
        padding: 8.5,
        
        
        width: "100%",
        height: 45,
        alignSelf: 'center',
        borderBottomWidth:1,
        borderBottomColor:"#e3e3d3",
        },
        textoBoton:{
            color: 'black',
            
            fontSize: 16,
            textAlign: 'center',
        },startLoadNotas:{
            marginTop:20,
            alignItems:"center"
        },viewNotas:{
            flexDirection:"row",
            margin:10,
        },imgNotas:{
            width:90,
            height:93,
        },flatListTitulo:{
            paddingTop:14,
            fontWeight:"bold",
        },flatListMateria:{
            paddingTop:2,
        },textos:{
            marginLeft:13
        },flatListContenido:{
            paddingTop:2,
            color:"grey",
            width:200,
        },loaderNotas:{
            marginTop:10,
            marginBottom:10,
        },notFound:{
            marginTop:10,
            marginBottom:10,
            alignItems:"center",
        },
           
            textoBoton:{
                color: 'black',
                
                fontSize: 16,
                textAlign: 'center',
            },
})