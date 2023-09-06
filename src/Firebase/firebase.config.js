    // Import the functions you need from the SDKs you need
    import { initializeApp } from "firebase/app";
    import { getAuth } from "firebase/auth";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
        apiKey: "AIzaSyAy0Q7rb3KWFaRbgfcYEawApLoKdmYb47s",
        authDomain: "sportopiaproject1.firebaseapp.com",
        projectId: "sportopiaproject1",
        storageBucket: "sportopiaproject1.appspot.com",
        messagingSenderId: "463213935420",
        appId: "1:463213935420:web:7595e459460b1a46cc3c39"
      };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    export const auth = getAuth(app);