import { readFile } from "fs/promises";
import { existsSync } from "fs";
import { fileURLToPath } from 'url';
import { join, dirname } from "path";

const read = async () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const fileToRead = join(__dirname, 'files', 'fileToRead.txt');

    try {
        if (!existsSync(fileToRead)) {
            throw new Error('FS operation failed');
        }
        const data = await readFile(fileToRead, { encoding: 'utf8' });
        console.log(data);
    } catch (err) {
        throw new Error(err.message);
    }
};

await read();