import { writeFile, access } from "fs/promises";
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

const create = async () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const filePath = join(__dirname, 'files', 'fresh.txt');

    try {
        if (await isExist(filePath)) {
            throw new Error('FS operation failed');
        }
        await writeFile(filePath, 'I am fresh and young');
        console.log('File was created!');
    } catch(err) {
        throw new Error(err.message);
    }
};

await create();