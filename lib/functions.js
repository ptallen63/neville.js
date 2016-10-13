/*jshint node: true */
'use strict';

var _ = require('lodash');
var ProgressBar = require('progress');
var figlet = require('figlet');
var chalk = require('chalk');
var stringify = require('csv-stringify');
var success = chalk.green.bold;
var error = chalk.red.bold;
var info = chalk.blue.bold;
var fs = require('fs');
var Record = require('./record.js');
var removeDups = function (array, test) {
    if (!test) {
        var bar = new ProgressBar('  Removing Duplicates [:bar] :percent', {
                complete: '=',
                incomplete: ' ',
                width: 30,
                total: array.length
            });
    }
	//Set tmp array
	var tmp = array;
	//set dups array;
	var dups= [];
	var cleaned = [];

	//uniq the tmp array
	tmp = _.uniqBy(tmp, 'email');
	//check to see if the tmp is not in the main arrya
	array.forEach(function(obj){
		if(!test){bar.tick();}
		
		var match = _.find(tmp,function (t) {
			return t.id === obj.id;
		});
		if (!match){
			dups.push(obj);
		}
		else {
			cleaned.push(obj);
		}	
		
		if(!test){
			if (bar.complete) {
		    
				console.log(success('\n \u2713 Dups removed... Slayed that Basilisk\n'));
		    
			}
		}
		
	});


	var result = {
		cleaned: cleaned,
		dups: dups
	};

	return result;
};

var removeBlanks = function (ary,test) {
	 var bar;
	 if(!test){
	 	bar = new ProgressBar('  Removing Blanks [:bar] :percent', {
	    complete: '=',
	    incomplete: ' ',
	    width: 30,
	    total: ary.length
	  });
	 }
	 

	var blanks = [];
	var cleaned = [];
	ary.forEach(function (record) {
		if (record.email === "" || record.email ===  " "){
			blanks.push(record);
		}
		else {
			cleaned.push(record);
		}
		
		if(!test){bar.tick();}
		
		

	});
	if(!test){
		if (bar.complete) {
			console.log(success('\n \u2713 Blanks removed... Gave Harry the Gillyweed!\n'));
		}
	}
	
	var result = {
		cleaned: cleaned,
		blanks: blanks
	};

	return result;
};


var removeInvalid = function (ary,test) {
	var bar;
	if(!test){
		bar = new ProgressBar('  Removing Invalid [:bar] :percent', {
	    complete: '=',
	    incomplete: ' ',
	    width: 30,
	    total: ary.length
	  });
	}
	
	var pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
	var cleaned = [];
	var invalid = [];
	ary.forEach(function (record) {
		if(!test){bar.tick();}
		if (pattern.test(record.email)){
			cleaned.push(record);
		}
		else {
			invalid.push(record);
		}
	});
	if(!test){
		if(bar.complete){
			console.log(success('\n \u2713 Invalid emails removed... Found Hannah!\n'));
		}
	}
	
	var result = {
		cleaned: cleaned,
		invalid: invalid
	};

	return result; 
};

var progressBar = function (message) {

 
	var bar = new ProgressBar('[:bar] :percent :etas', { 
		total: 50,
		clear: true
	});
	var timer = setInterval(function () {
	  bar.tick();
	  if (bar.complete) {
	    if (message){
			console.log('\n'+message+'\n');
	    }
	    clearInterval(timer);
	  }
	}, 50);
};

var displayArt = function () {
	console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
	console.log(figlet.textSync('Neville', {
	    font: 'doom',
	    horizontalLayout: 'default',
	    verticalLayout: 'default'
	}));
	console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
};

var getEmailPosition = function (array) {
	
	if(typeof array !== 'object'){
		return -2;
	}
	

	return array.indexOf('email');
};

var getIdPosition = function (array) {
	if(typeof array !== 'object'){
		return -2;
	}
	return array.indexOf('id');
};

var cleanData = function (records){
	var results = {};
	var tmp = removeBlanks(records);
    results.blanks = tmp.blanks;
    tmp = removeDups(tmp.cleaned);
   	results.dups = tmp.dups;
    tmp = removeInvalid(tmp.cleaned);
    results.invalid = tmp.invalid;
    results.cleaned = tmp.cleaned;

    return results; 

};
var getInputFile =  function (path){
	fs.stat(path, function(err, stat) {
	    if(err === null) {
	        //File exist
	    } else if(err.code === 'ENOENT') {
	        // file does not exist
	        console.log(error('Uh-oh!... %s does not exist'),path);
	        process.exit();
	    } else {
	        console.log('Some other error: ', err.code);
	    }
	});

};

var writeToOutput = function (file, csv) {
	var parsedCSV = [];

	csv.forEach(function (record) {
		    	parsedCSV.push([record.id,record.email]);
		    });

	

	stringify(parsedCSV, function(err, output){
	  fs.writeFile('./'+file, output, 'utf8', function (err) {
		  if (err) {
		    console.log(err);
		    console.log('Some error occured - file either not saved or corrupted file saved.');
		  } else{
		    console.log(success(file+' created'));
		  }
		});
	});

};

var parseIntoRecordsObject = function (data,path,positions) {
	var records = [];
	var recordsLength = data.length-1;
    var bar = new ProgressBar('  Extracting '+recordsLength+' records from '+path+' [:bar] :percent', {
	    complete: '=',
	    incomplete: ' ',
	    width: 30,
	    total: data.length
	  });

    data.forEach(function (obj) {

    	bar.tick();
    	if (obj[positions.id] !== 'id'){
			var record = new Record(obj[positions.id],obj[positions.email]); 
    		records.push(record);
    	}
    	
    });
    if (bar.complete){console.log(success('\n \u2713 That is some nice data\n'));}

    return records;
};

var getPositions = function (data){
	//Check to see if There is an email position;
	  var positions = {};
	  positions.email = getEmailPosition(data[0]);
	    if (positions.email === -1){
	    	console.log(error('No Email Field Found'));
	    	process.exit();
	    }

	//Check to see if there is an id position
	  positions.id = getIdPosition(data[0]);
	    if (positions.id === -1){
	    	console.log(error('No Id Field Found'));
	    	process.exit();
	    }

	return positions;

};

var fireEngines = function (){
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

};




module.exports.removeDups = removeDups;
module.exports.progressBar = progressBar;
module.exports.removeBlanks = removeBlanks;
module.exports.removeInvalid = removeInvalid;
module.exports.displayArt = displayArt;
module.exports.getIdPosition = getIdPosition;
module.exports.getEmailPosition = getEmailPosition;
module.exports.writeToOutput = writeToOutput;
module.exports.cleanData = cleanData;
module.exports.getInputFile = getInputFile;
module.exports.parseIntoRecordsObject = parseIntoRecordsObject;
module.exports.getPositions = getPositions;
module.exports.fireEngines = fireEngines;


