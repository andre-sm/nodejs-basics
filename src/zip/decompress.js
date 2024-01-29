import { createReadStream, createWriteStream } from 'fs';
import { fileURLToPath } from 'url';
import { join, dirname } from "path";
import { createGunzip } from "zlib";

const decompress = async () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const archivePath = join(__dirname, 'files', 'archive.gz');
    const filePath = join(__dirname, 'files', 'fileToCompress.txt');

    const unzip = createGunzip();
    const readStream = createReadStream(archivePath);
    const writeStream = createWriteStream(filePath);
    
    readStream.pipe(unzip).pipe(writeStream);
};

await decompress();