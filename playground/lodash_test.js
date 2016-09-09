const _ = require('lodash');
let arr = [{id:1}, {id:2}];
console.log(_.find(arr, {id:null}));
