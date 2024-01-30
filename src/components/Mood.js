import { useEffect } from "react";
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
import "../stylesheets/mood.css";

const Mood = ({ db, auth }) => {
  const updateMood = (auth) => {
    const q = query(
      collection(db, "moods"),
      where("authorID", "==", auth.currentUser.uid),
      orderBy("time", "desc"),
      limit(100)
    );

    const editTitle = async (moodID, moodTitle) => {
      const newTitle = prompt("Editing mood title", moodTitle);
      if (newTitle) {
        await updateDoc(doc(db, "moods", moodID), {
          title: newTitle,
        });
      }
    };

    const editMood = async (moodID, moodContent) => {
      const newContent = prompt("Editing mood content", moodContent);
      if (newContent) {
        await updateDoc(doc(db, "moods", moodID), {
          content: newContent,
        });
      }
    };

    const deleteMood = async (moodID) => {
      const confirm = prompt("Type anything to confirm delete");
      if (confirm) {
        await deleteDoc(doc(db, "moods", moodID));
      }
    };

    onSnapshot(q, (querySnapshot) => {
      /* Reset the moodContainer */
      const moodListContainer = document.getElementById("moodListContainer");
      {
        moodListContainer
          ? (moodListContainer.innerHTML = "")
          : console.log("Container loading..");
      }

      querySnapshot.forEach((mood) => {
        /* if the Mood doesn't have a title, set title to the first 5 words */
        let title =
          mood.data().title ||
          mood.data().content.split(" ").slice(0, 5).join(" ");

        let time = mood.data().time;

        /* if mood.data() is not there yet, we set the content temporarily to an empty string*/
        let content = mood.data().content || "";

        const formatNumber = (num) => {
          return num.toString().length === 1
            ? 0 + num.toString()
            : num.toString();
        };

        if (moodListContainer) {
          /* 
          <div className="moodListItem">
            <div className="moodHeader">
              <p className="moodTitle"></p>
              <p className="moodTime"></p>
            </div>
            <p className="moodContent"></p>
            <div className="moodFooter">
              <div className="moodButtons">
                <button className="moodButtonEditTitle"></button>
                <button className="moodButttonEdit"></button>
                <button className="moodButttonDelete"></button>
              </div>
            </div>
          </div>
          */

          /* Create HTML Elements */
          const moodListItem = document.createElement("div");
          const moodHeader = document.createElement("div");
          const moodTitle = document.createElement("p");
          const moodButtonEditTitle = document.createElement("button");
          const moodContent = document.createElement("p");
          const moodFooter = document.createElement("div");
          const moodTime = document.createElement("p");
          const moodButtons = document.createElement("div");
          const moodButtonEditContent = document.createElement("button");
          const moodButtonDelete = document.createElement("button");

          /* Set Class Name */
          moodListItem.className = "moodListItem";
          moodHeader.className = "moodHeader";
          moodTitle.className = "moodTitle";
          moodButtonEditTitle.className = "moodButtonEditTitle";
          moodButtonEditTitle.classList.add("noWrap");
          moodContent.className = "moodContent";
          moodContent.classList.add("whiteSpacePre");
          moodFooter.className = "moodFooter";
          moodTime.className = "moodTime";
          moodButtons.className = "moodButtons";
          moodButtonEditContent.className = "moodButtonEditContent";
          moodButtonDelete.className = "moodButtonDelete";

          /* Add function */
          moodButtonEditTitle.onclick = () => editTitle(mood.id, title);
          moodButtonEditContent.onclick = () => editMood(mood.id, content);
          moodButtonDelete.onclick = () => deleteMood(mood.id);

          /* Set Text Content */
          moodTitle.textContent = title;
          moodButtonEditTitle.textContent = "Edit Title";
          moodContent.textContent = content;
          moodTime.textContent = `${
            time && formatNumber(time.toDate().getDate())
          }-${time && formatNumber(time.toDate().getMonth() + 1)}-${
            time && formatNumber(time.toDate().getFullYear())
          } ${time && formatNumber(time.toDate().getHours())}:${
            time && formatNumber(time.toDate().getMinutes())
          }`;
          moodButtonEditContent.textContent = "Edit Content";
          moodButtonDelete.textContent = "Delete Mood";

          /* Chain HTML Elements together*/
          moodHeader.appendChild(moodTitle);
          moodHeader.appendChild(moodTime);
          moodFooter.appendChild(moodButtons);

          moodButtons.appendChild(moodButtonEditTitle);
          moodButtons.appendChild(moodButtonEditContent);
          moodButtons.appendChild(moodButtonDelete);

          moodListItem.appendChild(moodHeader);
          moodListItem.appendChild(moodContent);
          moodListItem.appendChild(moodFooter);

          moodListContainer.appendChild(moodListItem);
        }
      });
    });
  };

  useEffect(() => updateMood(auth), []);

  return (
    <>
      <ul id="moodListContainer" className="moodListContainer"></ul>
    </>
  );
};

export default Mood;
