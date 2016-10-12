#!/usr/bin/env node
 
var lib= require('../lib/index.js');
var neville = lib.neville;
var help = false; 

process.argv.forEach(function (val) {
  if (val == 'help' || val =='-help'){
  	help = true;
  }
});

if(help){
	console.log('Type "neville" in the command line, then enter in the path to the .csv file you want cleaned.');
}
else {
	neville();
}
