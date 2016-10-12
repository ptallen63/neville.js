'use strict';
var func = require ('./functions.js');
var fs = require('fs');
var csv = require('csv');
var ProgressBar = require('progress');
var stringify = require('csv-stringify');
var chalk = require('chalk');
var pathToInputFile;
var success = chalk.green.bold;
var error = chalk.red.bold;
var info = chalk.blue.bold;



var neville = function () {
	
	func.displayArt();

	var stdin = process.openStdin();

	console.log('What is the path to your input file?');
	stdin.addListener("data", function(d) {
	   
	   	//Progess bar - Fire LongBottom Engins
	   	func.fireEngines();
	   	 
	    setTimeout(function() {

	    //Get input from user;
		pathToInputFile =  d.toString().trim()
			process.stdin.destroy();

		func.getInputFile(pathToInputFile);

		var parser = csv.parse({delimiter: ','}, function(err, data){
		    
		    //Check to see if file has error
		    if(!data){
		    	console.log(error('%s does not fit the required .csv format'),pathToInputFile);
		    	process.exit();
		    }


		    // get positions
		    var positions = func.getPositions(data);
		    
		    //Parse into record objects
		    var records = func.parseIntoRecordsObject(data,pathToInputFile,positions);

		    //Get Results from cleaned data
		    var results = func.cleanData(records);

		    console.log(success("\n Boom! Done! \n"));
		 
		    console.log(info('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'));
		    console.log("Total in: ",info(records.length));
		    console.log("Cleaned: ", info(results.cleaned.length));
		    console.log("Dups: ", info(results.dups.length));
		    console.log("Invalid: ", info(results.invalid.length));
		    console.log("Blanks: ", info(results.blanks.length));
		    console.log(info('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'));
		   

		    func.writeToOutput('cleaned.csv',results.cleaned);
			func.writeToOutput('duplicates.csv',results.dups);
			func.writeToOutput('blanks.csv',results.blanks);
			func.writeToOutput('invalid.csv',results.invalid);

		

			console.log(info('\n Thank you for using NEVILLE! \n'));
		});


		fs.createReadStream(pathToInputFile).pipe(parser);
		},3000);

	 });

};


module.exports.neville = neville;





