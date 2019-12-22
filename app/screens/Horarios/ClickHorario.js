import React,{Component} from "react";
import {StyleSheet,View,Text,ScrollView,TouchableOpacity} from "react-native"
import {Image,Icon,ListItem} from "react-native-elements"
import BotonV from '../../components/botonesV'
import BotonR from '../../components/botonesR'
import BotonLargo from '../../components/BotonLargo'
import {firebaseApp} from "../../utils/FireBase";
import firebase from "firebase/app"
import "firebase/firestore"
const db=firebase.firestore(firebaseApp)
import Toast, {DURATION} from 'react-native-easy-toast';
import * as firebase2 from 'firebase';
import moment, { locale } from "moment"
import PushController from '../../utils/PushController'
import PushNotification from 'react-native-push-notification'
export default class ClickHorario extends Component{
    constructor(props){
        super(props)
        this.state={
            date:""
        }
    
    }
    componentDidMount(){
        
        
        var that = this;
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours()-6; //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds
        that.setState({
        //Setting the value of the date time
        date:
             year+ '-' + month + '-' + date + ' ' + hours + ':' + min ,
        });

    }
    crearRecordatorio(){
        let {HoraInicio,horaFin,materia,dias}=this.props.navigation.state.params.horario.item.horarios
        let {dia1,dia2}=0
        
        
        if(dias=="Lunes"){
            dia1=1
            dia2=3
        }
        if(dias=="Martes"){
            dia1=2
            dia2=4
        }
        if(dias=="Viernes"){
            dia1=5
            dia2=5
        }
        
        
        
        
        const dia=new Date().getDay();
        console.log(dias);
        console.log(dia1);
        console.log(dia2);
        if(dia==0){
            if(dia1==1){
                console.log("Recordatorio Lunes");
                let hora=HoraInicio.toString()
                hora=hora.substring(0,2)
                let minutos=HoraInicio.toString()
                minutos=minutos.substring(3,5)
                minutos=parseInt(minutos,10)
                hora=parseInt(hora,10)
                let fecha=moment(this.state.date,"YYYY-MM-DD HH:mm").toDate()

                fecha.setDate(fecha.getDate()+1)
                fecha.setHours(hora)
                fecha.setMinutes(minutos)
                console.log(fecha);
                const ahora=new Date()
                console.log();
                
                PushNotification.localNotificationSchedule({

                    message: "Tienes clase de "+materia, 
                    date: fecha

                  });
                  this.refs.toast.show('Recordatorio de mañana lunes creado',100,()=>{
                
                    this.props.navigation.navigate('main')
    
                })
            }
            if(dia1==2){
                console.log("Recordatorio Martes");
                let hora=HoraInicio.toString()
                hora=hora.substring(0,2)
                let minutos=HoraInicio.toString()
                minutos=minutos.substring(3,5)
                minutos=parseInt(minutos,10)
                hora=parseInt(hora,10)
                let fecha=moment(this.state.date,"YYYY-MM-DD HH:mm").toDate()

                fecha.setDate(fecha.getDate()+2)
                fecha.setHours(hora)
                fecha.setMinutes(minutos)
                console.log(fecha);
                const ahora=new Date()
                console.log();
                
                PushNotification.localNotificationSchedule({

                    message: "Tienes clase de "+materia, 
                    date: fecha

                  });
                  this.refs.toast.show('Recordatorio del siguiente martes creado',100,()=>{
                
                    this.props.navigation.navigate('main')
    
                })
            }
            if(dia1==5){
                
                console.log("Tiene que ser a las "+HoraInicio);
                let hora=HoraInicio.toString()
                hora=hora.substring(0,2)
                let minutos=HoraInicio.toString()
                minutos=minutos.substring(3,5)
                minutos=parseInt(minutos,10)
                hora=parseInt(hora,10)
                let fecha=moment(this.state.date,"YYYY-MM-DD HH:mm").toDate()

                fecha.setDate(fecha.getDate()+5)
                fecha.setHours(hora)
                fecha.setMinutes(minutos)
                console.log(fecha);
                const ahora=new Date()
                console.log();
                
                PushNotification.localNotificationSchedule({

                    message: "Tienes clase de "+materia, 
                    date: fecha

                  });
                  this.refs.toast.show('Recordatorio del Siguiente viernes creado',100,()=>{
                
                    this.props.navigation.navigate('main')
    
                })
            }
        }
        if(dia==1){
            if(dia1==1){
                console.log("Recordatorio Lunes");
                let hora=HoraInicio.toString()
                hora=hora.substring(0,2)
                let minutos=HoraInicio.toString()
                minutos=minutos.substring(3,5)
                minutos=parseInt(minutos,10)
                hora=parseInt(hora,10)
                let fecha=moment(this.state.date,"YYYY-MM-DD HH:mm").toDate()

                fecha.setDate(fecha.getDate())
                fecha.setHours(hora)
                fecha.setMinutes(minutos)
                console.log(fecha);
                const ahora=new Date()
                console.log();
                
                PushNotification.localNotificationSchedule({

                    message: "Tienes clase de "+materia, 
                    date: fecha

                  });
                  this.refs.toast.show('Recordatorio del siguiente miercoles creado',100,()=>{
                
                    this.props.navigation.navigate('main')
    
                })
            }
            if(dia2==3){
                console.log("Recordatorio Miercoles");
                let hora=HoraInicio.toString()
                hora=hora.substring(0,2)
                let minutos=HoraInicio.toString()
                minutos=minutos.substring(3,5)
                minutos=parseInt(minutos,10)
                hora=parseInt(hora,10)
                let fecha=moment(this.state.date,"YYYY-MM-DD HH:mm").toDate()

                fecha.setDate(fecha.getDate()+2)
                fecha.setHours(hora)
                fecha.setMinutes(minutos)
                console.log(fecha);
                const ahora=new Date()
                console.log();
                
                PushNotification.localNotificationSchedule({

                    message: "Tienes clase de "+materia, 
                    date: fecha

                  });
                  this.refs.toast.show('Recordatorio del siguiente miercoles creado',100,()=>{
                
                    this.props.navigation.navigate('main')
    
                })
            }
            if(dia1==2){
                console.log("Recordatorio Martes");
                let hora=HoraInicio.toString()
                hora=hora.substring(0,2)
                let minutos=HoraInicio.toString()
                minutos=minutos.substring(3,5)
                minutos=parseInt(minutos,10)
                hora=parseInt(hora,10)
                let fecha=moment(this.state.date,"YYYY-MM-DD HH:mm").toDate()

                fecha.setDate(fecha.getDate()+1)
                fecha.setHours(hora)
                fecha.setMinutes(minutos)
                console.log(fecha);
                const ahora=new Date()
                console.log();
                
                PushNotification.localNotificationSchedule({

                    message: "Tienes clase de "+materia, 
                    date: fecha

                  });
                  this.refs.toast.show('Recordatorio del siguiente martes creado',100,()=>{
                
                    this.props.navigation.navigate('main')
    
                })
            }
            if(dia1==5){
                console.log("Recordatorio Viernes");
                let hora=HoraInicio.toString()
                hora=hora.substring(0,2)
                let minutos=HoraInicio.toString()
                minutos=minutos.substring(3,5)
                minutos=parseInt(minutos,10)
                hora=parseInt(hora,10)
                let fecha=moment(this.state.date,"YYYY-MM-DD HH:mm").toDate()

                fecha.setDate(fecha.getDate()+4)
                fecha.setHours(hora)
                fecha.setMinutes(minutos)
                console.log(fecha);
                const ahora=new Date()
                console.log();
                
                PushNotification.localNotificationSchedule({

                    message: "Tienes clase de "+materia, 
                    date: fecha

                  });
                  this.refs.toast.show('Recordatorio del siguiente viernes creado',100,()=>{
                
                    this.props.navigation.navigate('main')
    
                })
            }
        }
        if(dia==2){
            if(dia2==3){
                console.log("Recordatorio Miercoles");
                let hora=HoraInicio.toString()
                hora=hora.substring(0,2)
                let minutos=HoraInicio.toString()
                minutos=minutos.substring(3,5)
                minutos=parseInt(minutos,10)
                hora=parseInt(hora,10)
                let fecha=moment(this.state.date,"YYYY-MM-DD HH:mm").toDate()

                fecha.setDate(fecha.getDate()+1)
                fecha.setHours(hora)
                fecha.setMinutes(minutos)
                console.log(fecha);
                const ahora=new Date()
                console.log();
                
                PushNotification.localNotificationSchedule({

                    message: "Tienes clase de "+materia, 
                    date: fecha

                  });
                  this.refs.toast.show('Recordatorio de mañana miercoles creado',100,()=>{
                
                    this.props.navigation.navigate('main')
    
                })
            }
            if(dia1==2){
                console.log("Recordatorio Martes");
                let hora=HoraInicio.toString()
                hora=hora.substring(0,2)
                let minutos=HoraInicio.toString()
                minutos=minutos.substring(3,5)
                minutos=parseInt(minutos,10)
                hora=parseInt(hora,10)
                let fecha=moment(this.state.date,"YYYY-MM-DD HH:mm").toDate()

                fecha.setDate(fecha.getDate())
                fecha.setHours(hora)
                fecha.setMinutes(minutos)
                console.log(fecha);
                const ahora=new Date()
                console.log();
                
                PushNotification.localNotificationSchedule({

                    message: "Tienes clase de "+materia, 
                    date: fecha

                  });
                  this.refs.toast.show('Recordatorio de mañana miercoles creado',100,()=>{
                
                    this.props.navigation.navigate('main')
    
                })
            }
            if(dia2==4){
                console.log("Recordatorio Jueves");
                let hora=HoraInicio.toString()
                hora=hora.substring(0,2)
                let minutos=HoraInicio.toString()
                minutos=minutos.substring(3,5)
                minutos=parseInt(minutos,10)
                hora=parseInt(hora,10)
                let fecha=moment(this.state.date,"YYYY-MM-DD HH:mm").toDate()

                fecha.setDate(fecha.getDate()+2)
                fecha.setHours(hora)
                fecha.setMinutes(minutos)
                console.log(fecha);
                const ahora=new Date()
                console.log();
                
                PushNotification.localNotificationSchedule({

                    message: "Tienes clase de "+materia, 
                    date: fecha

                  });
                  this.refs.toast.show('Recordatorio del siguiente jueves creado',100,()=>{
                
                    this.props.navigation.navigate('main')
    
                })
            }
            if(dia1==5){
                console.log("Recordatorio Viernes");
                let hora=HoraInicio.toString()
                hora=hora.substring(0,2)
                let minutos=HoraInicio.toString()
                minutos=minutos.substring(3,5)
                minutos=parseInt(minutos,10)
                hora=parseInt(hora,10)
                let fecha=moment(this.state.date,"YYYY-MM-DD HH:mm").toDate()

                fecha.setDate(fecha.getDate()+3)
                fecha.setHours(hora)
                fecha.setMinutes(minutos)
                console.log(fecha);
                const ahora=new Date()
                console.log();
                
                PushNotification.localNotificationSchedule({

                    message: "Tienes clase de "+materia, 
                    date: fecha

                  });
                  this.refs.toast.show('Recordatorio del siguiente viernes creado',100,()=>{
                
                    this.props.navigation.navigate('main')
    
                })
            }
        }
        if(dia==3){
            if(dia1==1){
                console.log("Recordatorio Siguiente lunes");
                let hora=HoraInicio.toString()
                hora=hora.substring(0,2)
                let minutos=HoraInicio.toString()
                minutos=minutos.substring(3,5)
                minutos=parseInt(minutos,10)
                hora=parseInt(hora,10)
                let fecha=moment(this.state.date,"YYYY-MM-DD HH:mm").toDate()

                fecha.setDate(fecha.getDate()+5)
                fecha.setHours(hora)
                fecha.setMinutes(minutos)
                console.log(fecha);
                const ahora=new Date()
                console.log();
                
                PushNotification.localNotificationSchedule({

                    message: "Tienes clase de "+materia, 
                    date: fecha

                  });
                  this.refs.toast.show('Recordatorio del siguiente lunes creado',100,()=>{
                
                    this.props.navigation.navigate('main')
    
                })
            }
            if(dia2==3){
                console.log("Recordatorio Miercoles");
                let hora=HoraInicio.toString()
                hora=hora.substring(0,2)
                let minutos=HoraInicio.toString()
                minutos=minutos.substring(3,5)
                minutos=parseInt(minutos,10)
                hora=parseInt(hora,10)
                let fecha=moment(this.state.date,"YYYY-MM-DD HH:mm").toDate()

                fecha.setDate(fecha.getDate())
                fecha.setHours(hora)
                fecha.setMinutes(minutos)
                console.log(fecha);
                const ahora=new Date()
                console.log();
                
                PushNotification.localNotificationSchedule({

                    message: "Tienes clase de "+materia, 
                    date: fecha

                  });
                  this.refs.toast.show('Recordatorio de mañana miercoles creado',100,()=>{
                
                    this.props.navigation.navigate('main')
    
                })
            }
            if(dia2==4){
                console.log("Recordatorio Jueves");
                let hora=HoraInicio.toString()
                hora=hora.substring(0,2)
                let minutos=HoraInicio.toString()
                minutos=minutos.substring(3,5)
                minutos=parseInt(minutos,10)
                hora=parseInt(hora,10)
                let fecha=moment(this.state.date,"YYYY-MM-DD HH:mm").toDate()

                fecha.setDate(fecha.getDate()+1)
                fecha.setHours(hora)
                fecha.setMinutes(minutos)
                console.log(fecha);
                const ahora=new Date()
                console.log();
                
                PushNotification.localNotificationSchedule({

                    message: "Tienes clase de "+materia, 
                    date: fecha

                  });
                  this.refs.toast.show('Recordatorio de mañana jueves creado',100,()=>{
                
                    this.props.navigation.navigate('main')
    
                })
            }
            if(dia1==5){
                console.log("Recordatorio Viernes");
                let hora=HoraInicio.toString()
                hora=hora.substring(0,2)
                let minutos=HoraInicio.toString()
                minutos=minutos.substring(3,5)
                minutos=parseInt(minutos,10)
                hora=parseInt(hora,10)
                let fecha=moment(this.state.date,"YYYY-MM-DD HH:mm").toDate()

                fecha.setDate(fecha.getDate()+2)
                fecha.setHours(hora)
                fecha.setMinutes(minutos)
                console.log(fecha);
                const ahora=new Date()
                console.log();
                
                PushNotification.localNotificationSchedule({

                    message: "Tienes clase de "+materia, 
                    date: fecha

                  });
                  this.refs.toast.show('Recordatorio del siguiente viernes creado',100,()=>{
                
                    this.props.navigation.navigate('main')
    
                })
            }
        }
        if(dia==4){
            if(dia1==1){
                console.log("Recordatorio Siguiente lunes");
                let hora=HoraInicio.toString()
                hora=hora.substring(0,2)
                let minutos=HoraInicio.toString()
                minutos=minutos.substring(3,5)
                minutos=parseInt(minutos,10)
                hora=parseInt(hora,10)
                let fecha=moment(this.state.date,"YYYY-MM-DD HH:mm").toDate()

                fecha.setDate(fecha.getDate()+4)
                fecha.setHours(hora)
                fecha.setMinutes(minutos)
                console.log(fecha);
                const ahora=new Date()
                console.log();
                
                PushNotification.localNotificationSchedule({

                    message: "Tienes clase de "+materia, 
                    date: fecha

                  });
                  this.refs.toast.show('Recordatorio del siguiente martes creado',100,()=>{
                
                    this.props.navigation.navigate('main')
    
                })
            }
            if(dia2==4){
                console.log("Recordatorio Jueves");
                let hora=HoraInicio.toString()
                hora=hora.substring(0,2)
                let minutos=HoraInicio.toString()
                minutos=minutos.substring(3,5)
                minutos=parseInt(minutos,10)
                hora=parseInt(hora,10)
                let fecha=moment(this.state.date,"YYYY-MM-DD HH:mm").toDate()

                fecha.setDate(fecha.getDate())
                fecha.setHours(hora)
                fecha.setMinutes(minutos)
                console.log(fecha);
                const ahora=new Date()
                console.log();
                
                PushNotification.localNotificationSchedule({

                    message: "Tienes clase de "+materia, 
                    date: fecha

                  });
                  this.refs.toast.show('Recordatorio de mañana miercoles creado',100,()=>{
                
                    this.props.navigation.navigate('main')
    
                })
            }
            if(dia1==2){
                console.log("Recordatorio Siguiente Martes");
                let hora=HoraInicio.toString()
                hora=hora.substring(0,2)
                let minutos=HoraInicio.toString()
                minutos=minutos.substring(3,5)
                minutos=parseInt(minutos,10)
                hora=parseInt(hora,10)
                let fecha=moment(this.state.date,"YYYY-MM-DD HH:mm").toDate()

                fecha.setDate(fecha.getDate()+5)
                fecha.setHours(hora)
                fecha.setMinutes(minutos)
                console.log(fecha);
                const ahora=new Date()
                console.log();
                
                PushNotification.localNotificationSchedule({

                    message: "Tienes clase de "+materia, 
                    date: fecha

                  });
                  this.refs.toast.show('Recordatorio del siguiente martes creado',100,()=>{
                
                    this.props.navigation.navigate('main')
    
                })
            }
            if(dia1==5){
                console.log("Recordatorio Viernes");
                let hora=HoraInicio.toString()
                hora=hora.substring(0,2)
                let minutos=HoraInicio.toString()
                minutos=minutos.substring(3,5)
                minutos=parseInt(minutos,10)
                hora=parseInt(hora,10)
                let fecha=moment(this.state.date,"YYYY-MM-DD HH:mm").toDate()

                fecha.setDate(fecha.getDate()+1)
                fecha.setHours(hora)
                fecha.setMinutes(minutos)
                console.log(fecha);
                const ahora=new Date()
                console.log();
                
                PushNotification.localNotificationSchedule({

                    message: "Tienes clase de "+materia, 
                    date: fecha

                  });
                  this.refs.toast.show('Recordatorio de mañana viernes creado',100,()=>{
                
                    this.props.navigation.navigate('main')
    
                })
            }
        }
        if(dia==5){
            if(dia1==1){
                console.log("Recordatorio Siguiente lunes");
                let hora=HoraInicio.toString()
                hora=hora.substring(0,2)
                let minutos=HoraInicio.toString()
                minutos=minutos.substring(3,5)
                minutos=parseInt(minutos,10)
                hora=parseInt(hora,10)
                let fecha=moment(this.state.date,"YYYY-MM-DD HH:mm").toDate()

                fecha.setDate(fecha.getDate()+3)
                fecha.setHours(hora)
                fecha.setMinutes(minutos)
                console.log(fecha);
                const ahora=new Date()
                console.log();
                
                PushNotification.localNotificationSchedule({

                    message: "Tienes clase de "+materia, 
                    date: fecha

                  });
                  this.refs.toast.show('Recordatorio del siguiente lunes creado',100,()=>{
                
                    this.props.navigation.navigate('main')
    
                })
            }
            if(dia1==2){
                console.log("Recordatorio Siguiente Martes");
                let hora=HoraInicio.toString()
                hora=hora.substring(0,2)
                let minutos=HoraInicio.toString()
                minutos=minutos.substring(3,5)
                minutos=parseInt(minutos,10)
                hora=parseInt(hora,10)
                let fecha=moment(this.state.date,"YYYY-MM-DD HH:mm").toDate()

                fecha.setDate(fecha.getDate()+4)
                fecha.setHours(hora)
                fecha.setMinutes(minutos)
                console.log(fecha);
                const ahora=new Date()
                console.log();
                
                PushNotification.localNotificationSchedule({

                    message: "Tienes clase de "+materia, 
                    date: fecha

                  });
                  this.refs.toast.show('Recordatorio del siguiente martes creado',100,()=>{
                
                    this.props.navigation.navigate('main')
    
                })
            }
            if(dia1==5){
                console.log("Recordatorio Viernes");
                let hora=HoraInicio.toString()
                hora=hora.substring(0,2)
                let minutos=HoraInicio.toString()
                minutos=minutos.substring(3,5)
                minutos=parseInt(minutos,10)
                hora=parseInt(hora,10)
                let fecha=moment(this.state.date,"YYYY-MM-DD HH:mm").toDate()

                fecha.setDate(fecha.getDate())
                fecha.setHours(hora)
                fecha.setMinutes(minutos)
                console.log(fecha);
                const ahora=new Date()
                console.log();
                
                PushNotification.localNotificationSchedule({

                    message: "Tienes clase de "+materia, 
                    date: fecha

                  });
                  this.refs.toast.show('Recordatorio de mañana miercoles creado',100,()=>{
                
                    this.props.navigation.navigate('main')
    
                })
            }
            if(dia2==5){
                console.log("Recordatorio Siguiente Viernes");
                let hora=HoraInicio.toString()
                hora=hora.substring(0,2)
                let minutos=HoraInicio.toString()
                minutos=minutos.substring(3,5)
                minutos=parseInt(minutos,10)
                hora=parseInt(hora,10)
                let fecha=moment(this.state.date,"YYYY-MM-DD HH:mm").toDate()

                fecha.setDate(fecha.getDate()+7)
                fecha.setHours(hora)
                fecha.setMinutes(minutos)
                console.log(fecha);
                const ahora=new Date()
                console.log();
                
                PushNotification.localNotificationSchedule({

                    message: "Tienes clase de "+materia, 
                    date: fecha

                  });
                  this.refs.toast.show('Recordatorio del siguiente viernes creado',100,()=>{
                
                    this.props.navigation.navigate('main')
    
                })
            }
        }
        if(dia==6){
            if(dia1==1){
                console.log("Recordatorio Siguiente Lunes");
                let hora=HoraInicio.toString()
                hora=hora.substring(0,2)
                let minutos=HoraInicio.toString()
                minutos=minutos.substring(3,5)
                minutos=parseInt(minutos,10)
                hora=parseInt(hora,10)
                let fecha=moment(this.state.date,"YYYY-MM-DD HH:mm").toDate()

                fecha.setDate(fecha.getDate()+2)
                fecha.setHours(hora)
                fecha.setMinutes(minutos)
                console.log(fecha);
                const ahora=new Date()
                console.log();
                
                PushNotification.localNotificationSchedule({

                    message: "Tienes clase de "+materia, 
                    date: fecha

                  });
                  
            }
            if(dia1==2){
                console.log("Recordatorio Siguiente Martes");
                let hora=HoraInicio.toString()
                hora=hora.substring(0,2)
                let minutos=HoraInicio.toString()
                minutos=minutos.substring(3,5)
                minutos=parseInt(minutos,10)
                hora=parseInt(hora,10)
                let fecha=moment(this.state.date,"YYYY-MM-DD HH:mm").toDate()

                fecha.setDate(fecha.getDate()+3)
                fecha.setHours(hora)
                fecha.setMinutes(minutos)
                console.log(fecha);
                const ahora=new Date()
                console.log();
                
                PushNotification.localNotificationSchedule({

                    message: "Tienes clase de "+materia, 
                    date: fecha

                  });
                  this.refs.toast.show('Recordatorio del siguiente martes creado',100,()=>{
                
                    this.props.navigation.navigate('main')
    
                })
            }
            if(dia1==5){
                console.log("Recordatorio Siguiente Viernes");
                let hora=HoraInicio.toString()
                hora=hora.substring(0,2)
                let minutos=HoraInicio.toString()
                minutos=minutos.substring(3,5)
                minutos=parseInt(minutos,10)
                hora=parseInt(hora,10)
                let fecha=moment(this.state.date,"YYYY-MM-DD HH:mm").toDate()

                fecha.setDate(fecha.getDate()+6)
                fecha.setHours(hora)
                fecha.setMinutes(minutos)
                console.log(fecha);
                const ahora=new Date()
                
                
                PushNotification.localNotificationSchedule({

                    message: "Tienes clase de "+materia, 
                    date: fecha,
                    
                  });
                  
            }
        }

        
        
    }
    eliminar=()=>{
        console.log("elimina2");
        const {user,original,id}=this.props.navigation.state.params.horario.item.horarios
        console.log(id);
        
        const usuario=firebase2.auth().currentUser.email
        db.collection('horario').doc(id).delete().then(resolve=>{
            this.refs.toast.show('Eliminacion exitosa',100,()=>{
                
                this.props.navigation.navigate('main')

            })
        }).catch(()=>{
            this.refs.toast.show('Error de Servidor intenta luego')
            
            
        })
        
    }
    render(){
        let {HoraInicio,horaFin,materia,dias}=this.props.navigation.state.params.horario.item.horarios
        if(dias=="Lunes"){
            dias="Lunes y Miercoles"
        }
        if(dias=="Martes"){
            dias="Martes y Jueves"
        }
        
        return(
            <View style={styles.viewBody}>
                <View style={styles.header}>
                <Text style = {styles.textoBoton}>Tus Horarios</Text>
                </View>
                <View>
                    <View style = {styles.Materia}>
                    <Text style = {styles.textoMateria}>Materia: {materia} </Text>
                    </View>
                    <View style = {styles.Materia}>
                    <Text style = {styles.textoMateria}>Hora de la materia: {HoraInicio+" - "+horaFin} </Text>
                    
                    </View>
                    <View style = {styles.Materia2}>
                    <Text style = {styles.textoMateria}>Día/s de la materia: {dias} </Text>
                    
                    </View>
                   
                   
                    <PushController/>
                </View>
                <View style={styles.footer}>
                
                <BotonV onPress = {() => this.eliminar()}  texto = "Eliminar"/> 
                <BotonR onPress = {() => this.props.navigation.navigate('main')}  texto = "Regresar"/> 
                
                </View>
                <View>
                <BotonLargo onPress = {() => this.crearRecordatorio()}  texto = "Crear Proximo Recordatorio"/> 
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
    },Materia:{
        backgroundColor:"#ECF1EA",
        width: "90%",
        alignSelf: 'center',
        justifyContent: "center",
        marginTop:30,
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
        
        marginTop:3,
        height:"55%",
        borderRadius:5
    },Materia2:{
        backgroundColor:"#ECF1EA",
        width: "90%",
        alignSelf: 'center',
        justifyContent: "center",
        marginTop:30,
        height:55,
        borderRadius:30
    },footer:{
        flexDirection:"row",
        marginTop:40
    },toastR:{
        marginTop:70,
        width:200,
        height:50,
        alignContent:"center",
        backgroundColor:"#1DA379"
    },botonR: {
        justifyContent: "center",
        backgroundColor: '#34d127',
        padding: 8.5,
        marginLeft:25,
        marginTop:30,
        borderRadius: 20,
        width: 170,
        height: 40,
        alignSelf: 'center',
        
    }, 
    textoBoton2:{
      color: '#FFF',
      fontWeight: 'bold',
      fontSize: 15,
      textAlign: 'center',
  }
    
    
})