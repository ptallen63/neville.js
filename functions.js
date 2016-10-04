

var _ = require('lodash');

var removeDups = function (array) {
	//Set tmp array
	var tmp = array;
	//set dups array;
	var dups= [];
	var cleaned = [];
	
	
	//uniq the tmp array

	
	tmp = _.uniqBy(tmp, 'email');
	console.log('tmp', tmp);

	//check to see if the tmp is not in the main arrya
	array.forEach(function(obj){
		match = _.find(tmp,function (t) {

			
			return t.id == obj.id});
		if (!match){
			//_.remove(array,function (a){return a.id == obj.id});
			
			dups.push(obj);


		}
		else {
			cleaned.push(obj);
			console.log('match');
		}	

		
	});
	var result = {
		cleaned: cleaned,
		dups: dups
	}

	return result;
}

var removeBlanks = function () {

};


var removeInvalid = function () {

};

var progressBar = function () {

};

var displayArt = function () {

};











module.exports.removeDups = removeDups;
module.exports.progressBar = progressBar;
module.exports.removeBlanks = removeBlanks;
module.exports.removeInvalid = removeInvalid;
module.exports.displayArt = displayArt;


