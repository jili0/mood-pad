import React from "react"


const UserSection = ({auth}) => {
  const userPhoto = auth.currentUser.photoURL ?  <img className="user-photo" scr={auth.currentUser.photoURL || "../images/user-default.svg"} alt="user photo"/> : <svg className="user-photo" xmlns="http://www.w3.org/2000/svg" height="50" width="50" viewBox="0 0 448 512">{/* !Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. */}<path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>   

  return(
    <>
      <h2>User Section</h2>
      {userPhoto}
      <p>{"User Email: " + auth.currentUser.email}</p>
      <p>{"User ID: " + auth.currentUser.uid}</p>
      <p>{auth.currentUser.emailVerified || "Email not verified yet"}</p>

      </>
  )
}

export default UserSection