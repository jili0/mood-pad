import React from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "../stylesheets/addMood.css";

const AddMood = ({ db, auth }) => {
  const replaceNewline = (str) => {
    const regex = /\n/g;
    const newStr = str.replace(regex, "\r\n");
    return newStr;
  };

  const addMood = async (e) => {
    e.preventDefault();
    const moodTitle = document.getElementById("addMoodTitle").value;
    const moodContent = replaceNewline(
      document.getElementById("addMoodContent").value
    );

    const moodUid = auth.currentUser.uid;
    const moodTime = serverTimestamp();
    if (moodContent) {
      try {
        const moodRef = await addDoc(collection(db, "moods"), {
          title: moodTitle,
          content: moodContent,
          time: moodTime,
          authorID: moodUid,
        });
        console.log("Mood created with ID: ", moodRef.id);
        document.getElementById("addMoodTitle").value = "";
        document.getElementById("addMoodContent").value = "";
      } catch (error) {
        console.error("Error adding mood: ", error.message);
        alert("Oops, something went wrong.");
      }
    } else {
      alert("Please add the mood content before submitting the mood");
    }
  };

  return (
    <>
      <form className="addMoodForm">
        <label className="addMoodLabel" htmlFor="addMoodTitle">
          Add Mood title &#40;optional&#41;
        </label>
        <input
          className="addMoodTitle"
          id="addMoodTitle"
          type="text"
          placeholder="Add Mood title &#40;optional&#41;"
        />

        <label className="addMoodLabel" htmlFor="addMoodContent">
          Add Mood content &#40;required&#41;
        </label>
        <textarea
          className="addMoodContent"
          id="addMoodContent"
          name=""
          cols="30"
          rows="10"
          placeholder="Add Mood content &#40;required&#41;"
        ></textarea>

        <button className="addMoodButton" onClick={addMood}>
          Submit
        </button>
      </form>
    </>
  );
};

export default AddMood;
