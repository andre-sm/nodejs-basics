import { writeFile } from "fs/promises";
import { existsSync } from "fs";
import { fileURLToPath } from 'url';
import { join, dirname } from "path";

const create = async () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const filePath = join(__dirname, 'files', 'fresh.txt');

    try {
        if (!existsSync(filePath)) {
            await writeFile(filePath, 'I am fresh and young');
        } else {
            throw new Error('FS operation failed');
        }
    } catch(err) {
        throw new Error(err.message);  
    }
};

await create();