const os = require('os');
const childProcess = require('child_process');
const fs = require('fs');

const platform = os.platform();

const command = platform === 'win32' ?
    `powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }"` :
    'ps -A -o %cpu,%mem,comm | sort -nr | head -n 1';

const execProcess = (command, callback) => {
    const process = childProcess.exec(command, callback);
    
    process.stderr.on('data', (data) =>  {
        console.error(`stderr: ${data}`);
    });
};

const logWrite = (command) => {
    execProcess(command, (error, stdout, stderr) => {
        if(error !== null) {
            console.error("An error has ocurred: ", error);
        }

        const lineToAppend = `${Date.now()} : ${stdout}`;
        fs.appendFile('activityMonitor.log', lineToAppend, (err) => {
            if (err) console.log("And error has happened while reading/writing the file");
        });
    });
};

const consoleWrite = (command) => {
    execProcess(command, (error, stdout, stderr) => {
        if(error !== null) {
            console.error("An error has ocurred: ", error);
        }

        process.stdout.write(`\r\x1Bc`);
        const consoleSize = process.stdout.columns;

        if(stdout.length > consoleSize) {
            let newOutput = stdout.slice(0, consoleSize - 3);
            newOutput += '...';
            process.stdout.write(`${newOutput}`);
        } else {
            process.stdout.write(`${stdout}`);
        }
    });
}

setInterval(logWrite, 60000, command);
setInterval(consoleWrite, 100, command);
