import { createReadStream } from "fs";
import { fileURLToPath } from 'url';
import { join, dirname } from "path";

const read = async () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));

    const filePath = join(__dirname, 'files', 'fileToRead.txt');
    const readStream = createReadStream(filePath, 'utf-8');

    let data = '';
    readStream.on('data', chunk => data += chunk);
    readStream.on('end', () => process.stdout.write(data));
    readStream.on('error', err => console.log(err.message));
   
};

await read();