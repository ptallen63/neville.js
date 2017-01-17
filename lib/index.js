/*jshint node: true */
'use strict';
const fn = require('./functions.js');
const fs = require('fs');
const csv = require('csv');
const ProgressBar = require('progress');
const chalk = require('chalk');
const success = chalk.green.bold;
const error = chalk.red.bold;
const info = chalk.blue.bold;

const neville = function() {

    fn.displayArt();

    //open input dialog
    const stdin = process.openStdin();
    console.log('What is the path to your input file?');

    stdin.addListener("data", function(d) {

        //Progess bar - Fire LongBottom Engins
        fn.fireEngines();

        setTimeout(function() {

            //Get input string from user;
            const pathToInputFile = d.toString().trim();
            process.stdin.destroy();

            fn.getInputFile(pathToInputFile);

            const parser = csv.parse({
                delimiter: ','
            }, function(err, data) {

                //Check to see if file has error
                if (!data) {
                    console.log(error('%s does not fit the required .csv format'), pathToInputFile);
                    process.exit();
                }

                // get positions
                const positions = fn.getPositions(data);

                //Parse into record objects
                const records = fn.parseIntoRecordsObject(data, pathToInputFile, positions);

                //Get Results from cleaned data
                const results = fn.cleanData(records);

                //OutPut Results
                console.log(success("\n Boom! Done! \n"));
                console.log(info('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'));
                console.log("Total in: ", info(records.length));
                console.log("Cleaned: ", info(results.cleaned.length));
                console.log("Dups: ", info(results.dups.length));
                console.log("Invalid: ", info(results.invalid.length));
                console.log("Blanks: ", info(results.blanks.length));
                console.log(info('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'));

                console.log(info('Creating your files...'));

                //Write to the output CSV files
                fn.writeToOutput('cleaned.csv', results.cleaned, positions);
                fn.writeToOutput('duplicates.csv', results.dups, positions);
                fn.writeToOutput('blanks.csv', results.blanks, positions);
                fn.writeToOutput('invalid.csv', results.invalid, positions);

                console.log(info('\n Thank you for using NEVILLE! \n'));
            });

            fs.createReadStream(pathToInputFile).pipe(parser);

        }, 3000);

    });

};

module.exports.neville = neville;
