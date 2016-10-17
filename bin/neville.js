#!/usr/bin/env node
 
var lib= require('../lib/index.js');
var fs = require('fs');

var neville = lib.neville;
var help = false; 
var version = false;

var package = JSON.parse(fs.readFileSync('package.json', 'utf8'));

process.argv.forEach(function (val) {
  //Help Flag
  if (val == 'help' || val =='-help'){
  	help = true;
  }

  versionArray = ['-V','-v','-version','-Version']
  for (var i = versionArray.length - 1; i >= 0; i--) {
  	
  		if (val === versionArray[i]){
  			version = true;
  		}
  }
  


});

if(version){
		console.log("v"+package.version)
    process.exit();
}


if(help){
	console.log('Type "neville" in the command line, then enter in the path to the .csv file you want cleaned.');
}
else {
	neville();
}
