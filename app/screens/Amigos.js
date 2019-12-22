import React, {Component} from 'react';
import { View , Text, TouchableOpacity, TextInput, Keyboard,FlatList,ActivityIndicator,StyleSheet,ScrollView } from 'react-native';
import {Image,ListItem,Avatar} from "react-native-elements"
import * as firebase2 from 'firebase';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast, {DURATION} from 'react-native-easy-toast';
import Boton from '../components/botones'
import {firebaseApp} from "../utils/FireBase";
import firebase from "firebase/app"
import "firebase/firestore"
const db=firebase.firestore(firebaseApp)





export default class amigos extends Component {

    constructor(props){
        super(props);
        this.state={
            ...props,
            userInfo:{},
            amigos:null,
            amigos2:null,
            isLoading:false
        }
        
    }
    
    componentDidMount=async()=>{
        await this.getUserInfo();
        this.loadAmigos()
        
    }
    returnUpdateUserInfoComponent=userInfoData=>{
        const list = [
            {
                title: 'Agregar Amigos',
                iconType:"material-community",
                iconNameRight:"chevron-right",
                iconColorRight:"#ccc",
                iconNameLeft:"account-plus",
                iconColorLeft:"#ccc",
                onPress:()=>this.props.navigation.navigate('add')
            },
            
            
          ]
        if(userInfoData.hasOwnProperty("uid")){
            return (
                <View>
                    {
                    list.map((l, i) => (
                    <ListItem
                    key={i}
                    title={l.title}
                    leftIcon={{
                        type:l.iconType,
                        name:l.iconNameLeft,
                        color:l.iconColorLeft
                    }}
                    rightIcon={{
                        type:l.iconType,
                        name:l.iconNameRight,
                        color:l.iconColorRight,
                    }}
                    onPress={l.onPress}
                    containerStyle={l.contentContainerStyle}
                    style={styles.botoneees}
                    />
                    ))
                }
                </View>
            )
        }
    }
    getUserInfo= ()=>{
        const user=firebase2.auth().currentUser;
         user.providerData.forEach(userInfo=>{
            this.setState({
                userInfo
            })

        })
        
    }
    
    checkUserAvatar=photoUrl=>{
        return photoUrl ? photoUrl : "https://api.adorable.io/avatars/285/abott@adorable.png"
    }
    
    
    loadAmigos=async()=>{
        const user=firebase2.auth().currentUser.email       
        let resultAmigos=[]
        let resultAmigos2=[]
    
        const amigos=db.collection("amigosDeveris").where('user2', '==', user)
        const amigos2=db.collection("amigosDeveris").where('user1', '==', user)
        await amigos.get().then(response=>{
            response.forEach(doc=>{
                let amigos=doc.data()
                amigos.id=doc.id
                resultAmigos.push({amigos})
            })
            this.setState({
                amigos:resultAmigos
            })   
        })
        await amigos2.get().then(response=>{
            response.forEach(doc=>{
                let amigos2=doc.data()
                amigos2.id=doc.id
                resultAmigos2.push({amigos2})
            })
            this.setState({
                amigos2:resultAmigos2
            })
        })
    }
    clickNota=(amigo,amigo2)=>{
        if(amigo){ //amigo==user1 yo==user2
            this.props.navigation.navigate("compartir",{amigo})

        }if(amigo2){//amigo==user2 yo==user1
            this.props.navigation.navigate("compartir2",{amigo2})
            
        }
    }
    renderRow=(amigo)=>{
        const user=firebase2.auth().currentUser.email
        const {user1,user2} =amigo.item.amigos;
        if(user==user1){
            return(
                <TouchableOpacity onPress={()=>this.clickNota(amigo)}>
                <View style={styles.viewNotas}>
                    <View>
                        <Image
                            resizeMode="cover"
                            source={require('../utils/imgs/user.png')}
                            style={styles.imgNotas}
                        />
                    </View>
                    <View style={styles.textos}>
                        <Text style={styles.flatListTitulo}>Nombre de tu amigo:</Text>
                        <Text style={styles.flatListMateria}>{user2} </Text>
                        <Text style={styles.flatListContenido}>Click para compartir nota </Text>
                    </View>
                </View>
    
                </TouchableOpacity>
            )
        }else{
            if(user==user2){
                return(
                    <TouchableOpacity onPress={()=>this.clickNota(amigo)}>
                    <View style={styles.viewNotas}>
                        <View>
                            <Image
                                resizeMode="cover"
                                source={require('../utils/imgs/user.png')}
                                style={styles.imgNotas}
                            />
                        </View>
                        <View style={styles.textos}>
                            <Text style={styles.flatListTitulo}>Nombre de tu amigo:</Text>
                            <Text style={styles.flatListMateria}>{user1} </Text>
                            <Text style={styles.flatListContenido}>Click para compartir nota </Text>
                        </View>
                    </View>
        
                    </TouchableOpacity>
                )
            }
        }
        
    }
    
    
    renderFlatList=(amigos)=>{
        if(amigos){
            return(
                
                <FlatList
                    data={this.state.amigos} 
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
                    <Text>Cargando Amigos</Text>
                </View> 
                
            )
        }
    }

    clickAmigo2=(amigo2)=>{
        
        
        
    }
    renderRow2=(amigo2)=>{
        const user=firebase2.auth().currentUser.email
        const {user1,user2} =amigo2.item.amigos2;
        if(user==user1){
            return(
                <TouchableOpacity onPress={()=>this.clickNota(amigo2)}>
                <View style={styles.viewNotas}>
                    <View>
                        <Image
                            resizeMode="cover"
                            source={require('../utils/imgs/user.png')}
                            style={styles.imgNotas}
                        />
                    </View>
                    <View style={styles.textos}>
                        <Text style={styles.flatListTitulo}>Nombre de tu amigo:</Text>
                        <Text style={styles.flatListMateria}>{user2} </Text>
                        <Text style={styles.flatListContenido}>Click para compartir nota </Text>
                    </View>
                </View>
    
                </TouchableOpacity>
            )
        }else{
            if(user==user2){
                return(
                    <TouchableOpacity onPress={()=>this.clickNota(amigo2)}>
                    <View style={styles.viewNotas}>
                        <View>
                            <Image
                                resizeMode="cover"
                                source={require('../utils/imgs/user.png')}
                                style={styles.imgNotas}
                            />
                        </View>
                        <View style={styles.textos}>
                            <Text style={styles.flatListTitulo}>Nombre de tu amigo:</Text>
                            <Text style={styles.flatListMateria}>{user1} </Text>
                            <Text style={styles.flatListContenido}>Click para compartir nota </Text>
                        </View>
                    </View>
        
                    </TouchableOpacity>
                )
            }
        }
        
    }
    
    renderFlatList2=(amigos2)=>{
        if(amigos2){
            return(
                
                <FlatList
                    data={this.state.amigos2} 
                    renderItem={this.renderRow2}   
                    keyExtractor={(item,index)=>index.toString()}   
                    
                    onEndReachedThreshold={0}          
                     
                />
                
                  
            )
        }else{
            return(
                <View style={styles.startLoadNotas}>
                    <ActivityIndicator size="large"/> 
                    <Text>Cargando Amigos</Text>
                </View> 
                
            )
        }
    }

    
    render() {
        const {amigos}=this.state
        const {amigos2}=this.state
        const{displayName,email,photoUrl}=this.state.userInfo;
        this.checkUserAvatar(photoUrl)
        return(
            <ScrollView style={styles.viewBody}>
                <View style={styles.header}>
                <Text style = {styles.textoBoton}>Amigos</Text>
                </View>
                <View >
                    <View style={styles.VBody}>
                        <Avatar
                            rounded
                            size="large"
                            source={{uri:this.checkUserAvatar(photoUrl)}}
                            containerStyle={styles.userInfoAvatar}
                        />
                        <View>
                            <Text style={styles.texto}>{displayName}   </Text>
                            <Text style={styles.texto}>{email}    </Text>
                            
                        </View>
                    </View>
                    
                </View>
                <View>
                {this.returnUpdateUserInfoComponent(this.state.userInfo)}
                    
                   
                       
                </View>
                <View style={styles.header}>
                <Text style = {styles.textoBoton}>Tus Amigos</Text>
                </View>
                <ScrollView style={styles.body}>
                {this.renderFlatList(amigos)}
                {this.renderFlatList2(amigos2)}
                </ScrollView>
            </ScrollView> 
        );
    }
}
const styles=StyleSheet.create({
    viewBody:{
        flex: 1,
        backgroundColor:"#F8FBFB",
    },
    VBody:{
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"row",
        marginTop: 30,
        marginBottom:30,
    },
    userInfoAvatar:{
        
        marginRight:30,
        
    },texto:{
        
        fontWeight:"bold"
    },close:{
        marginTop:390
    },
    contentContainerStyle:{
        borderBottomWidth:1,
        borderBottomColor:"#e3e3d3",
        
    },botoneees:{
        borderBottomWidth:1,
        borderBottomColor:"#e3e3d3",
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
        paddingTop:1,
        color:"grey",
        width:200,
    },loaderNotas:{
        marginTop:5,
        marginBottom:5,
    },notFound:{
        marginTop:10,
        marginBottom:10,
        alignItems:"center",
    },footer:{
        borderTopWidth:1,
        borderTopColor:"#e3e3d3",
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
        },body:{
            
        }
})