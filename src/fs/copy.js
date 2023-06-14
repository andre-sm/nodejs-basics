import { mkdir, readdir, copyFile } from "fs/promises";
import { existsSync } from "fs";
import { fileURLToPath } from 'url';
import { join, dirname } from "path";

const copy = async () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const originalPath = join(__dirname, 'files');
    const copyPath = join(__dirname, 'files_copy');

    try {
        if (!existsSync(copyPath) && existsSync(originalPath)) {
            await mkdir(copyPath, { recursive: true });
        } else {
            throw new Error('FS operation failed');
        }

        const files = await readdir(originalPath, { withFileTypes: true });
        console.log(files);
        
    } catch (err) {
        throw new Error(err.message);
    }
};

await copy();
