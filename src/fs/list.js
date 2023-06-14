import { readdir } from "fs/promises";
import { existsSync } from "fs";
import { fileURLToPath } from 'url';
import { join, dirname } from "path";

const list = async () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const filesPath = join(__dirname, 'files');

    try {
        if (!existsSync(filesPath)) {
            throw new Error('FS operation failed');
        }
        const files = (await readdir(filesPath, { withFileTypes: true })).map((file) => file.name);
        console.log(files);
    } catch (err) {
        throw new Error(err.message);
    }
};

await list();