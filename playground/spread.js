// Spread to function arguments
// function add (a, b) {
//   return a + b;
// }
//
// console.log(add(3, 1));
//
// var toAdd = [1,2,3];
//
// console.log (add (...toAdd));

// Spread Array to other array
// var groupA = ['Jen', 'Cory'];
// var groupB = ['Huachao', 'Ye'];
// var final = [...groupA, ...groupB];
//
// console.log(final);
var person = ['Andres', 25];
var personTwo = ['Jen', 29];
function greet (name, age) {
  console.log('Hi ' + name + ', you are ' + age);
}

greet(...person);

var names = ['Mike', 'Ben'];
var final = ['Chao', ...names];
final.forEach((item) => {
  console.log(item);
});
