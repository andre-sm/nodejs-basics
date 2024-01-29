import { workerData, parentPort } from 'worker_threads';

const { num } = workerData;

const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = () => {
    parentPort.postMessage(nthFibonacci(num));
};

sendResult();