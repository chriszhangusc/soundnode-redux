var Immutable = require('immutable');

var merge = Immutable.merge;
var concat = Immutable.concat;
var obj1 = Immutable.fromJS({
  isFetching: true,
  songIds: [1,2,3],
  songs: {1:{name:'1'}, 2: {name:'2'}}
});

var obj2 = Immutable.fromJS({
  isFetching: false,
  songIds: [4,5,6],
  songs: {4:{name:'4'}}
});

console.log(obj1.mergeDeep(obj2));
console.log(obj1.get('songIds').concat(obj2.get('songIds')));

console.log(obj1.delete('isFetching'));
