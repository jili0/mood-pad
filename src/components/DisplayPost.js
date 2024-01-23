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
  deleteDoc,
} from "firebase/firestore";
import "../stylesheets/displayPost.css";

const DisplayPost = ({ db, auth }) => {
  const updatePost = (auth) => {
    const q = query(
      collection(db, "posts"),
      where("authorID", "==", auth.currentUser.uid),
      orderBy("time", "desc"),
      limit(100)
    );

    const editTitle = async (postID, postTitle) => {
      const newTitle = prompt("Editing post title", postTitle);
      if (newTitle) {
        await updateDoc(doc(db, "posts", postID), {
          title: newTitle,
        });
      }
    };
    const editPost = async (postID, postContent) => {
      const newContent = prompt("Editing the post", postContent);
      if (newContent) {
        await updateDoc(doc(db, "posts", postID), {
          content: newContent,
        });
      }
    };

    const deletePost = async (postID) => {
      const confirm = prompt("Type anything to confirm delete");
      if (confirm) {
        await deleteDoc(doc(db, "posts", postID));
      }
    };

    onSnapshot(q, (querySnapshot) => {
      const postListContainer = document.getElementById("postListContainer");
      postListContainer.innerHTML = "";

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
        const postListItem = document.createElement("div");
        const postHeader = document.createElement("div");
        const postTitle = document.createElement("p");
        const postButtonEditTitle = document.createElement("button");
        const postContent = document.createElement("p");
        const postFooter = document.createElement("div");
        const postTime = document.createElement("p");
        const postButtons = document.createElement("div");
        const postButtonEditContent = document.createElement("button");
        const postButtonDelete = document.createElement("button");

        /* Set Class Name */
        postListItem.className = "postListItem"
        postHeader.className = "postHeader";
        postTitle.className = "postTitle";
        postButtonEditTitle.className = "postButtonEditTitle";
        postButtonEditTitle.classList.add("noWrap");
        postContent.className = "postContent";
        postContent.classList.add("whiteSpacePre");
        postFooter.className = "postFooter";
        postTime.className = "postTime";
        postButtons.className = "postButtons";
        postButtonEditContent.className = "postButtonEditContent";
        postButtonDelete.className = "postButtonDelete";

        /* Add function */
        postButtonEditTitle.onclick = () => editTitle(post.id, title);
        postButtonEditContent.onclick = () => editPost(post.id, content);
        postButtonDelete.onclick = () => deletePost(post.id);

        /* Set Text Content */
        postTitle.textContent = title && title;
        postButtonEditTitle.textContent = "Edit Title";
        postContent.textContent = content && content;
        postTime.textContent = `${
          time && formatNumber(time.toDate().getDate())
        }-${time && formatNumber(time.toDate().getMonth() + 1)}-${
          time && formatNumber(time.toDate().getFullYear())
        } ${time && formatNumber(time.toDate().getHours())}:${
          time && formatNumber(time.toDate().getMinutes())
        }`;
        postButtonEditContent.textContent = "Edit Content";
        postButtonDelete.textContent = "Delete Post";

        /* Chain HTML Elements together 
          <div className="postListItem">
            <div className="postHeader">
              <p className="postTitle"></p>
              <p className="postTime"></p>
            </div>

            <p className="postContent"></p>

            <div className="postFooter">
              <div className="postButtons">
                <button className="postButtonEditTitle"></button>
                <button className="postButttonEdit"></button>
                <button className="postButttonDelete"></button>
              </div>
            </div>
          </div>
        */
        postHeader.appendChild(postTitle);
        postHeader.appendChild(postTime);
        postFooter.appendChild(postButtons);

        postButtons.appendChild(postButtonEditTitle);
        postButtons.appendChild(postButtonEditContent);
        postButtons.appendChild(postButtonDelete);

        postListItem.appendChild(postHeader);
        postListItem.appendChild(postContent);
        postListItem.appendChild(postFooter);

        postListContainer.appendChild(postListItem);
      });
    });
  };

  updatePost(auth);

  return (
    <>
      <ul id="postListContainer" className="postListContainer"></ul>
    </>
  );
};

export default DisplayPost;
