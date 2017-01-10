


[intro]: https://s3-us-west-2.amazonaws.com/nevillejs/Oct-07-2016+10-32-33.gif "Intro Screen"

# Neville JS

[![Build Status](https://travis-ci.org/ptallen63/neville.js.svg?branch=master)](https://travis-ci.org/ptallen63/neville.js) [![npm version](https://badge.fury.io/js/neville.svg)](https://badge.fury.io/js/neville)![MitLicensed](https://img.shields.io/github/license/ptallen63/neville.svg)

Welcome to NevilleJS, a simple node command line email cleaner. This script will take an array of emails and take out duplicates, blanks, and invalid format emails.



## Version 0.7.1



## Install
	$ npm install -g neville

## Use

	$ neville

![intro][intro]


### Input

When asked for input, you must put in the correct path to your file. Also, your file must be in valid `.csv` format and must contain a contact field of `email` and a field of `id`.

### Output

Three files will be outputed:
- `cleaned.csv` <-- CSV file of your clean emails
- `dups.csv` <-- CSV file of duplicate emails
- `blanks.csv` <-- CSV file of blank emails
- `invalid.csv` <-- CSV file of emails with invalid format

## LISCENSE

MIT

	MIT License (MIT)

	Copyright (c) 2014 - 2016, Paul Allen

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.

 
