import React from "react";
import Nav from "./Nav";
import UserSection from "./UserSection";
import AddPost from "./AddPost";
import DisplayPost from "./DisplayPost";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const SignedIn = ({ auth, db }) => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route
          exact
          strict
          path="/react-project/home"
          element={<UserSection auth={auth} />}
        />
        <Route
          path="/react-project/post"
          element={<DisplayPost db={db} auth={auth} />}
        />
        <Route
          path="/react-project/add-post"
          element={<AddPost db={db} auth={auth} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default SignedIn;
