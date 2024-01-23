import React from "react";
import "../stylesheets/login.css";
import google from "../logos/google.ico";
import { FaArrowRightToBracket } from "react-icons/fa6";

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
        alert(
          "Oops, something went wrong. \n Please check your email and password once again"
        );
        clearEmailAndPassword();
      });
  };

  const createAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(clearEmailAndPassword())
      .catch((error) => {
        console.error(error.message);
        alert(
          "Oops, something went wrong. \nPlease make sure that \n - your password is more than 6 characters \n - your email is valid and not already registered"
        );
        clearEmailAndPassword();
      });
  };

  return (
    <>
      <div className="signInElements">
        <input
          id="email"
          placeholder="Enter email"
          onChange={changeEmail}
          value={email}
        />
        <input
          id="password"
          type="password"
          placeholder="Enter password"
          onChange={changePassword}
          value={password}
        />
        <button onClick={signIn}>Sign in</button>
        <button onClick={createAccount}>Create account</button>
        <button onClick={signInWithGoogle}>
          <img
            className="googleIcon"
            src={google}
            alt="Google"
            width="36"
            height="36"
          />
          Sign in with Google
        </button>
      </div>
      <a className="linkPortfolio" href="https://jili0.github.io/portfolio/">
        <FaArrowRightToBracket />
        &nbsp;
        Back to Jing&apos;s Portfolio
      </a>
    </>
  );
};
export default Main;
