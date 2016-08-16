import firebase from 'firebase';

try {
  // Initialize Firebase
  const config = {
    apiKey: "AIzaSyB3fGTiE0_JQYNPUpZkWLY3MNHHxOAqf30",
    authDomain: "huachao-todo-app.firebaseapp.com",
    databaseURL: "https://huachao-todo-app.firebaseio.com",
    storageBucket: "huachao-todo-app.appspot.com",
  };

  firebase.initializeApp(config);
} catch (e) {
  
}

export const firebaseRef = firebase.database().ref();
export default firebase;
