


[intro]: https://s3-us-west-2.amazonaws.com/nevillejs/neville-screen-intro.jpg "Intro Screen"
# Neville JS

[![Build Status](https://travis-ci.org/ptallen63/neville.js.svg?branch=master)](https://travis-ci.org/ptallen63/neville.js)

Welcome to NevilleJS, a simple node command line email cleaner. This script will take an array of emails and take out duplicates, blanks, and invalid format emails.



## Version 0.2.3



## Install
	$ npm install -g neville

## Use

	$ neville

![intro][intro]

## Input

When asked for input, you must put in the correct path to your file. Also, your file must be in valid `.csv` format and contact a field of `email` and a field of `id`.

## Output

Three files will be outputed:
- `cleaned.csv` <-- CSV file of your clean emails
- `dups.csv` <-- CSV file of duplicate emails
- `blanks.csv` <-- CSV file of blank emails
- `invalid.csv` <-- CSV file of emails with invalid format

 