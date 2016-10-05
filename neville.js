'use strict';
var func = require ('./functions.js');
var fs = require('fs');
var csv = require('csv');

var stringify = require('csv-stringify');
var records = [];

func.displayArt();


var Record = func.Record;

var parser = csv.parse({delimiter: ','}, function(err, data){
    var emailPos = func.getEmailPosition(data[0]);
    //Throw Error in Not definded
    //TODO:
    

    var idPos = func.getIdPosition(data[0]);
    //Throw Error in Not definded
    //TODO:

    data.forEach(function (obj) {
    	if (obj[idPos] != 'id'){
			var record = new Record(obj[idPos],obj[emailPos]); 
    		records.push(record);
    	}
    	
    })
    var tmp = func.removeBlanks(records);
    var blanks = tmp.blanks;
    tmp = func.removeDups(tmp.cleaned);
    var dups = tmp.dups;
    tmp = func.removeInvalid(tmp.cleaned);
    var invalid = tmp.invalid;
    var cleaned = tmp.cleaned;

    // console.log('clean: ', cleaned);
    // console.log('blanks: ', blanks);
    // console.log('dups: ', dups);
    // console.log('invalid: ', invalid)

    console.log("Total in: ",records.length);
    console.log("cleaned: ", cleaned.length);
    console.log("Dups: ", dups.length);
    console.log("Invalid: ", invalid.length);
    console.log("Blanks: ", blanks.length);
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
		  fs.writeFile('./cleaned.csv', output, 'utf8', function (err) {
			  if (err) {
			    console.log('Some error occured - file either not saved or corrupted file saved.');
			  } else{
			    
			    console.log('cleaned.csv created');

			  }
			});
		});

		stringify(dupsCSV, function(err, output){
		  fs.writeFile('./duplicates.csv', output, 'utf8', function (err) {
			  if (err) {
			    console.log('Some error occured - file either not saved or corrupted file saved.');
			  } else{
			    console.log('duplicates.csv created');
			  }
			});
		});

		stringify(blanksCSV, function(err, output){
		  fs.writeFile('./blanks.csv', output, 'utf8', function (err) {
			  if (err) {
			    console.log('Some error occured - file either not saved or corrupted file saved.');
			  } else{
			    console.log('blanks.csv created');
			  }
			});
		});

		stringify(invalidCSV, function(err, output){
		  fs.writeFile('./invalid.csv', output, 'utf8', function (err) {
			  if (err) {
			    console.log('Some error occured - file either not saved or corrupted file saved.');
			  } else{
			    console.log('invalid.csv created');
			  }
			});
		});
});


	fs.createReadStream('./stress.csv').pipe(parser);



/*func.displayArt();


console.log('testArray',testArray);

data = func.removeDups(testArray);
console.log('cleaned',data.cleaned);
console.log('dups',data.dups);
func.progressBar('yay!');

blanksRemoved = func.removeBlanks(data.cleaned);
console.log('blanksRemoved', blanksRemoved);

//invalid format
validEmails = func.removeInvalid(blanksRemoved);
console.log('validEmails: ', validEmails.cleaned);
console.log('invalidEmails: ', validEmails.invalid);

*/







