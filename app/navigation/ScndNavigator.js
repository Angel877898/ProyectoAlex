import { createStackNavigator } from 'react-navigation';
import BottomTab from './BottomTab';
import verFormNota from '../screens/Notas/VerFormNota';

import Main from '../screens/Main';
export default createStackNavigator({
    
    main:BottomTab,
    addNota:verFormNota,
    notas:Main,
    
    
}, 
{
    headerMode: "none",
});