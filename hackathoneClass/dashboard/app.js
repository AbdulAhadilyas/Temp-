import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getFirestore, collection, query, where, onSnapshot, doc, deleteDoc, updateDoc, deleteField } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDwCWxd2M5NdD7idagpOIqczYxL8RodCds",
  authDomain: "test-38127.firebaseapp.com",
  projectId: "test-38127",
  storageBucket: "test-38127.appspot.com",
  messagingSenderId: "1021886461867",
  appId: "1:1021886461867:web:b325ddfc2aa2ac8d8104ee"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

window.onload = () => {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      location = "../index.html";
    } else {

      showAllData(user.uid)
      // myData(user.uid)
    }
  });
}

const logOut = () => {
  signOut(auth).then(() => {
  }).catch((error) => {
  })
}
window.logOut = logOut;


const data = document.getElementById("data");

// const myData = (uid) => {
//   const q = query(collection(db, "users"), where("uid", "==", uid));
//   const unsubscribe = onSnapshot(q, (querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//       data.innerHTML += `
//       <div>
//         <h1>${doc.data().name} <button onclick="editBtn('name','${doc.id}')">Edit</button> <button onclick="delBtn('name','${doc.id}')">Delete</button></h1>
//         <h2>${doc.data().email}  <button onclick="editBtn('email','${doc.id}')">Edit</button> <button onclick="delBtn('email','${doc.id}')">Delete</button></h2>
//         <h2>${doc.data().password}  <button onclick="editBtn('password','${doc.id}')">Edit</button> <button onclick="delBtn('password','${doc.id}')">Delete</button></h2>
//         <img src="${doc.data().photo}" alt="">
//       </div>
//       `
//     });
//   });
// }


// const editBtn = (type) => {}
// const delBtn = async (type,uid) => {
//   const cityRef = doc(db, 'users', uid);

// Remove the 'capital' field from the document
// await updateDoc(cityRef, {
//   [type]: deleteField()
// });
// }

// window.editBtn = editBtn;
// window.delBtn = delBtn;

const showAllData = (uid) => {
  const q = query(collection(db, "users"), where("uid", "!=", uid));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      data.innerHTML += `
      <div>
        <h1>${doc.data().name}</h1>
        <h2>${doc.data().email}</h2>
        <h2>${doc.data().password}</h2>
        <button onclick="openInNewTab('${doc.id}')">Open in new Tab</button>
      </div>
      `
    });
  });
}

const openInNewTab =(uid)=>{ 
location = `../currentUserData/index.html?uid=${uid}`
}

window.openInNewTab =openInNewTab;