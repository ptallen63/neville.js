var mocha = require('mocha');
require('chai-jasmine');
var func = require('./lib/functions.js');

var testArray = [
	{id: 1, email:"test@test.com"},
	{id: 2, email:"test1@test.com"},
	{id: 3, email:"test2@test.com"},
	{id: 4, email:"test@test.com"},
	{id: 5, email:" "},
	{id: 6, email:"test@test"}
]

describe('Functions!', function() {

	//getEmailPostion();
	describe('#getEmailPosition()', function () {
		
		it('Should take array', function () {
		 	expect(func.getEmailPosition(0)).toBe(-2);
		 	expect(func.getEmailPosition(['1'])).toBe(-1);
		 });

		it('Should return return -1 when email not found', function () {
		 	expect(func.getEmailPosition(['1'])).toBe(-1);
		 });

		it('Should return return pos of email field', function () {
		 	expect(func.getEmailPosition(['email'])).toBe(0);
		 	expect(func.getEmailPosition(['id','email'])).toBe(1);
		 });
	});

	//getIdPostion();
	describe('#getIdPosition()', function () {
		
		it('Should take array', function () {
		 	expect(func.getIdPosition(0)).toBe(-2);
		 	expect(func.getIdPosition(['1'])).toBe(-1);
		 });

		it('Should return return -1 when email not found', function () {
		 	expect(func.getIdPosition(['1'])).toBe(-1);
		 	expect(func.getIdPosition(['email'])).toBe(-1);
		 });

		it('Should return return pos of email field', function () {
		 	expect(func.getIdPosition(['id'])).toBe(0);
		 	expect(func.getIdPosition(['id','email'])).toBe(0);
		 });
	});

	//removeDups();
	describe('#removeDups()', function () {
			

			var cleaned = func.removeDups(testArray,true);
			
		it('Shoudl take remove exact email dups', function () {
			expect(cleaned.cleaned.length).toBe(5);
			expect(cleaned.dups.length).toBe(1);
			expect(cleaned.length).toBeUndefined();
			expect(cleaned.cleaned.length).not.toBe(3);
		});

		it('Should prodcue a cleaned array', function () {
			expect(cleaned.cleaned.length).toBe(5);
		});

		it('Should prodcue a dups array', function () {
			expect(cleaned.dups.length).toBe(1);
		});

		it('Should push an object to the Array', function () {
			expect(typeof cleaned.cleaned[0]).toBe('object');
			expect(typeof cleaned.cleaned[0]).not.toBe('string');
		})

		
	});

	//removeBlanks();
	describe('#removeBlanks()', function () {

			var cleaned = func.removeBlanks(testArray,true);

		it('Shoudl take remove blank email', function () {
			expect(cleaned.cleaned.length).toBe(5);
			expect(cleaned.blanks.length).toBe(1);
			expect(cleaned.length).toBeUndefined();
			expect(cleaned.cleaned.length).not.toBe(3);
		});

		it('Should prodcue a cleaned array', function () {
			expect(cleaned.cleaned.length).toBe(5);
		});

		it('Should prodcue a blanks array', function () {
			expect(cleaned.blanks.length).toBe(1);
		});

		it('Should push an object to the Array', function () {
			expect(typeof cleaned.cleaned[0]).toBe('object');
			expect(typeof cleaned.cleaned[0]).not.toBe('string');
		})

		
	});

	//removeInvalid();
	describe('#removeInvalid()', function () {

			var cleaned = func.removeInvalid(testArray,true);

		it('Shoudl take remove invalid email', function () {
			expect(cleaned.cleaned.length).toBe(4);
			expect(cleaned.invalid.length).toBe(2);
			expect(cleaned.length).toBeUndefined();
			expect(cleaned.cleaned.length).not.toBe(3);
		});

		it('Should prodcue a cleaned array', function () {
			expect(cleaned.cleaned.length).toBe(4);
		});

		it('Should prodcue a invalid array', function () {
			expect(cleaned.invalid.length).toBe(2);
		});

		it('Should push an object to the Array', function () {
			expect(typeof cleaned.cleaned[0]).toBe('object');
			expect(typeof cleaned.cleaned[0]).not.toBe('string');
		})

		
	});
 
});
