import { Worker } from 'worker_threads';
import { cpus } from 'os';
import { fileURLToPath } from 'url';
import { join, dirname } from "path";

const performCalculations = async () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const workerPath = join(__dirname, 'worker.js');

    const coresArray = cpus();
    const arrayOfPromises = [];
    let counter = 10;

    coresArray.forEach(() => {
        const promise = new Promise((res, rej) => {
            const worker = new Worker(workerPath, { workerData: { num: counter } });
            worker.on('message', res);
            worker.on('error', rej);
        })
        arrayOfPromises.push(promise);
        counter++;
    });
    const results = await Promise.allSettled(arrayOfPromises);

    const resultsForLogging = results.map(res => ({
        status: res.status === 'fulfilled' ? 'resolved' : 'error',
        data: res.status === 'fulfilled' ? res.value : null
    }));
    console.log(resultsForLogging); 
};

await performCalculations();