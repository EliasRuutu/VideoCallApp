import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCGNxEsvS6gJnE6ODn0Evw-txOcGK-ohZU",
  authDomain: "jk-libras.firebaseapp.com",
  projectId: "jk-libras",
  appId: "1:272405655148:android:60808f098146bcd1537249",
  databaseURL: 'https://jk-libras.firebaseio.com',
  storageBucket: 'jk-libras.appspot.com',
  // messagingSenderId: 'sender-id',
  // measurementId: 'G-measurement-id',
}

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
}); // Initialize Authentication
const firestore = getFirestore(app);

export { app, auth, firestore };