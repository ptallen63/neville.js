/*jshint node: true */
//record.js
'use strict';
 module.exports =
	class Record {
		constructor(id, email,otherData) {
		    this.id = id;
		    this.email = email;
		    this.otherData = otherData;
		}
	};

