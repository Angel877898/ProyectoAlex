import firebase from "firebase/app";

const firebaseConfig={
        apiKey: "AIzaSyAhPasUBEJnXbiXRzvjNKGjr-GVDQhT9BY",
        authDomain: "remider-info.firebaseapp.com",
        databaseURL: "https://remider-info.firebaseio.com",
        projectId: "remider-info",
        storageBucket: "remider-info.appspot.com",
        messagingSenderId: "38238201828",
        appId: "1:38238201828:web:341a5061bb8f0b75cec9f1",
        measurementId: "G-G63P3L6JVE"
};

export const firebaseApp=firebase.initializeApp(firebaseConfig);