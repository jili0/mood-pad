import React from "react";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
  limit,
  doc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";

const DisplayPost = ({ db, auth }) => {
  const updatePost = (auth) => {
    const q = query(
      collection(db, "posts"),
      where("authorID", "==", auth.currentUser.uid),
      orderBy("time", "desc"),
      limit(100)
    );

    const editTitle = async (postID, postTitle) => {
      const newTitle = prompt("Editing post title", postTitle)
      if (newTitle) {
        await updateDoc((doc(db, "posts", postID)), {
          title: newTitle
        })
      }
    }
    const editPost = async (postID, postContent) => {
      const newContent = prompt("Editing the post", postContent)
      if (newContent) {
        await updateDoc((doc(db, "posts", postID)), {
          content: newContent
        })
      }
    }

    const deletePost = async (postID) => {
      const confirm = prompt("Type anything to confirm delete")
      if (confirm) {
        await deleteDoc(doc(db, "posts", postID))
      }
    }

    onSnapshot(q, (querySnapshot) => {
      const postContainer = document.getElementById("postContainer");
      postContainer.innerHTML = "";

      querySnapshot.forEach((post) => {
        let title;
        post.data().title
          ? (title = post.data().title)
          : (title = post.data().content.split(" ").slice(0, 5).join(" "));

        let time = post.data().time;
        let content = post.data().content;
        const formatNumber = (num) => {
          return num.toString().length === 1
            ? 0 + num.toString()
            : num.toString();
        };

        /* Create HTML Elements */
        const postHeaderContainer = document.createElement("div")
        const postTitle = document.createElement("p")
        const postTitleEdit = document.createElement("button")
        const postContent = document.createElement("p")
        const postTimeButtonsContainer = document.createElement("div")
        const postTime = document.createElement("p")
        const postButtons = document.createElement("div")
        const postButtonEdit = document.createElement("button")
        const postButtonDelete = document.createElement("button")

        /* Set Class Name */
        postHeaderContainer.className = "postHeaderContainer"
        postTitle.className = "postTitle"
        postTitleEdit.className = "postTitleEdit"
        postTitleEdit.classList.add("noWrap")
        postContent.className = "postContent"
        postContent.classList.add("whiteSpacePre")
        postTimeButtonsContainer.className = "postTimeButtonsContainer"
        postTime.className = "postTime"
        postButtons.className = "postButtons"
        postButtonEdit.className = "postButtonEdit"
        postButtonDelete.className = "postButtonDelete"

        /* Add function */
        postTitleEdit.onclick = () => editTitle(post.id, title)
        postButtonEdit.onclick = () => editPost(post.id, content)
        postButtonDelete.onclick = () => deletePost(post.id)

        /* Set Text Content */
        postTitle.textContent = title && title
        postTitleEdit.textContent = "Edit Title"
        postContent.textContent = content && content
        postTime.textContent = `${
          time && formatNumber(time.toDate().getDate())
        }-${time && formatNumber(time.toDate().getMonth() + 1)}-${
          time && formatNumber(time.toDate().getFullYear())
        } ${time && formatNumber(time.toDate().getHours())}:${
          time && formatNumber(time.toDate().getMinutes())
        }`;
        postButtonEdit.textContent = "Edit"
        postButtonDelete.textContent = "Delete"

        /* Chain HTML Elements together */
        postHeaderContainer.appendChild(postTitle)
        postHeaderContainer.appendChild(postTitleEdit)
        postTimeButtonsContainer.appendChild(postTime)
        postTimeButtonsContainer.appendChild(postButtons)
        postButtons.appendChild(postButtonEdit)
        postButtons.appendChild(postButtonDelete)
        postContainer.appendChild(postHeaderContainer)
        postContainer.appendChild(postContent)
        postContainer.appendChild(postTimeButtonsContainer)
      });
    });
  };

  updatePost(auth);

  return (
    <>
      <ul id="postContainer" className="postContainer"></ul>
    </>
  );
};

export default DisplayPost;
