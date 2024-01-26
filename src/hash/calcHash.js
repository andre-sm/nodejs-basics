import { createReadStream } from "fs";
import { fileURLToPath } from 'url';
import { join, dirname } from "path";
import { createHash } from 'crypto';

const calculateHash = async () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const filePath = join(__dirname, 'files', 'fileToCalculateHashFor.txt');

    try {
        const readStream = createReadStream(filePath, 'utf-8');
        let data = '';
        readStream.on('data', chunk => data += chunk);
        readStream.on('end', () => {
            const hash = createHash('sha256').update(data).digest('hex');
            console.log(hash);
        });

        readStream.on('error', err => console.log(err.message));
    } catch (err) {
        throw new Error(err.message);
    }
};

await calculateHash();