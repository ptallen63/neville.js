'use strict';
var fn = require ('./functions.js');
var fs = require('fs');
var csv = require('csv');
var ProgressBar = require('progress');
var chalk = require('chalk');
var success = chalk.green.bold;
var error = chalk.red.bold;
var info = chalk.blue.bold;

var neville = function () {
	
	fn.displayArt();
		
	var stdin = process.openStdin();

	console.log('What is the path to your input file?');
	stdin.addListener("data", function(d) {
	   
	   	//Progess bar - Fire LongBottom Engins
	   	fn.fireEngines();
	   	 
	    setTimeout(function() {

	    //Get input from user;
    	var pathToInputFile =  d.toString().trim()
 		process.stdin.destroy();

    	fn.getInputFile(pathToInputFile);

		var parser = csv.parse({delimiter: ','}, function(err, data){
		    
		    //Check to see if file has error
		    if(!data){
		    	console.log(error('%s does not fit the required .csv format'),pathToInputFile);
		    	process.exit();
		    }

		    // get positions
		    var positions = fn.getPositions(data);
		    
		    //Parse into record objects
		    var records = fn.parseIntoRecordsObject(data,pathToInputFile,positions);

		    //Get Results from cleaned data
		    var results = fn.cleanData(records);

		    console.log(success("\n Boom! Done! \n"));
		 
		    console.log(info('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'));
		    console.log("Total in: ",info(records.length));
		    console.log("Cleaned: ", info(results.cleaned.length));
		    console.log("Dups: ", info(results.dups.length));
		    console.log("Invalid: ", info(results.invalid.length));
		    console.log("Blanks: ", info(results.blanks.length));
		    console.log(info('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'));
		   

		    fn.writeToOutput('cleaned.csv',results.cleaned);
			fn.writeToOutput('duplicates.csv',results.dups);
			fn.writeToOutput('blanks.csv',results.blanks);
			fn.writeToOutput('invalid.csv',results.invalid);

			console.log(info('\n Thank you for using NEVILLE! \n'));
		});


		fs.createReadStream(pathToInputFile).pipe(parser);
		},3000);

	 });

};


module.exports.neville = neville;





