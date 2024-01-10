import React from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";

const Main = ({ toggleSignedIn, auth }) => {
  const [email, setEmail] = React.useState("default@email.com");
  const [password, setPassword] = React.useState("defaultPassword");  
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
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("Signed in with Google!")
      }).catch((error) => {
        console.error(error.message)
      });

  };

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(console.log("sign in..."))
      .catch((error) => {
        console.error(error.message);
      });
  };

  const createAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(console.log("create account..."))
      .catch((err) => console.error(err.code));
  };

  return (
    <main>
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
    </main>
  );
};
export default Main;
