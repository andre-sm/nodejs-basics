import { unlink } from "fs/promises";
import { existsSync } from "fs";
import { fileURLToPath } from 'url';
import { join, dirname } from "path";

const remove = async () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const fileToRemove = join(__dirname, 'files', 'fileToRemove.txt');

    try {
        if (!existsSync(fileToRemove)) {
            throw new Error('FS operation failed');
        }
        await unlink(fileToRemove);
    } catch (err) {
        throw new Error(err.message);
    }
};

await remove();