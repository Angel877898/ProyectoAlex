import React, {Component} from 'react';
import { View , Text, Image, TouchableOpacity, TextInput, Keyboard,StyleSheet } from 'react-native';
import * as firebase from 'firebase';
import {Overlay,Input,Button,Icon} from "react-native-elements"
export default class OverlayThreeInput extends Component {
    constructor(props){
        super(props);
        this.state={
            ...props
        }
        
    }
    onChangeInputOne=inputData =>{
        this.setState({
            inputValueOne:inputData
        })
    }
    onChangeInputTwo=inputData =>{
        this.setState({
            inputValueTwo:inputData
        })
    }
    onChangeInputThree=inputData =>{
        this.setState({
            inputValueThree:inputData
        })
    }
    update=()=>{
        const newValueOne=this.state.inputValueOne;
        const newValueTwo=this.state.inputValueTwo;
        const newValueThree=this.state.inputValueThree;
        this.state.updateFunction(newValueOne,newValueTwo,newValueThree)
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
        const{isVisibleOverlay,placeholderOne,placeholderTwo,placeholderThree,inputValueOne,inputValueTwo,inputValueThree,isPassword}=this.state;
        return(
            <Overlay 
            isVisible={isVisibleOverlay}
            overlayBackgroundColor="transparent"
            overlayStyle={styles.overlayStyle}>
                <View style={styles.viewOverlay}>
                    <Input 
                    containerStyle={styles.inputContainer} 
                    placeholder={placeholderOne}
                    onChangeText={value=>this.onChangeInputOne(value)} 
                    value={inputValueOne}
                    password={isPassword}
                    secureTextEntry={isPassword} 
                    />
                    <Input 
                    containerStyle={styles.inputContainer} 
                    placeholder={placeholderTwo}
                    password={isPassword}
                    secureTextEntry={isPassword}
                    onChangeText={value=>this.onChangeInputTwo(value)} 
                    value={inputValueTwo} />
                    <Input 
                    containerStyle={styles.inputContainer} 
                    placeholder={placeholderThree}
                    password={isPassword}
                    secureTextEntry={isPassword}
                    onChangeText={value=>this.onChangeInputThree(value)} 
                    value={inputValueThree} />
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
        height:300,
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