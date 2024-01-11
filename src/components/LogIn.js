import React from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const Main = ({ auth }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const provider = new GoogleAuthProvider();

  const changeEmail = (e) => {
    setEmail(e.target.value);
    console.log(email);
  };
  const changePassword = (e) => {
    setPassword(e.target.value);
    console.log(password);
  };

  const signInWithGoogle = () => {
    console.log("Sign in with Google");
    provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("Signed in with Google!");
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const clearEmailAndPassword = () => {
    setEmail("");
    setPassword("");
  };

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(clearEmailAndPassword())
      .catch((error) => {
        console.error(error.message);
        alert("Oops, something went wrong. \n Please check your email and password once again")
        clearEmailAndPassword();
      });
  };

  const createAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(clearEmailAndPassword())
      .catch((error) => {
        console.error(error.message);
        alert("Oops, something went wrong. \nPlease make sure that \n - your password is more than 6 characters \n - your email is valid and not already registered")
        clearEmailAndPassword();
      })
  };

  return (
      <div className="signInElements">
        <button onClick={signInWithGoogle}>Sign in with Google</button>
        <input
          id="email"
          placeholder="email"
          onChange={changeEmail}
          value={email}
        />
        <input
          id="password"
          type="password"
          placeholder="password"
          onChange={changePassword}
          value={password}
        />
        <button onClick={signIn}>Sign in</button>

        <button onClick={createAccount}>Create account</button>
      </div>
  );
};
export default Main;
