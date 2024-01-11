import React from "react";
import UserSection from "./UserSection";
import AddPost from "./AddPost";
import DisplayPost from "./DisplayPost";

const SignedIn = ({ auth, db }) => {
  return (
    <main>
      <DisplayPost db={db} auth={auth}/>
      <UserSection auth={auth} />
      <AddPost db={db} auth={auth} />
    </main>
  );
};

export default SignedIn;
