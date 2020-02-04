import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDjl97F2bW8TVo6CNDMu5WaQ2mOxpbXS6Y",
  authDomain: "crwn-db-3e640.firebaseapp.com",
  databaseURL: "https://crwn-db-3e640.firebaseio.com",
  projectId: "crwn-db-3e640",
  storageBucket: "crwn-db-3e640.appspot.com",
  messagingSenderId: "473485881575",
  appId: "1:473485881575:web:fd4312da68258f1f"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ propmt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
