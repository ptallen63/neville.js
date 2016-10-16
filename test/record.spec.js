/*jshint node: true */
const mocha = require('mocha');
require('chai-jasmine');
const Record = require('../lib/record.js');
var testData = {
	email: 'ptallen63@gmail.com',
	id: 1,
	otherData: ['green', 'blue', 'red']
};

describe('record.js', function () {
	it('Should have three properties', function () {
		record = new Record(testData.id, testData.email, testData.otherData);
		expect(record.email).toBeDefined();
		expect(record.id).toBeDefined();
		expect(record.otherData).toBeDefined();
	});

})