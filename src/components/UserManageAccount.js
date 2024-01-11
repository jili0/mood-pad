import React from "react";
import { updateProfile } from "firebase/auth";

const UserManageAccount = ({auth}) => {
  const updateUsername = (e) => {
    const property = e.target.name
    const value = e.target.previousElementSibling.value
  
    updateProfile(auth.currentUser, {
      [property]: value}).then(() => {
      console.log(`update ${property} to ${value}`)
      window.location.reload()
    }).catch((error) => {
      console.log(error.message)
    });
  }

  return (
    <>
      <h2>Manage Account</h2>
      <div>
        <label className="updateLabel" htmlFor="newName">Set username: </label>
        <input className="updateInput" id="newName" placeholder="new name" />
        <button className="updateButton" name="displayName" onClick={updateUsername}>Set new name</button>
      </div>
      <div>
        <label className="updateLabel" htmlFor="newPhoto">Set new photo URL: </label>
        <input className="updateInput" id="newPhoto" placeholder="new photo URL" />
        <button className="updateButton" name="photoURL" onClick={updateUsername}>Set new photo</button>
      </div>
    </>
  );
};

export default UserManageAccount;
