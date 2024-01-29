import { createReadStream, createWriteStream } from 'fs';
import { fileURLToPath } from 'url';
import { join, dirname } from "path";
import { createGzip } from "zlib";

const compress = async () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const filePath = join(__dirname, 'files', 'fileToCompress.txt');
    const archivePath = join(__dirname, 'files', 'archive.gz');

    const gzip = createGzip();
    const readStream = createReadStream(filePath);
    const archive = createWriteStream(archivePath);

    readStream.pipe(gzip).pipe(archive);
};

await compress();