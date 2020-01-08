import * as firebase from 'firebase';
import firestore from 'firebase/firestore'
import 'firebase/auth';
import React, { useEffect, useState } from 'react';

export const AuthContext = React.createContext();
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    config.auth().onAuthStateChanged(setCurrentUser);
  }, []);
  return (
    <AuthContext.Provider value={{currentUser}}>
    {children}
    </AuthContext.Provider>
  )
}


const settings = {timestampsInSnapshots: true};

const config = {
  apiKey: "AIzaSyD50OdUja6YXuO5p_ly2f6e7ostR3aa6k4",
    authDomain: "native-5e08a.firebaseapp.com",
    databaseURL: "https://native-5e08a.firebaseio.com",
    projectId: "native-5e08a",
    storageBucket: "native-5e08a.appspot.com",
    messagingSenderId: "555877354800",
    appId: "1:555877354800:web:d6fdb4c472db4adc4accf5",
    measurementId: "G-3WBVB4D3Q8"
};
firebase.initializeApp(config);

// firebase.firestore().settings(settings);


export default firebase;
