import React from "react";
import Nav from "./Nav";
import UserSection from "./UserSection";
import AddMood from "./AddMood";
import Mood from "./Mood";
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
          path="/react-project/mood"
          element={<Mood db={db} auth={auth} />}
        />
        <Route
          path="/react-project/add-mood"
          element={<AddMood db={db} auth={auth} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default SignedIn;
