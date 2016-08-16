import firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyB3fGTiE0_JQYNPUpZkWLY3MNHHxOAqf30",
  authDomain: "huachao-todo-app.firebaseapp.com",
  databaseURL: "https://huachao-todo-app.firebaseio.com",
  storageBucket: "huachao-todo-app.appspot.com",
};
firebase.initializeApp(config);

const firebaseRef = firebase.database().ref();

// Set completely wipe out the database.
firebaseRef.set({
  app: {
    name: 'React Redux Todo',
    version: '1.0',
  },
  isRunning: true,
  user: {
    name: 'Huachao',
    age: 25,
  },
}).then(() => {
  console.log('Original DB established.');
}, (e) => {
  console.log('Original DB failed.');
});

const todosRef = firebaseRef.child('todos');
todosRef.push({
  text: 'Todo 1'
});

todosRef.push({
  text: 'Todo 2'
});

todosRef.push({
  text: 'Todo 3'
});


todosRef.once('value', (snapshot) => {
  snapshot.forEach((child) => {
    console.log(child.key, child.val());
  });
});

// todosRef.on('child_added', (snapshot) => {
//   console.log('New todo added: ', snapshot.key, snapshot.val());
// });
//


//
// const notesRef = firebaseRef.child('notes');
//
// notesRef.on('child_added', (snapshot) => {
//   console.log('child_added', snapshot.key, snapshot.val());
// });
//
// notesRef.on('child_changed', (snapshot) => {
//   console.log('child_changed', snapshot.key, snapshot.val());
// });
//
// notesRef.on('child_removed', (snapshot) => {
//   console.log('child_removed', snapshot.key, snapshot.val());
// });
//
// const newNoteRef = notesRef.push();
// newNoteRef.set({
//   text: 'Walk the dog'
// });
//
// firebaseRef.child('user').on('value', (snapshot) => {
//   console.log('User ref changed', snapshot.val());
// });
//
// firebaseRef.update({
//   'user/name': 'ZHC',
// });

//
// // Multi-path update is cool!
// firebaseRef.update({
//   isRunning: false,
//   'app/name': 'Todo Application'
// });
//
// // Use the multi-path update to update the app name and user name
// firebaseRef.update({
//   'app/name': 'React Redux Todo',
//   'user/name': 'Chaochao',
// });
//
// firebaseRef.child('app').update({
//   name: 'Child',
// }).then(() => {
//   console.log('It works');
// }, (e) => {
//   console.log('Not work! ', e);
// });
//
// firebaseRef.child('user').update({
//   name: 'New User name',
// });

// firebaseRef.remove();

// firebaseRef.child('app/name').remove();

// When setting a field with null, firebase will remove it.
// firebaseRef.child('app').update({
//   version: '2.0',
//   name: null,
// });
//
// firebaseRef.child('app').once('value').then((snapshot) => {
//   console.log('Got entire database', snapshot.key, snapshot.val());
// }, (e) => {
//   console.log('Unable to fetch value', e);
// });
//
// var logDate = (snapshot) => {
//   console.log('Got value', snapshot.val());
// }
//
// firebaseRef.on('value', (snapshot) => {
//   console.log('Got value', snapshot.val());
// });
//
// // firebaseRef.off();
//
// firebaseRef.update({
//   isRunning: true
// });
