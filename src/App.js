import './App.css';
import React from "react"
import {db, myCollection} from "./firebase"
//onSnapshot enables: listen to changes in the firestore database and then act accordingly in the local code
import { onSnapshot, addDoc, doc, deleteDoc } from "firebase/firestore"

function App() {
  const [data, setData] = React.useState([])

  React.useEffect(() => {
    const unsubscribeFunction = onSnapshot(myCollection, (snapshot) => {
      // Sync up our local notes array with the snapshot data
      console.log("Database is changing!")
      const dataArr = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }))
      setData(dataArr)
    })
    return () => unsubscribeFunction
  }, [])

  const addData = async () => {
    const newData = {body: "I am a newData"}
    const newDataReference = await addDoc(myCollection, newData)
    console.log(newDataReference.id)
  }

  const deleteData = async (id) => {
    const docReference = doc(db, "myCollection", id)
    await deleteDoc(docReference)
  }

  return (
    <div className="App">
      <h1>Hello</h1>
      <button onClick={addData}>addData</button>

    </div>
  );
}

export default App;
