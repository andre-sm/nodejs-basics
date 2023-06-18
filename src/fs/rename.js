import { rename as renameFile, access } from "fs/promises";
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

const rename = async () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const oldPath = join(__dirname, 'files', 'wrongFilename.txt');
    const newPath = join(__dirname, 'files', 'properFilename.md');

    try {
        if (!(await isExist(oldPath)) || await isExist(newPath)) {
            throw new Error('FS operation failed');
        }
        await renameFile(oldPath, newPath);
        console.log('File was renamed!');
    } catch (err) {
        throw new Error(err.message);
    }
};

await rename();