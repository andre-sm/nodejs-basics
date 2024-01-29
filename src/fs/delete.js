import { unlink, access } from "fs/promises";
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

const remove = async () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const fileToRemove = join(__dirname, 'files', 'fileToRemove.txt');

    try {
        if (!(await isExist(fileToRemove))) {
            throw new Error('FS operation failed');
        }
        await unlink(fileToRemove);
        console.log('File was deleted!');
    } catch (err) {
        throw new Error(err.message);
    }
};

await remove();