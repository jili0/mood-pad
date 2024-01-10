import React from "react"
import { signOut } from "firebase/auth";
import UserSection from "./UserSection";

const SignedIn = ({ auth, toggleSignedIn }) => {

  const signOutUser = () => {
    signOut(auth)
      .then(console.log("successful signed out"))
      .catch((error) => console.error(error.message));
  };

  return (
    <main>
      <UserSection auth={auth}/>
      <button onClick={signOutUser}>Sign out</button>
      
    </main>
  );
};

export default SignedIn;
