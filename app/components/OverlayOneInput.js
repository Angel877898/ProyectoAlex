import React, {Component} from 'react';
import { View , Text, Image, TouchableOpacity, TextInput, Keyboard,StyleSheet } from 'react-native';
import * as firebase from 'firebase';
import {Overlay,Input,Button,Icon} from "react-native-elements"
export default class OverlayOneInput extends Component {
    constructor(props){
        super(props);
        this.state={
            ...props
        }
        
    }
    onChangeInput=inputData =>{
        this.setState({
            inputValue:inputData
        })
    }
    update=()=>{
        const newValue=this.state.inputValue;
        this.state.updateFunction(newValue);
        this.setState({
            isVisibleOverlay:false
        })
    }
    close=()=>{
        this.setState({
            isVisibleOverlay:false
        })
        this.state.updateFunction(null)
    }

    render(){
        const{isVisibleOverlay,placeholder,inputValue}=this.state;
        return(
            <Overlay 
            isVisible={isVisibleOverlay}
            overlayBackgroundColor="transparent"
            overlayStyle={styles.overlayStyle}>
                <View style={styles.viewOverlay}>
                    <Input 
                    containerStyle={styles.inputContainer} 
                    placeholder={placeholder}
                    onChangeText={value=>this.onChangeInput(value)} 
                    value={inputValue} />
                    <Button 
                    buttonStyle={styles.buttonUpdate} 
                    title="Actualizar" 
                    onPress={()=>this.update()} />
                    <Icon
                        containerStyle={styles.containerIconClose}
                        type="FontAwezome"
                        name="close"
                        size={30}
                        onPress={()=>this.close()}
                    />
                </View>
            </Overlay>
        )
    }
}
const styles=StyleSheet.create({
    overlayStyle:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        
    },
    viewOverlay:{
        width:"100%",
        backgroundColor:"#fff",
        padding:20,
        height:150,
        borderColor: "#00a680",
        borderWidth:2,
    },inputContainer:{
        marginBottom: 20,
    },buttonUpdate:{
        backgroundColor:"#00a680"
    },containerIconClose:{
        position:"absolute",
        right:-3,
        top:-3
    }
})