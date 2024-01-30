import React from "react";
import UserManageAccount from "./UserManageAccount";
import "../stylesheets/userSection.css";

const UserSection = ({ auth }) => {
  const userPhoto = auth.currentUser.photoURL ? (
    <img
      className="user-photo"
      src={auth.currentUser.photoURL}
      alt="current user"
    />
  ) : (
    <img
      className="user-photo"
      src="https://picsum.photos/100/100"
      alt="default user"
    />
  );

  return (
    <>
      <div className="userSection">
        <h2 className="welcomeMessage">
          Hello,&nbsp;
          {auth.currentUser.displayName
            ? auth.currentUser.displayName.split(" ")[0]
            : null}
          !
        </h2>
        {userPhoto}
        <div className="userInfo">
          <p>{auth.currentUser.email}</p>
          <p>
            {auth.currentUser.emailVerified
              ? "(Email verified)"
              : "(Email not verified yet)"}
          </p>
        </div>
        <hr />
      </div>
      <UserManageAccount auth={auth} />
    </>
  );
};

export default UserSection;
