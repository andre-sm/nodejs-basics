import { readdir, access } from "fs/promises";
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

const list = async () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const filesPath = join(__dirname, 'files');

    try {
        if (!(await isExist(filesPath))) {
            throw new Error('FS operation failed');
        }
        console.log(await readdir(filesPath));
    } catch (err) {
        throw new Error(err.message);
    }
};

await list();