var Immutable = require('immutable');
//
// var merge = Immutable.merge;
// var concat = Immutable.concat;
// var obj1 = Immutable.fromJS({
//   isFetching: true,
//   songIds: [1,2,3],
//   songs: {1:{name:'1'}, 2: {name:'2'}}
// });
//
// var obj2 = Immutable.fromJS({
//   isFetching: false,
//   songIds: [4,5,6],
//   songs: {4:{name:'4'}}
// });
//
// console.log(obj1.mergeDeep(obj2));
// console.log(obj1.get('songIds').concat(obj2.get('songIds')));
//
// console.log(obj1.delete('isFetching'));

//OrderedMap
var orderedMap = Immutable.OrderedMap();
orderedMap = orderedMap.set(2, {id: 2, name: 'b'});
orderedMap = orderedMap.set(1, {id: 1, name: 'a'});

var map2 = Immutable.OrderedMap();
map2 = map2.set(2, {id: 3, name: 'c'});

console.log(orderedMap.merge(map2).toJS());

// Record
// var ABRecord = Immutable.Record({
//   a: 1,
//   b: 2
// });
//
// var myRecord = new ABRecord({b: 3});
// console.log(myRecord);
// console.log(Immutable.fromJS(myRecord));
