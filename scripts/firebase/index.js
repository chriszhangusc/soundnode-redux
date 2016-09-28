import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyB3adXvXzXxusrglV3_EVLCk3WWMLXw5PM',
  authDomain: 'reactivesound-bdd37.firebaseapp.com',
  databaseURL: 'https://reactivesound-bdd37.firebaseio.com',
  storageBucket: 'reactivesound-bdd37.appspot.com',
  messagingSenderId: '177988574626'
};

firebase.initializeApp(config);

export const githubProvider = new firebase.auth.GithubAuthProvider();
export const firebaseRef = firebase.database().ref();
export default firebase;
