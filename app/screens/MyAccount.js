import React, {Component} from 'react';
import { View , Text, Image, TouchableOpacity, TextInput, Keyboard , StyleSheet,ScrollView} from 'react-native';
import * as firebase from 'firebase';
import UpdateUserInfo from '../components/UpdateUserInfo'
import {Avatar} from "react-native-elements"
import Boton from '../components/botones'
import Toast, {DURATION} from 'react-native-easy-toast';
export default class myaccount extends Component {

    constructor(props){
        super(props);
        this.state={
            ...props,
            userInfo:{}
        }
        
    }
    componentDidMount=async()=>{
        await this.getUserInfo();
        
    }
    getUserInfo= ()=>{
        const user=firebase.auth().currentUser;
         user.providerData.forEach(userInfo=>{
            this.setState({
                userInfo
            })

        })
        
    }
    reauthenticate=currentPassword=>{
        const user =firebase.auth().currentUser;
        const credentials=firebase.auth.EmailAuthProvider.credential(
            user.email,
            currentPassword
        )
        return user.reauthenticateWithCredential(credentials)
    }
    checkUserAvatar=photoUrl=>{
        return photoUrl ? photoUrl : "https://api.adorable.io/avatars/285/abott@adorable.png"
    }
    updateUserDisplayName=async newDisplayName=>{
        const update={
            displayName:newDisplayName
        }
        console.log(update)
        await firebase.auth().currentUser.updateProfile(update)
        this.getUserInfo();
    }

    updateUserEmail=async(newEmail,password)=>{
        this.reauthenticate(password).then(()=>{
            const user=firebase.auth().currentUser;
            user.updateEmail(newEmail).then(()=>{
                this.refs.toast.show("Email actualizado, vualve a iniciar sesion",150,()=>{
                    firebase.auth().signOut();
                    this.props.navigation.navigate('login')
                })
                
            }).catch(err=>{
                this.refs.toast.show("Error desconocido")
            })
        }).catch(err=>{
            this.refs.toast.show("Tu contraseña no es correcta")
        })
    }

    cerrarSesion(){
        firebase.auth().signOut();
        this.props.navigation.navigate('login')
    }

    returnUpdateUserInfoComponent=userInfoData=>{
        if(userInfoData.hasOwnProperty("uid")){
            return (
                <UpdateUserInfo 
                userInfo={this.state.userInfo}
                updateUserDisplayName={this.updateUserDisplayName} 
                updateUserEmail={this.updateUserEmail}
                updateUserPassword={this.updateUserPassword}
                />
            )
        }
    }

    updateUserPassword= async (currentPassword,newPassword)=>{
       this.reauthenticate(currentPassword).then(()=>{
           const user =firebase.auth().currentUser
           user.updatePassword(newPassword).then(()=>{
                this.refs.toast.show("Contraseña actualizada, vuelve a iniciar sesion",100,()=>{
                    firebase.auth().signOut()
                    this.props.navigation.navigate('login')
                })
           }).catch(()=>{
                this.refs.toast.show("Error del servidor o Contraseña tiene que ser minimo de 6 caracteres",1500)
           })
       }).catch(()=>{
            this.refs.toast.show("Contraseña actual incorrecta",1500)
       })
    }
    ir=()=>{
        this.props.navigation.navigate('solicitudes')
    }
    render() {
        const{displayName,email,photoUrl}=this.state.userInfo;
        this.checkUserAvatar(photoUrl)
        return(
            <ScrollView style={styles.viewBody}>
                <View style={styles.header}>
                <Text style = {styles.textoBoton}>Tu Cuenta</Text>
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
                            <Text style={styles.texto}>{displayName}    </Text>
                            <Text style={styles.texto}>{email}    </Text>
                            
                        </View>
                    </View>
                </View>
                
                <View>
                    {this.returnUpdateUserInfoComponent(this.state.userInfo)}
                    
                    <Toast
                        ref="toast"
                        style={styles.toastR}
                        position='center'
                        positionValue={250}
                        fadeInDuration={1000}
                        fadeOutDuration={1000}
                        opacity={0.8}
                        textStyle={{color:"#fff"}}
                        />
                        <View>
                    <TouchableOpacity style = {styles.boton} onPress = {this.ir} >  
                
                         <Text style = {styles.textoBoton}> Solicitudes de Amistad</Text>
                    </TouchableOpacity>
                </View>
                        <View style={styles.close}>
                            <Boton onPress = {() => this.cerrarSesion()} texto = "Cerrar Sesion"/> 
                        </View>
                </View>
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
    toastR:{
        
        width:200,
        alignContent:"center",
        backgroundColor:"#1DA379"
    },
    userInfoAvatar:{
        
        marginRight:30,
        
    },texto:{
        
        fontWeight:"bold"
    },close:{
        marginTop:340
    },boton: {
        justifyContent: "center",
        backgroundColor:"white",
        padding: 8.5,
        marginTop:20,
        borderRadius: 20,
        width: "100%",
        height: 52,
        alignSelf: 'center',
        
    },  
    textoBoton:{
        color: 'black',
        marginLeft:45,
        fontSize: 16,
        textAlign: 'left',
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
        }
})