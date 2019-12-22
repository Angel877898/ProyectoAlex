import { StyleSheet } from 'react-native';

//COLORES
const fondo = '#F8FBFB';
const titulos = '#707070';
const texto = '#BDC6CD';

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: fondo,
    },
    toast:{
        marginTop:180,
        width:200,
        alignContent:"center",
        backgroundColor:"#1DA379"
    },
    toastR:{
        marginTop:150,
        width:200,
        alignContent:"center",
        backgroundColor:"#1DA379"
    },
    input:{
        justifyContent: "center",
        backgroundColor: '#F3F3F3',
        padding: 5,
        margin: 5,
        borderRadius: 20,
        width: 300,
        height: 41.5,
        textAlign: 'center',
        alignSelf: 'center'
      },
    RegisterContainer:{
        marginTop:40,
        marginBottom:1,
        backgroundColor: fondo,
    },
    titles: {
        color: titulos,
        fontWeight: 'bold',
        fontSize: 30,
        alignSelf: "center",
        marginBottom: 50,
    },
    titles2: {
        color: titulos,
        fontWeight: 'bold',
        fontSize: 26,
        alignSelf: "center",
        marginBottom: "5%",
    },
    Registertitles: {
        color: titulos,
        fontWeight: 'bold',
        fontSize: 30,
        alignSelf: "center",
        marginBottom: 20,
    },
    Datostitles: {
        color: titulos,
        fontWeight: 'bold',
        fontSize: 20,
        alignSelf: "center",
        marginBottom: 20,
    },
    Registertitles2: {
        color: titulos,
        fontWeight: 'bold',
        fontSize: 30,
        alignSelf: "center",
        marginBottom: 20,
    },
    logo:{
        width: 245,
        height: 245,
        alignSelf: 'center',
    },
    texto:{
        textAlign: "center",
        color: texto,
        margin:7.5,
        fontWeight: 'bold',
    },
    profilePhoto:{
        position: 'absolute',
        top: 50,
        width: 150,
        height: 150,
    },
    contBotonCirc:{
        // flex: .5,
        flexDirection: "row",
        justifyContent: 'space-around',
        // backgroundColor: '#000',
        width: '100%',
    },
    //PRUEBAS --> Botones de login en API
    // prueba1:{
    //     backgroundColor: "#56af54",
    //     flexDirection: "row",
    //     justifyContent: "space-around",
    //     width: 300,
    //     alignSelf: "center",
    // },
    // gl:{
    //     backgroundColor: "#000",
    //     width: 100,
    // },
    // fb:{
    //     backgroundColor: "#000",
    //     width: 100,
    // // },
    // userProfile:{
    //     backgroundColor: "#6f8926",
    // },  
});

export default styles;