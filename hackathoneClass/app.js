import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getFirestore, doc, setDoc, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";

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
const storage = getStorage(app);

window.onload = onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    // ...
    console.log(user.uid);
    location = "dashboard/index.html";

  } else {
    // User is signed out
    // ...
  }
});

// Sign Up

const submit = document.getElementById("submit");
const email = document.getElementById("email")
const password = document.getElementById("password")
const userName = document.getElementById("name")

// Uploading Image

const imageUpload = document.getElementById("imageUpload");


submit.addEventListener("click", () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(async (userCredential) => {
      // Signed in 
      const user = userCredential.user;

      const imageSrc = await changingImageToURL(imageUpload.files[0],user.uid);

      await setDoc(doc(db, "users", user.uid), {
        name: userName.value,
        email: email.value,
        password: password.value,
        uid: user.uid,
        photo: imageSrc,
      });
      location = "dashboard/index.html";
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      console.log("no user not created", error);
    });

})

// Sign In

const signInSubmit = document.getElementById("signInSubmit");
const signInEmail = document.getElementById("signInEmail")
const signInPassword = document.getElementById("signInPassword")

const signUp = () => {

  signInWithEmailAndPassword(auth, signInEmail.value, signInPassword.value)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(" user sign in");

      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("no user sign in");
      console.log("error", error);
    });

}

const signUpBtn = document.getElementsByClassName("signUp")[0];
const signInBtn = document.getElementsByClassName("signIn")[0];

const toggleInput = () => {
  signUpBtn.classList.toggle("hidden");
  signInBtn.classList.toggle("hidden");
}

const toggleInput2 = () => {
  signUpBtn.classList.toggle("hidden");
  signInBtn.classList.toggle("hidden");
}



const changingImageToURL = (file,uid) => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, `images/${uid}.png`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case 'storage/unauthorized':
            break;
          case 'storage/canceled':
            break;
          case 'storage/unknown':
            break;
        }
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
         resolve(downloadURL)
        });
      }
    );
  })
}








window.toggleInput = toggleInput;
window.toggleInput2 = toggleInput2;
window.signUp = signUp;