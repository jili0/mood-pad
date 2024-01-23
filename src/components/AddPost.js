import React from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "../stylesheets/addPost.css";

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
          Add Mood title &#40;optional&#41;
        </label>
        <input
          className="addPostTitle"
          id="addPostTitle"
          type="text"
          placeholder="Add Mood title &#40;optional&#41;"
        />

        <label className="addPostLabel" htmlFor="addPostContent">
          Add Mood content &#40;required&#41;
        </label>
        <textarea
          className="addPostContent"
          id="addPostContent"
          name=""
          cols="30"
          rows="10"
          placeholder="Add Mood content &#40;required&#41;"
        ></textarea>

        <button className="addPostButton" onClick={addPost}>
          Submit
        </button>
      </form>
    </>
  );
};

export default AddPost;
