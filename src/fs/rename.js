import fs from "fs/promises";
import { existsSync } from "fs";
import { fileURLToPath } from 'url';
import { join, dirname } from "path";

const rename = async () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const oldPath = join(__dirname, 'files', 'wrongFilename.txt');
    const newPath = join(__dirname, 'files', 'properFilename.md');

    try {
        if (!existsSync(oldPath) || existsSync(newPath)) {
            throw new Error('FS operation failed');
        }
        await fs.rename(oldPath, newPath);
    } catch (err) {
        throw new Error(err.message);
    }

};

await rename();