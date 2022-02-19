import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth"

// Initialize Firebase
export const app = initializeApp({
    apiKey: "AIzaSyA1LwTa1uuRBA3duQKF1l3eY2X5OabiZIk",
    authDomain: "real-time-chat-petproject.firebaseapp.com",
    projectId: "real-time-chat-petproject",
    storageBucket: "real-time-chat-petproject.appspot.com",
    messagingSenderId: "543841251358",
    appId: "1:543841251358:web:e78e5e723fd256c89a3e0f"
});

export const Context = createContext(null)

const auth = getAuth();
const firestore = getFirestore(app);

ReactDOM.render(
    <Context.Provider value={{
        firestore,
        auth,
    }}>
        <App />
    </Context.Provider>,
  document.getElementById('root')
);

