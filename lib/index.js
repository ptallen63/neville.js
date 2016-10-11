'use strict';
var func = require ('./functions.js');
var fs = require('fs');
var csv = require('csv');
var ProgressBar = require('progress');
var stringify = require('csv-stringify');
var chalk = require('chalk');
var records = [];
var pathToInputFile;
var success = chalk.green.bold;
var error = chalk.red.bold;
var info = chalk.blue.bold;
var Record = require('./record.js');

var help = false;
var neville = function () {
	process.argv.forEach(function (val) {
	  if (val == 'help' || val =='-help'){
	  	help = true;
	  }
	});

	if(help){
		console.log('Type "neville" in the command line, then enter in the path to the .csv file you want cleaned.');
	}

	else {
		func.displayArt();
		go();

	}





	function go(){
	var stdin = process.openStdin();

	console.log('What is the path to your input file?');
	stdin.addListener("data", function(d) {
	   
	   	//Progess bar - Fire LongBottom Engins
	   	var bar = new ProgressBar('  Firing up the LongBottom Engines [:bar] :percent', {
		    complete: '=',
		    incomplete: ' ',
		    width: 30,
		    total: 50
		  });
	   	 var timer = setInterval(function () {
		  bar.tick();
		  if (bar.complete) {
		    console.log(success("\nLet's do this!!..... Wait were is Trevor?!?!\n"));
		    clearInterval(timer);
		  }
		}, 50);

	   	 

	    setTimeout(function() {

	    	pathToInputFile =  d.toString().trim()
	 		process.stdin.destroy();

	    	fs.stat(pathToInputFile, function(err, stat) {
			    if(err === null) {
			        //File exist
			    } else if(err.code === 'ENOENT') {
			        // file does not exist
			        console.log(error('Uh-oh!... %s does not exist'),pathToInputFile);
			        process.exit();
			    } else {
			        console.log('Some other error: ', err.code);
			    }
			});

		 	
		
	  	

		

		var parser = csv.parse({delimiter: ','}, function(err, data){
		    if(!data){
		    	console.log(error('%s does not fit the required .csv format'),pathToInputFile);
		    	process.exit();
		    }
		    var emailPos = func.getEmailPosition(data[0]);
		    //Throw Error in Not definded
		    if (emailPos === -1){
		    	console.log(error('No Email Field Found'));
		    	process.exit();
		    }
		    
		    

		    var idPos = func.getIdPosition(data[0]);

		    //Throw Error in Not definded
		    if (idPos === -1){
		    	console.log(error('No Id Field Found'));
		    	process.exit();
		    }
		    //TODO:
		    var recordsLength = data.length-1;
		    var bar = new ProgressBar('  Extracting '+recordsLength+' records from '+pathToInputFile+' [:bar] :percent', {
			    complete: '=',
			    incomplete: ' ',
			    width: 30,
			    total: data.length
			  });

		    data.forEach(function (obj) {

		    	bar.tick()
		    	if (obj[idPos] != 'id'){
					var record = new Record(obj[idPos],obj[emailPos]); 
		    		records.push(record);
		    	}
		    	
		    })

		    if (bar.complete){
		    	console.log(success('\n \u2713 That is some nice data\n'));
		    }

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
};

module.exports.neville = neville;





