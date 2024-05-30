import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCZwsxI9ppWdGHslV4rSNnQM3DQ90LQSpA",
    authDomain: "devchat-c32c2.firebaseapp.com",
    projectId: "devchat-c32c2",
    storageBucket: "devchat-c32c2.appspot.com",
    messagingSenderId: "391884416347",
    appId: "1:391884416347:web:ed896bf1f97192a0c2267e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
