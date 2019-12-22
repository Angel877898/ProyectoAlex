import {createStackNavigator, createAppContainer, createSwitchNavigator} from 'react-navigation';

import Login from '../screens/Login';
import Register from '../screens/Register';
import Main from '../screens/Main';
import Datos from '../screens/Datos';
import BottomTab from './BottomTab';
import verFormNota from '../screens/Notas/VerFormNota';
import add from '../screens/Amigos/Add';
import ClickHorario from '../screens/Horarios/ClickHorario';
import Nota from "../screens/Notas/nota"
import Solicitudes from "../screens/Amigos/solicitudes"
import UpdateUserInfo from "../components/UpdateUserInfo"
import Compartir from "../screens/Amigos/Compartir"
import formHorario from '../screens/Horarios/FormHorario';
import amigos from '../screens/Amigos';
export default createAppContainer(createSwitchNavigator({
    
    login: Login,
    register:Register,
    main:BottomTab,
    datos:Datos,
    nota:Nota,
    addNota:verFormNota,
    notas:Main,
    add:add,
    compartir:Compartir,
    ClickHorario:ClickHorario,
    solicitudes:Solicitudes,
    addHorario:formHorario,
    amigos:amigos
    
}));

