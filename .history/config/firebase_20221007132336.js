// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgA_F1n8zfvZ76B6Cfok3xOvf6kFI3O8w",
  authDomain: "meuapp-47b29.firebaseapp.com",
  projectId: "meuapp-47b29",
  storageBucket: "meuapp-47b29.appspot.com",
  messagingSenderId: "810489435530",
  appId: "1:810489435530:web:6dc872ee3d27edabc66473"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

export {app, auth}



// shishido@hotmail.com
//shishido07 