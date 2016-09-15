var Immutable = require('immutable');

var jsList = [{val:1}, {val:2}];

let book = Immutable.fromJS({
  title: 'Harry Potter & The Goblet of Fire',
  isbn: '0439139600',
  series: 'Harry Potter',
  author: {
    firstName: 'J.K.',
    lastName: 'Rowling'
  },
  genres: [
    'Crime',
    'Fiction',
    'Adventure',
  ],
  storeListings: [
    {storeId: 'amazon', price: 7.95},
    {storeId: 'barnesnoble', price: 7.95},
    {storeId: 'biblio', price: 4.99},
    {storeId: 'bookdepository', price: 11.88},
  ]
});

console.log(book);
// console.log(Immutable.fromJS(jsList));
// console.log(Immutable.List(jsList));
console.log(book.setIn(['genres', 1], 'YOYOYO'));

var todo = Immutable.fromJS({id: 1, text: 'hello world', genre: 'hiphop'});
console.log(todo.mergeDeep({id:1, text: 'fuck you', name:'huachao'}));
