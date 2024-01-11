import React from "react";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import "./App.css";
import Header from "./components/Header";
import LogIn from "./components/LogIn";
import SignedIn from "./components/SignedIn";
import Footer from "./components/Footer";

const App = () => {
  const [signedIn, setSignedIn] = React.useState(false);

  const firebaseConfig = {
    apiKey: "AIzaSyD6QAiG1M9jcmlidvHBPL8fZocb2S8Ia48",
    authDomain: "jili0-react-project.firebaseapp.com",
    projectId: "jili0-react-project",
    storageBucket: "jili0-react-project.appspot.com",
    messagingSenderId: "1067526600287",
    appId: "1:1067526600287:web:7fece1f469faec016e0dea",
    measurementId: "G-FJKCTSMY82",
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setSignedIn(true);
      } else {
        setSignedIn(false);
      }
    });
  }, []);

  return (
    <div className="App">
      <Header auth={auth}/>
      {signedIn ? <SignedIn auth={auth} db={db} /> : <LogIn auth={auth} />}
      <Footer />
    </div>
  );
};

export default App;
