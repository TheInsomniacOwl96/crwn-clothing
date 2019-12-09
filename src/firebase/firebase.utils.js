import firebase from "firebase/app";
import "firebase/firestore"; // database
import "firebase/auth"; // authentication

const config = {
  apiKey: "AIzaSyChZo_L3Tw_pZpdoKFwopbODVaMiU183YE",
  authDomain: "crwn-db-4a397.firebaseapp.com",
  databaseURL: "https://crwn-db-4a397.firebaseio.com",
  projectId: "crwn-db-4a397",
  storageBucket: "crwn-db-4a397.appspot.com",
  messagingSenderId: "152465336586",
  appId: "1:152465336586:web:6b6e7539ac4a7af497f2f3",
  measurementId: "G-FPNEFQKG92"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  // console.log(snapShot);
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
      console.log("Error creating user", error.message);
    }
  }

  return userRef;
};

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);
  // console.log(collectionRef);

  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  });

  console.log(transformedCollection);
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
