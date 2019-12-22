import React, {Component} from 'react';
import { View , Text, TouchableOpacity, TextInput, Keyboard,FlatList,ActivityIndicator,StyleSheet } from 'react-native';
import {Image} from "react-native-elements"
import * as firebase2 from 'firebase';

import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import Boton from '../../components/botones'
import {firebaseApp} from "../../utils/FireBase";
import firebase from "firebase/app"
import "firebase/firestore"
const db=firebase.firestore(firebaseApp)

export default class solicitudes extends Component {
    
    constructor(props){
        super(props)
        this.state={
            email:'',
            usuarios:null,
            solicitudes:null,
            isLoading:false
        }
      }
      componentDidMount(){
        this.loadSolicitudes()
    }
    loadSolicitudes=async()=>{
        const user=firebase2.auth().currentUser.email
        
        let resultSolicitudes=[]
        
        
        const solicitudes=db.collection("amigos").where('user2', '==', user)
        await solicitudes.get().then(response=>{
            

            response.forEach(doc=>{
                let solicitudes=doc.data()
                solicitudes.id=doc.id
                resultSolicitudes.push({solicitudes})
            })
            this.setState({
                solicitudes:resultSolicitudes
            })
            
            
        })
    }
    
      
     
      

    clickNota=(solicitud)=>{
        const {user1,user2,id} =solicitud.item.solicitudes;
        db.collection("amigosDeveris").add({user1:user1,user2:user2}).then(resolve=>{
            db.collection('amigos').doc(id).delete().then(resolve=>{
                this.props.navigation.navigate('main')
            }).catch(()=>{
                console.log("error delete");
                
                
            })
            
         }).catch(()=>{
             console.log("error add");
             
             
         })
        
        
    }
    renderRow=(solicitud)=>{
        const {user1,user2} =solicitud.item.solicitudes;
        
        return(
            <TouchableOpacity onPress={()=>this.clickNota(solicitud)}>
            <View style={styles.viewNotas}>
                <View>
                    <Image
                        resizeMode="cover"
                        source={require('../../utils/imgs/user.png')}
                        style={styles.imgNotas}
                    />
                </View>
                <View style={styles.textos}>
                    <Text style={styles.flatListTitulo}> Solicitud de:</Text>
                    <Text style={styles.flatListMateria}>{user1} </Text>
                    <Text style={styles.flatListContenido}>Click para aceptar </Text>
                </View>
            </View>

            </TouchableOpacity>
        )
    }
    
    renderFooter=()=>{

        if(this.state.isLoading){
            return(
                <View style={styles.loaderNotas}>
                    <ActivityIndicator size="large"/>
                </View>
            )
        }else{
            return(
            <View style={styles.notFound}>
                <Text>No quedan mas solicitudes</Text>
            </View>
            )
        }
        
    }
    renderFlatList=(solicitudes)=>{
        if(solicitudes){
            return(
                
                <FlatList
                    data={this.state.solicitudes} 
                    renderItem={this.renderRow}   
                    keyExtractor={(item,index)=>index.toString()}   
                    
                    onEndReachedThreshold={0}          
                    ListFooterComponent={this.renderFooter}  
                />
                  
            )
        }else{
            return(
                <View style={styles.startLoadNotas}>
                    <ActivityIndicator size="large"/> 
                    <Text>Cargando Notas</Text>
                </View> 
                
            )
        }
    }

    render() {
        const {solicitudes}=this.state
        return(
            <View style={styles.viewBody}>
                <View style={styles.header}>
                <Text style = {styles.textoBoton}> Solicitudes de Amistad</Text>
                </View>
                {this.renderFlatList(solicitudes)}
                <View style={styles.footer}>
                <Boton onPress = {() => this.props.navigation.navigate('main')}  texto = "Regresar"/> 
                </View>
            </View> 
        );
    }
}
const styles=StyleSheet.create({
    viewBody:{
        flex: 1,
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
    },textoBoton:{
        color: 'black',
        
        fontSize: 16,
        textAlign: 'center',
    },
    startLoadNotas:{
        marginTop:20,
        alignItems:"center"
    },viewNotas:{
        flexDirection:"row",
        margin:10,
    },imgNotas:{
        width:90,
        height:93,
    },flatListTitulo:{
        paddingTop:15,
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
    },footer:{
        borderTopWidth:1,
        borderTopColor:"#e3e3d3",
    }
})