import React from "react";
import { collection, query, where, getDocs } from "firebase/firestore";

const DisplayPost = ({ db, auth }) => {
  const q = query(
    collection(db, "posts"),
    where("authorID", "==", auth.currentUser.uid)
  );
  console.log(q);

  const getPosts = async () => {
    const querySnapshot = await getDocs(q);
    let postArray = []
    const postContainer = document.getElementById("postContainer");
    const convertDate = (firebaseDate) => {
      let date = firebaseDate.data().time.toDate().getDate().toString()
      let month = ["01","02","03","04","05","06","07","08","09","10","11","12"][firebaseDate.data().time.toDate().getMonth()]
      let year = firebaseDate.data().time.toDate().getFullYear()
      return (`${date}-${month}-${year}`)
    }
    
    querySnapshot.forEach((post) => {
      let title
      post.data().title ? title = post.data().title : title = post.data().content.split(" ").slice(0, 5).join(" ")
      const postElement = `<li key={post.id} name={post.data().authorID} className="postItem"><details>
      <summary className="postDataTitle">${title}  <p className="postTimeAndAuthor">${convertDate(post)}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<svg xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 640 512"></* !--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */<path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H322.8c-3.1-8.8-3.7-18.4-1.4-27.8l15-60.1c2.8-11.3 8.6-21.5 16.8-29.7l40.3-40.3c-32.1-31-75.7-50.1-123.9-50.1H178.3zm435.5-68.3c-15.6-15.6-40.9-15.6-56.6 0l-29.4 29.4 71 71 29.4-29.4c15.6-15.6 15.6-40.9 0-56.6l-14.4-14.4zM375.9 417c-4.1 4.1-7 9.2-8.4 14.9l-15 60.1c-1.4 5.5 .2 11.2 4.2 15.2s9.7 5.6 15.2 4.2l60.1-15c5.6-1.4 10.8-4.3 14.9-8.4L576.1 358.7l-71-71L375.9 417z"/></svg>  ${post.data().authorID}&nbsp;&nbsp;&nbsp;&nbsp;${post.data().moodId}</p></summary>
      <p id="postDataContent">${post.data().content}</p>
      </details>
    </li>`;
      postArray += postElement;
    });
    postContainer.innerHTML = postArray
  };
  getPosts();
  return (
    <>
      <h2>Display Post</h2>
      <ul id="postContainer" className="postContainer"></ul>
    </>
  );
};

export default DisplayPost;
