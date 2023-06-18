import { readFile, access } from "fs/promises";
import { fileURLToPath } from 'url';
import { join, dirname } from "path";

const isExist = async (path) => {
    try {
        await access(path);
        return true;
    } catch (err) {
        if (err.code === 'ENOENT') {
            return false;
        } else {
            throw new Error(err.message);
        }
    }
};

const read = async () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const fileToRead = join(__dirname, 'files', 'fileToRead.txt');

    try {
        if (!(await isExist(fileToRead))) {
            throw new Error('FS operation failed');
        }
        const data = await readFile(fileToRead, { encoding: 'utf8' });
        console.log(data);
    } catch (err) {
        throw new Error(err.message);
    }
};

await read();