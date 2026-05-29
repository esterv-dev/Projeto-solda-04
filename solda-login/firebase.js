  // Import the functions you need from the SDKs you need
   import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getAuth
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDB8QbUeXwx_-dmtly0_0GE2ieCwvnYVGc",
    authDomain: "projeto-solda.firebaseapp.com",
    databaseURL: "https://projeto-solda-default-rtdb.firebaseio.com",
    projectId: "projeto-solda",
    storageBucket: "projeto-solda.firebasestorage.app",
    messagingSenderId: "355208250825",
    appId: "1:355208250825:web:92ddd629ace90ae38f5418"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  export const auth = getAuth(app);