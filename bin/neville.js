#!/usr/bin/env node
 
const { neville }= require('../lib/index.js');
const  package = require('../package.json');

let  help = false; 
let  version = false;


process.argv.forEach(function (val) {
  //Help Flag
  if (val == 'help' || val =='-help'){
  	help = true;
  }

  versionArray = ['-V','-v','-version','-Version']
  for (let i = versionArray.length - 1; i >= 0; i--) {
  	
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
