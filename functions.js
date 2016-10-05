'use strict';

var _ = require('lodash');
var ProgressBar = require('progress');
var figlet = require('figlet');

var removeDups = function (array) {
	 var bar = new ProgressBar('  Removing Duplicates [:bar] :percent', {
    complete: '=',
    incomplete: ' ',
    width: 30,
    total: array.length
  });

	//Set tmp array
	var tmp = array;
	//set dups array;
	var dups= [];
	var cleaned = [];
	
	
	
	//uniq the tmp array

	
	tmp = _.uniqBy(tmp, 'email');
	//check to see if the tmp is not in the main arrya
	array.forEach(function(obj){
		
		bar.tick()
		
		
		var match = _.find(tmp,function (t) {

			
			return t.id == obj.id});
		if (!match){
			//_.remove(array,function (a){return a.id == obj.id});
			
			dups.push(obj);


		}
		else {
			cleaned.push(obj);
		}	
		

		if (bar.complete) {
	    
			console.log('\n Dups removed\n');
	    
		}
	});


	var result = {
		cleaned: cleaned,
		dups: dups
	}

	return result;
}

var removeBlanks = function (ary) {
	 var bar = new ProgressBar('  Removing Blanks [:bar] :percent', {
	    complete: '=',
	    incomplete: ' ',
	    width: 30,
	    total: ary.length
	  });

	var blanks = [];
	var cleaned = [];
	ary.forEach(function (record) {
		if (record.email == "" || record.email ==  " "){
			blanks.push(record);
		}
		else {
			cleaned.push(record);
		}
		
		bar.tick()
		
		

	});

	if (bar.complete) {
	    
			console.log('\n Blanks removed\n');
	    
	}
	var result = {
		cleaned: cleaned,
		blanks: blanks
	}

	return result;
};


var removeInvalid = function (ary) {
	var bar = new ProgressBar('  Removing Invalid [:bar] :percent', {
	    complete: '=',
	    incomplete: ' ',
	    width: 30,
	    total: ary.length
	  });
	var pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
	var cleaned = [];
	var invalid = [];
	ary.forEach(function (record) {
		bar.tick();
		if (pattern.test(record.email)){
			cleaned.push(record);
		}
		else {
			invalid.push(record);
		}
	});

	if(bar.complete){
		console.log('\n Invalid Emails removed\n');
	}
	var result = {
		cleaned: cleaned,
		invalid: invalid
	}

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
	return array.indexOf('email');
}

var getIdPosition = function (array) {
	return array.indexOf('id');
}





var Record = class Record {
	constructor(id, email) {
	    this.id = id;
	    this.email = email;
	}
}



module.exports.removeDups = removeDups;
module.exports.progressBar = progressBar;
module.exports.removeBlanks = removeBlanks;
module.exports.removeInvalid = removeInvalid;
module.exports.displayArt = displayArt;
module.exports.Record = Record;
module.exports.getIdPosition = getIdPosition;
module.exports.getEmailPosition = getEmailPosition;


