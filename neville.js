var func = require ('./functions.js');


var testArray = [
	{id:1, email:'test@test.com'},
	{id:2, email:'test@test.com'},
	{id:3, email:'test@test.com'},
	{id:4, email:'test@test.com'},
	{id:5, email:'test@test.com'},
	{id:6, email:'test@test.com'},
	{id:7, email:'test2@test.com'},
	{id:8, email:'test2@test.com'},
	{id:9, email:'test2@test.com'},
	{id:10, email:'test2@test.com'},
	{id:11, email:'test2@test.com'},
	{id:12, email:'test3@test.com'}

];

console.log('testArray',testArray);

data = func.removeDups(testArray);




console.log('cleaned',data.cleaned);
console.log('dups',data.dups);

