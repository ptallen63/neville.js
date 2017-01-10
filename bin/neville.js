#!/usr/bin/env node
'use strict';
const lib = require('../lib/index.js');
const  pkg = require('../package.json');

let  help = false; 
let  version = false;
const neville = lib.neville

process.argv.forEach(function (val) {
  //Help Flag
  if (val == 'help' || val =='-help'){
  	help = true;
  }

  let versionArray = ['-V','-v','-version','-Version']
  for (let i = versionArray.length - 1; i >= 0; i--) {
  	
  		if (val === versionArray[i]){
  			version = true;
  		}
  }
  


});

if(version){
		console.log("v"+pkg.version)
    process.exit();
}


if(help){
	console.log('Type "neville" in the command line, then enter in the path to the .csv file you want cleaned. \n You can find  more help at https://github.com/ptallen63/neville.js');
}
else {
	neville();
}
