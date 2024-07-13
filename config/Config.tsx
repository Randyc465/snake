
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getDatabase} from 'firebase/database'
import { getStorage } from "firebase/storage";

//import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
    apiKey: "AIzaSyDUirCrlu1uV0xI1STp-Td27M5FdoAu9DE",
    authDomain: "app-movil-932e8.firebaseapp.com",
    databaseURL: "https://app-movil-932e8-default-rtdb.firebaseio.com",
    projectId: "app-movil-932e8",
    storageBucket: "app-movil-932e8.appspot.com",
    messagingSenderId: "818252847246",
    appId: "1:818252847246:web:73d76e3c52ed1131c911df"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

export const db= getDatabase(app)

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)

});
export const storage= getStorage(app);