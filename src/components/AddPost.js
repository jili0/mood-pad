import React from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const AddPost = ({ db, auth }) => {
  const replaceNewline = (str) => {
    const regex = /\n/g;
    const newStr = str.replace(regex, "\r\n");
    return newStr;
  };

  const addPost = async (e) => {
    e.preventDefault();
    const postTitle = document.getElementById("addPostTitle").value;
    const postContent = replaceNewline(
      document.getElementById("addPostContent").value
    );

    const postUid = auth.currentUser.uid;
    const postTime = serverTimestamp();
    if (postContent) {
      try {
        const postRef = await addDoc(collection(db, "posts"), {
          title: postTitle,
          content: postContent,
          time: postTime,
          authorID: postUid,
        });
        console.log("Post created with ID: ", postRef.id);
        document.getElementById("addPostTitle").value = "";
        document.getElementById("addPostContent").value = "";
      } catch (error) {
        console.error("Error adding post: ", error.message);
        alert("Oops, something went wrong.");
      }
    } else {
      alert("Please add the post content before submitting the post");
    }
  };

  return (
    <>
      <form className="addPostForm">
        <label className="addPostLabel" htmlFor="addPostTitle">
          Add Post Title:
        </label>
        <input
          className="addPostTitle"
          id="addPostTitle"
          type="text"
          placeholder="Post title"
        />

        <label className="addPostLabel" htmlFor="addPostContent">
          Add Post Content:
        </label>
        <textarea
          className="addPostContent"
          id="addPostContent"
          name=""
          cols="30"
          rows="10"
          placeholder="Post content"
        ></textarea>

        <button className="addPostButton" onClick={addPost}>
          Submit
        </button>
      </form>
    </>
  );
};

export default AddPost;
