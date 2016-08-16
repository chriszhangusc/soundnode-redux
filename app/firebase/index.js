import firebase from 'firebase';

try {
  // Initialize Firebase
  const config = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTO_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    storageBucket: process.env.STORAGE_BUCKET,
  };

  firebase.initializeApp(config);
} catch (e) {

}

export const firebaseRef = firebase.database().ref();
export default firebase;
