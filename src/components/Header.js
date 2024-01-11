import React from "react";
import { signOut } from "firebase/auth";

const Header = ({ auth }) => {
  const signOutUser = () => {
    signOut(auth)
      .then(console.log("successful signed out"))
      .catch((error) => console.error(error.message));
  };

  return (
    <header>
      <h1>Simple Login Page</h1>
      { auth.currentUser &&
        <button className="signOutButton" onClick={signOutUser}>
          Sign out
        </button>
      }
    </header>
  );
};
export default Header;
