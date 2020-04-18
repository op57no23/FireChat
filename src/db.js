import firebase from 'firebase/app';
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB6sYIUvxi7y0haT9z1oGNV_3bnBXm0SIc",
  authDomain: "openchat-1e441.firebaseapp.com",
  databaseURL: "https://openchat-1e441.firebaseio.com",
  projectId: "openchat-1e441",
  storageBucket: "openchat-1e441.appspot.com",
  messagingSenderId: "591576830255",
  appId: "1:591576830255:web:ef4a4276b4e889eedcd1da",
  measurementId: "G-W95VE7PSSK"
};


export const db = firebase.initializeApp(firebaseConfig).firestore()
const { Timestamp, GeoPoint } = firebase.firestore
export { Timestamp, GeoPoint }
