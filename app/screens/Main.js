import React, {Component} from 'react';
import { View , Text, TouchableOpacity, TextInput, Keyboard,FlatList,ActivityIndicator,StyleSheet } from 'react-native';
import {Image} from "react-native-elements"
import * as firebase2 from 'firebase';

import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

import {firebaseApp} from "../utils/FireBase";
import firebase from "firebase/app"
import "firebase/firestore"
const db=firebase.firestore(firebaseApp)

export default class main extends Component {
    constructor(){
        super()
        this.state={
            notas:null,
            startNotas:null,
            limitNotas:8,
            isLoading:true
        }
    }
    componentDidMount(){
        this.loadNotas()
    }
    loadNotas=async()=>{
        const user=firebase2.auth().currentUser.email
        const {limitNotas}=this.state;
        let resultNotas=[]
        const notas=db.collection("notas").where('user', '==', user).orderBy("date","desc")
        await notas.get().then(response=>{
            this.setState({
                startNotas:response.docs[response.docs.length-1]
            })

            response.forEach(doc=>{
                let notas=doc.data()
                notas.id=doc.id
                resultNotas.push({notas})
            })
            this.setState({
                notas:resultNotas,
                isLoading:false
            })
        })
    }
    loadActionButton=()=>{
        return(
            <ActionButton
                buttonColor="#00a680"
                onPress={() => { this.props.navigation.navigate('addNota',{loadNotas:this.loadNotas})}}
                />
        )
    }
    clickNota=(nota)=>{
        this.props.navigation.navigate("nota",{nota})
    }
    renderRow=(nota)=>{
        const {contenido,materia,titulo} =nota.item.notas;
        
        return(
            <TouchableOpacity onPress={()=>this.clickNota(nota)}>
            <View style={styles.viewNotas}>
                <View>
                    <Image
                        resizeMode="cover"
                        source={require('../utils/imgs/notas.png')}
                        style={styles.imgNotas}
                    />
                </View>
                <View style={styles.textos}>
                    <Text style={styles.flatListTitulo}>{titulo} </Text>
                    <Text style={styles.flatListMateria}>{materia} </Text>
                    <Text style={styles.flatListContenido}>
                     Click para más detalles
                    </Text>
                </View>
            </View>
            </TouchableOpacity>
        )
    }
    handleLoadMore=async()=>{
        console.log("mas")
        
        const user=firebase2.auth().currentUser.email
        const{notas,limitNotas,startNotas}=this.state;
        let resultNotas=notas;
        const notasdb=db.collection("notas").where('user', '==', user).orderBy("date","desc").startAfter(startNotas.data().date).limit(limitNotas)
        await notasdb.get().then(response =>{

            if(response.docs.length>0){
                this.setState({
                    startNotas:response.docs[response.docs.length-1]
                })
            }else{
                this.setState({
                    isLoading:false
                })
            }
            response.forEach(doc=>{
                let notas=doc.data()
                notas.id=doc.id
                resultNotas.push({notas})
            })
            this.setState({
                notas:resultNotas
            })
        })
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
                <Text>No quedan más Notas</Text>
            </View>
            )
        }
        
    }
    renderFlatList=(notas)=>{
        if(notas){
            return(
                
                <FlatList
                    data={this.state.notas} 
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
                    <Text>Cargando Notas</Text>
                </View> 
                
            )
        }
    }

    render() {
        const {notas}=this.state
        return(
            <View style={styles.viewBody}>
                <View style={styles.header}>
                <Text style = {styles.textoBoton}>Tus Notas</Text>
                </View>
                {this.renderFlatList(notas)}
                {this.loadActionButton()}
            </View> 
        );
    }
}

const styles=StyleSheet.create({
    viewBody:{
        flex: 1,
        backgroundColor:"#F8FBFB",
        
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
        paddingTop:1,
        fontWeight:"bold",
    },flatListMateria:{
        paddingTop:2,
    },textos:{
        marginLeft:18,
        marginTop:10
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
        textoBoton:{
            color: 'black',
            
            fontSize: 16,
            textAlign: 'center',
        },
})