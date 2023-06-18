import { mkdir, readdir, copyFile, access } from "fs/promises";
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

const copy = async () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const originalPath = join(__dirname, 'files');
    const copyPath = join(__dirname, 'files_copy');

    try {
        if (!(await isExist(originalPath)) || await isExist(copyPath)) {
            throw new Error('FS operation failed');
        } 
        await mkdir(copyPath, { recursive: true });

        const files = await readdir(originalPath);

        for (const file of files) {
            const originalFilePath = join(originalPath, file);
            const copyFilePath = join(copyPath, file);
            await copyFile(originalFilePath, copyFilePath);
        }
        console.log('Files were copied!');
    } catch (err) {
        throw new Error(err.message);
    }
};

await copy();
