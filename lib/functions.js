/*jshint node: true */
'use strict';

const _ = require('lodash');
const ProgressBar = require('progress');
const figlet = require('figlet');
const chalk = require('chalk');
const stringify = require('csv-stringify');
const success = chalk.green.bold;
const error = chalk.red.bold;
const info = chalk.blue.bold;
const fs = require('fs');
const Record = require('./record.js');

const removeDups = function(array, test) {
    if (!test) {
        var bar = new ProgressBar('  Removing Duplicates [:bar] :percent', {
            complete: '=',
            incomplete: ' ',
            width: 30,
            total: array.length
        });
    }
    //Set tmp array
    let tmp = array;
    //set dups array;
    let dups = [];
    let cleaned = [];

    //create index array
    const tmpObj = {};

    //uniq the tmp array and put it into object index
    tmp = _.uniqBy(tmp, 'email').map(r => {
        tmpObj[r.id] = r.id;
    });

    //check to see if the tmp is not in the main arrya
    array.forEach(function(obj) {
        if (!test) {
            bar.tick();
        }

        const match = tmpObj[obj.id];
        if (!match) {
            dups.push(obj);
        } else {
            cleaned.push(obj);
        }

        if (!test) {
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

const removeBlanks = function(ary, test) {
    let bar;
    if (!test) {
        bar = new ProgressBar('  Removing Blanks [:bar] :percent', {
            complete: '=',
            incomplete: ' ',
            width: 30,
            total: ary.length
        });
    }

    let blanks = [];
    let cleaned = [];
    ary.forEach(function(record) {
        if (record.email === "" || record.email === " ") {
            blanks.push(record);
        } else {
            cleaned.push(record);
        }

        if (!test) {
            bar.tick();
        }

    });
    if (!test) {
        if (bar.complete) {
            console.log(success('\n \u2713 Blanks removed... Gave Harry the Gillyweed!\n'));
        }
    }

    const result = {
        cleaned: cleaned,
        blanks: blanks
    };

    return result;
};

const removeInvalid = function(ary, test) {
    let bar;
    if (!test) {
        bar = new ProgressBar('  Removing Invalid [:bar] :percent', {
            complete: '=',
            incomplete: ' ',
            width: 30,
            total: ary.length
        });
    }

    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let cleaned = [];
    let invalid = [];
    ary.forEach(function(record) {
        if (!test) {
            bar.tick();
        }
        if (pattern.test(record.email)) {
            cleaned.push(record);
        } else {
            invalid.push(record);
        }
    });
    if (!test) {
        if (bar.complete) {
            console.log(success('\n \u2713 Invalid emails removed... Found Hannah!\n'));
        }
    }

    const result = {
        cleaned: cleaned,
        invalid: invalid
    };

    return result;
};

const progressBar = function(message) {

    var bar = new ProgressBar('[:bar] :percent :etas', {
        total: 50,
        clear: true
    });
    const timer = setInterval(function() {
        bar.tick();
        if (bar.complete) {
            if (message) {
                console.log('\n' + message + '\n');
            }
            clearInterval(timer);
        }
    }, 50);
};

const displayArt = function() {
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    console.log(figlet.textSync('Neville', {
        font: 'doom',
        horizontalLayout: 'default',
        verticalLayout: 'default'
    }));
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
};

const getEmailPosition = function(array) {

    if (typeof array !== 'object') {
        return -2;
    }

    return array.indexOf('email');
};

const getIdPosition = function(array) {
    if (typeof array !== 'object') {
        return -2;
    }
    return array.indexOf('id');
};

const cleanData = function(records) {
    let results = {};
    let tmp = removeBlanks(records);
    results.blanks = tmp.blanks;
    tmp = removeDups(tmp.cleaned);
    results.dups = tmp.dups;
    tmp = removeInvalid(tmp.cleaned);
    results.invalid = tmp.invalid;
    results.cleaned = tmp.cleaned;

    return results;

};
const getInputFile = function(path) {
    fs.stat(path, function(err, stat) {
        if (err === null) {
            //File exist
        } else if (err.code === 'ENOENT') {
            // file does not exist
            console.log(error('Uh-oh!... %s does not exist'), path);
            process.exit();
        } else {
            console.log('Some other error: ', err.code);
        }
    });

};

const writeToOutput = function(file, csv, positions) {
    let parsedCSV = [];
    let line1 = ['id', 'email'];
    for (let i = positions.other.length - 1; i >= 0; i--) {

        line1.push(positions.other[i]);
    }
    parsedCSV.push(line1);

    csv.forEach(function(record) {
        let line = [record.id, record.email];

        for (let i = record.otherData.length - 1; i >= 0; i--) {
            line.push(record.otherData[i]);
        }
        parsedCSV.push(line);
    });

    stringify(parsedCSV, function(err, output) {
        fs.writeFile('./' + file, output, 'utf8', function(err) {
            if (err) {
                console.log(err);
                console.log('Some error occured - file either not saved or corrupted file saved.');
            } else {
                console.log(success(file + ' created'));
                return true;
            }
        });
    });

};

const parseIntoRecordsObject = function(data, path, positions) {
    let records = [];

    let recordsLength = data.length - 1;
    let bar = new ProgressBar('  Extracting ' + recordsLength + ' records from ' + path + ' [:bar] :percent', {
        complete: '=',
        incomplete: ' ',
        width: 30,
        total: data.length
    });

    data.forEach(function(obj) {
        let otherData = [];
        for (let i = obj.length - 1; i >= 0; i--) {
            if (obj.indexOf(obj[i]) !== positions.id && obj.indexOf(obj[i]) !== positions.email) {
                otherData.push(obj[i]);
            }
        }
        bar.tick();
        if (obj[positions.id] !== 'id') {
            let record = new Record(obj[positions.id], obj[positions.email], otherData);
            records.push(record);
        }

    });
    if (bar.complete) {
        console.log(success('\n \u2713 That is some nice data\n'));
    }

    return records;
};

const getPositions = function(data) {
    //Check to see if There is an email position;

    let positions = {
        other: []
    };

    positions.email = getEmailPosition(data[0]);
    if (positions.email === -1) {
        console.log(error('No Email Field Found'));
        process.exit();
    }

    //Check to see if there is an id position
    positions.id = getIdPosition(data[0]);
    if (positions.id === -1) {
        console.log(error('No Id Field Found'));
        process.exit();
    }

    for (let i = data[0].length - 1; i >= 0; i--) {
        let str = data[0][i];
        if (str !== 'id' && str !== 'email') {
            positions.other.push(str);
        }

    }

    return positions;

};

const fireEngines = function() {
    let bar = new ProgressBar('  Firing up the LongBottom Engines [:bar] :percent', {
        complete: '=',
        incomplete: ' ',
        width: 30,
        total: 50
    });
    let timer = setInterval(function() {
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
