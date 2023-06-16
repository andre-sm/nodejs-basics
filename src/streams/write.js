import { createWriteStream } from "fs";
import { fileURLToPath } from 'url';
import { join, dirname } from "path";
import { stdin, stdout } from "process";
import * as readline from 'readline';

const write = async () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));

    const filePath = join(__dirname, 'files', 'fileToWrite.txt');
    const writeStream = createWriteStream(filePath);
    const readLine = readline.createInterface({ input: stdin });

    stdout.write('Please, write a message...\n');

    const closeProcess = () => {
        readLine.close();
        process.exit();
    };

    readLine.on('line', line => {
        const currentLine = line.toString().trim();
        if(currentLine === 'exit') {
            closeProcess();
        } else {
            writeStream.write(`${currentLine}\n`);
        }
    });
};

await write();