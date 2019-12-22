import React, {Component} from 'react';
import { View , Text, Image, TouchableOpacity, TextInput, Keyboard,StyleSheet } from 'react-native';
import * as firebase from 'firebase';
import {ListItem} from "react-native-elements"
import OverlayOneInput from "./OverlayOneInput"
import OverlayTwoInput from "./OverlayTwoInput"
import OverlayThreeInput from "./OverlayThreeInput"
import solicitudes from "../screens/Amigos/solicitudes"
import Toast, {DURATION} from 'react-native-easy-toast';
export default class UpdateUserInfo extends Component {

    constructor(props){
        super(props);
        this.state={
            ...props,
            overlayComponent:null,
            menuItems:[
                {
                    title:"Cambiar Username",
                    iconType:"FontAwesome",
                    iconNameRight:"chevron-right",
                    iconColorRight:"#ccc",
                    iconNameLeft:"account-circle",
                    iconColorLeft:"#ccc",
                    onPress:()=>this.openOverlay("Nombre y Apellidos",this.updateUserDisplayName,props.userInfo.displayName)
                },{
                    title:"Cambiar Contraseña",
                    iconType:"FontAwesome",
                    iconNameRight:"chevron-right",
                    iconColorRight:"#ccc",
                    iconNameLeft:"lock",
                    iconColorLeft:"#ccc",
                    onPress:()=>this.openOverlayThreeInput("Tu Contraseña","Nueva Contraseña","Repite nueva contraseña",this.updateUserPassword)
                }
            ]
        }
    }
    ir=()=>{
        this.props.navigation.navigate("solicitudes")
    }
    updateUserDisplayName = async (newDisplayName)=>{
        if(newDisplayName){
            this.state.updateUserDisplayName(newDisplayName)
        }
        
        this.setState({
            overlayComponent:null
        })
    }
    openOverlay=(placeholder,updateFunction,inputValue)=>{
        this.setState({
            overlayComponent:(
                <OverlayOneInput
                    isVisibleOverlay={true}
                    placeholder={placeholder}
                    updateFunction={updateFunction}
                    inputValue={inputValue}
                />
            )
        })
    }

    updateUserEmail= async(newEmail,password)=>{
        const emailOld=this.props.userInfo.email
        if(emailOld != newEmail && password){
            this.state.updateUserEmail(newEmail,password)
        }
        this.setState({
            overlayComponent:null
        })
    }
    openOverlayTwoInput=(placeholderOne, placeholderTwo, inputValueOne,updateFunction)=>{
        this.setState({
            overlayComponent:(
                <OverlayTwoInput
                    isVisibleOverlay={true}
                    placeholderOne={placeholderOne}
                    placeholderTwo={placeholderTwo}
                    updateFunction={updateFunction}
                    inputValueOne={inputValueOne}
                    isPassword={true}
                    inputValueTwo=""
                />
            )
        })
    }

    updateUserPassword= async(currentPassword,newPassword,repeatNewPassword)=>{

        if(currentPassword&&newPassword&&repeatNewPassword){
            if(newPassword===repeatNewPassword){
                if(currentPassword===newPassword){
                    this.refs.toast.show("La nueva contraseña es igual a la antigua")
                }else{
                    this.state.updateUserPassword(currentPassword,newPassword)
                }
            }else{
                this.refs.toast.show("Tus contraseñas nuevas no son iguales")
            }
        }else{
            this.refs.toast.show("Tienes que rellenar todos los campos")
        }

        this.setState({
            overlayComponent:null
        })
    }

    openOverlayThreeInput=(placeholderOne,placeholderTwo,placeholderThree,updateFunction)=>{
        this.setState({
            overlayComponent:(
                <OverlayThreeInput
                    isVisibleOverlay={true}
                    placeholderOne={placeholderOne}
                    placeholderTwo={placeholderTwo}
                    placeholderThree={placeholderThree}
                    updateFunction={updateFunction}
                    inputValueTwo=""
                    inputValueThree=""
                    inputValueOne=""
                    isPassword={true}
                />
            )
        })
    }

    render() {
        const{menuItems,overlayComponent}=this.state;
        return(
            <View style={styles.container}>
                {
                    menuItems.map((item,index)=>(
                        <ListItem
                            key={index}
                            title={item.title}
                            leftIcon={{
                                type:item.iconType,
                                name:item.iconNameLeft,
                                color:item.iconColorLeft
                            }}
                            rightIcon={{
                                type:item.iconType,
                                name:item.iconNameRight,
                                color:item.iconColorRight,
                            }}
                            onPress={item.onPress}
                            containerStyle={styles.contentContainerStyle}
                            
                        />
                    ))
                }
                {overlayComponent}
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
            </View> 
        );
    }
}
const styles=StyleSheet.create({
    contentContainerStyle:{
        borderBottomWidth:1,
        borderBottomColor:"#e3e3d3",
        
    },
    toastR:{
        marginTop:50,
        width:200,
        alignContent:"center",
        backgroundColor:"#1DA379"
    },
    
})