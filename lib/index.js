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
		console.log('Here is some more help');
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
			    if(err == null) {
			        //File exist
			    } else if(err.code == 'ENOENT') {
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
		    if (emailPos == -1){
		    	console.log(error('No Email Field Found'));
		    	process.exit();
		    }
		    //TODO:
		    

		    var idPos = func.getIdPosition(data[0]);

		    //Throw Error in Not definded
		    if (idPos == -1){
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
		    var tmp = func.removeBlanks(records);
		    var blanks = tmp.blanks;
		    tmp = func.removeDups(tmp.cleaned);
		    var dups = tmp.dups;
		    tmp = func.removeInvalid(tmp.cleaned);
		    var invalid = tmp.invalid;
		    var cleaned = tmp.cleaned;

		    console.log(success("\n Boom! Done! \n"));
		    // console.log('clean: ', cleaned);
		    // console.log('blanks: ', blanks);
		    // console.log('dups: ', dups);
		    // console.log('invalid: ', invalid)
		    console.log(info('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'));
		    console.log("Total in: ",info(records.length));
		    console.log("Cleaned: ", info(cleaned.length));
		    console.log("Dups: ", info(dups.length));
		    console.log("Invalid: ", info(invalid.length));
		    console.log("Blanks: ", info(blanks.length));
		    console.log(info('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'));
		    // console.log(records);
		    
		    var cleanedCSV = [];
		    var blanksCSV = [];
		    var dupsCSV = [];
		    var invalidCSV = [];
		    cleaned.forEach(function (record) {
		    	cleanedCSV.push([record.id,record.email]);
		    });
		    blanks.forEach(function (record) {
		    	blanksCSV.push([record.id,record.email]);
		    });
		    dups.forEach(function (record) {
		    	dupsCSV.push([record.id,record.email]);
		    });
		    invalid.forEach(function (record) {
		    	invalidCSV.push([record.id,record.email]);
		    });

		    
			stringify(cleanedCSV, function(err, output){
			  fs.writeFile('cleaned.csv', output, 'utf8', function (err) {
				  if (err) {
				    console.log('Some error occured - file either not saved or corrupted file saved.');
				  } else{
				    
				    console.log(success('cleaned.csv created'));

				  }
				});
			});

			stringify(dupsCSV, function(err, output){
			  fs.writeFile('./duplicates.csv', output, 'utf8', function (err) {
				  if (err) {
				    console.log('Some error occured - file either not saved or corrupted file saved.');
				  } else{
				    console.log(success('duplicates.csv created'));
				  }
				});
			});

			stringify(blanksCSV, function(err, output){
			  fs.writeFile('./blanks.csv', output, 'utf8', function (err) {
				  if (err) {
				    console.log('Some error occured - file either not saved or corrupted file saved.');
				  } else{
				    console.log(success('blanks.csv created'));
				  }
				});
			});

			stringify(invalidCSV, function(err, output){
			  fs.writeFile('./invalid.csv', output, 'utf8', function (err) {
				  if (err) {
				    console.log('Some error occured - file either not saved or corrupted file saved.');
				  } else{
				    console.log(success('invalid.csv created'));
				  }
				});
			});

			console.log(info('\n Thank you for using NEVILLE! \n'));
		});


		fs.createReadStream(pathToInputFile).pipe(parser);
		},3000);

	 });

	};
};

module.exports.neville = neville;





