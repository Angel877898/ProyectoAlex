import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import amigos from '../screens/Amigos';
import horario from '../screens/Horario';
import main from '../screens/Main'; 
import myaccount from '../screens/MyAccount';
// import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

export default createBottomTabNavigator({  
    horario: {
        screen: horario,
        navigationOptions: {
            tabBarLabel: "Horario",
            tabBarIcon: ({tintColor}) => (
                <Icon name="calendar" size={25} color={tintColor} />
            ),
        }
    },
    main: {
        screen: main,
        navigationOptions: {
            tabBarLabel: "Apuntes",
            tabBarIcon: ({tintColor}) => (
                <Icon name="book" size={25} color={tintColor} />
            ),
        }
    },
    amigos: {
        screen: amigos,
        navigationOptions: {
            tabBarLabel: "Amigos",
            tabBarIcon: ({tintColor}) => (
                <Icon name={"users"} size={25} color={tintColor} />
            ),
        }
    },  
    myaccount: {
        screen: myaccount,
        navigationOptions: {
            tabBarLabel: "Perfil",
            tabBarIcon: ({tintColor}) => (
                <Icon name="user" size={25} color={tintColor} />
            ),
        }
    },   
},
{
    tabBarOptions: {
        activeTintColor: '#1DA379'
    }
});