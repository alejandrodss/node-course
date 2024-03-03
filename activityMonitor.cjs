const os = require('os');
const childProcess = require('child_process');
const fs = require('fs');

const platform = os.platform();

let result = '';

const command = platform === 'win32' ?
    `powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }"` :
    'ps -A -o %cpu,%mem,comm | sort -nr | head -n 1';

const execProcess = (command, args) => {
    const process = childProcess.exec(command, args);
    
    process.stderr.on('data', (data) =>  {
        console.error(`stderr: ${data}`);
    });

    process.stdout.on('data', (data) => {
        result = data;
    });
};

const logWrite = (command) => {
    execProcess(command);
    const lineToAppend = `${Date.now()} : ${result}`;
    fs.appendFile('activityMonitor.log', lineToAppend, (err) => {
        if (err) console.log("And error has happened while reading/writing the file");
    });
};

const consoleWrite = (command) => {
    execProcess(command);
    process.stdout.write(`\r\x1Bc`);
    const consoleSize = process.stdout.columns;

    if(result.length > consoleSize) {
        let newOutput = result.slice(0, consoleSize - 3);
        newOutput += '...';
        process.stdout.write(`${newOutput}`);
    } else {
        process.stdout.write(`${result}`);
    }
}

setInterval(logWrite, 60000, command);
setInterval(consoleWrite, 100, command);
