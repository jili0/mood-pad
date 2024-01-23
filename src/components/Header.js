import React from "react";
import { signOut } from "firebase/auth";
import '../stylesheets/header.css'


const Header = ({ auth }) => {
  const signOutUser = () => {
    signOut(auth)
      .then(console.log("successful signed out"))
      .catch((error) => console.error(error.message));
  };

  return (
    <header>
      <h1>MoodPad</h1>
      { auth.currentUser &&
        <button className="signOutButton" onClick={signOutUser}>
          Sign out
        </button>
      }
    </header>
  );
};
export default Header;
