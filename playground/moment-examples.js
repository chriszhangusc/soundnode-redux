var moment = require('moment');

console.log(moment().format());

var now = moment();

// Current unix timestamp
console.log('Current timestamp', now.unix());

var timestamp = 1471135261;
var currentMoment = moment.unix(timestamp);
console.log('Current moment', currentMoment.format('MMMM Do, YYYY @ hh:mm A'));

// January 3rd, 2016 @ 12:13 AM
