import React, {Component} from 'react';
import { View , Text, TouchableOpacity, TextInput, Keyboard,FlatList,ActivityIndicator,StyleSheet } from 'react-native';
import {Image} from "react-native-elements"


import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import Boton from "../../components/botones"
import {firebaseApp} from "../../utils/FireBase";
import firebase from "firebase/app"
import "firebase/firestore"
const db=firebase.firestore(firebaseApp)
import Toast, {DURATION} from 'react-native-easy-toast';
import * as firebase2 from 'firebase';



export default class compartir extends Component {
    constructor(props){
        super(props)
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
    
    clickNota=(nota)=>{
       // const {user,original,id}=this.props.navigation.state.params.nota.item.notas
        
       
       if(this.props.navigation.state.params.amigo.item.amigos){
        const {user1}=this.props.navigation.state.params.amigo.item.amigos;
        const {contenido,date,materia,titulo,original}= nota.item.notas
        db.collection("notas").add({materia,titulo,contenido,id:"",user:"",original:"",date:new Date()}).then(resolve=>{
            const idNota=resolve.id
            const contenidon=db.collection("notas").doc(idNota)
            const user=firebase2.auth().currentUser.email
            contenidon.update({id:idNota}).then(()=>{
                
                contenidon.update({user:user1}).then(()=>{
                    
                    this.refs.toast.show("Nota compartida correctamente",50,()=>{
                        
                        this.props.navigation.navigate('main')
                    })
                })
            })
        })
       }
       if(this.props.navigation.state.params.amigo.item.amigos2){
        const {user2}=this.props.navigation.state.params.amigo.item.amigos2;
        const {contenido,date,materia,titulo,original}= nota.item.notas
        db.collection("notas").add({materia,titulo,contenido,id:"",user:"",original:"",date:new Date()}).then(resolve=>{
            const idNota=resolve.id
            const contenidon=db.collection("notas").doc(idNota)
            const user=firebase2.auth().currentUser.email
            contenidon.update({id:idNota}).then(()=>{
                
                contenidon.update({user:user2}).then(()=>{
                    
                    this.refs.toast.show("Nota compartida correctamente",50,()=>{
                        
                        this.props.navigation.navigate('main')
                    })
                })
            })
        })
       }
       
       
        
       
        
        
    }
    renderRow=(nota)=>{
        const {contenido,materia,titulo} =nota.item.notas;
        
        return(
            <TouchableOpacity onPress={()=>this.clickNota(nota)}>
            <View style={styles.viewNotas}>
                <View>
                    <Image
                        resizeMode="cover"
                        source={require('../../utils/imgs/notas.png')}
                        style={styles.imgNotas}
                    />
                </View>
                <View style={styles.textos}>
                    <Text style={styles.flatListTitulo}>{titulo} </Text>
                    <Text style={styles.flatListMateria}>{materia} </Text>
                    <Text style={styles.flatListContenido}>
                     Click para compartir
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
                <Text>No quedan mas Notas</Text>
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
                <Text style = {styles.textoBoton}>Elige la nota a compartir con tu amigo</Text>
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
                {this.renderFlatList(notas)}
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
        paddingTop:16,
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
            fontWeight:"bold",
            fontSize: 16,
            textAlign: 'center',
        },toastR:{
            marginTop:70,
            width:300,
            height:40,
            alignContent:"center",
            backgroundColor:"#1DA379"
        },footer:{
        
        backgroundColor:"white",
        width: "100%",
        height: 65,
        borderTopWidth:1,
        borderTopColor:"#e3e3d3",
        }
})