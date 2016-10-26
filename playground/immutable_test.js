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
// var orderedMap = Immutable.OrderedMap();
// orderedMap = orderedMap.set(2, {id: 2, name: 'b'});
// orderedMap = orderedMap.set(1, {id: 1, name: 'a'});
//
// var map2 = Immutable.OrderedMap();
// map2 = map2.set(2, {id: 3, name: 'c'});
//
// console.log(orderedMap.merge(map2).toJS());

// Record
// var ABRecord = Immutable.Record({
//   a: 1,
//   b: undefined
// });
// //
// var r1 = new ABRecord({});
// var r2 = new ABRecord({b: 2});
// console.log(r1, r2);
// console.log(r1.merge(r2));
// console.log(r2.merge(r1));
// console.log(Immutable.fromJS(myRecord));

var a = Immutable.fromJS({
  artists: {
    1: {
      name: 'a'
    }
  }
});

var b = Immutable.fromJS({
  artists: {
    1: {
      name: 'b',
      id: 'c'
    }
  }
});

console.log(a.mergeDeep(b).toJS());
console.log(b.mergeDeep(a).toJS());
