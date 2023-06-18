import { readFile } from "fs/promises";
import { fileURLToPath } from 'url';
import { join, dirname } from "path";
import { createHash } from 'crypto';

const calculateHash = async () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const filePath = join(__dirname, 'files', 'fileToCalculateHashFor.txt');

    try {
        const data = await readFile(filePath, { encoding: 'utf8' });
        const hash = createHash('sha256').update(data).digest('hex');
        console.log(hash);
    } catch (err) {
        throw new Error(err.message);
    }
};

await calculateHash();