# Neville JS

[![Build Status](https://travis-ci.org/ptallen63/neville.js.svg?branch=master)](https://travis-ci.org/ptallen63/neville.js) [![npm version](https://badge.fury.io/js/neville.svg)](https://badge.fury.io/js/neville)![MitLicensed](https://img.shields.io/github/license/ptallen63/neville.svg)

Welcome to NevilleJS, a simple node command line email cleaner. This script will take an array of emails and take out duplicates, blanks, and invalid format emails.

## Version 0.7.2

## Install

```
$ npm install -g neville
```

## Use

```
$ neville
```

![intro]

### Input

When asked for input, you must put in the correct path to your file. Also, your file must be in valid `.csv` format and must contain a contact field of `email` and a field of `id`.

### Output

Three files will outputed:

- `cleaned.csv` <-- CSV file of your clean emails
- `dups.csv` <-- CSV file of duplicate emails
- `blanks.csv` <-- CSV file of blank emails
- `invalid.csv` <-- CSV file of emails with invalid format

[intro]: https://s3-us-west-2.amazonaws.com/nevillejs/Oct-07-2016+10-32-33.gif "Intro Screen"
