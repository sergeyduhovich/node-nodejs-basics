import { workerData, parentPort } from "worker_threads";

const nthFibonacci = (n) =>
  n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = () => {
  const result = nthFibonacci(workerData);
  // console.log(`worker.js(${workerData}) calculated ${result}`);
  parentPort.postMessage({ workerId: workerData, result });
};

// console.log(`worker.js(${workerData}) loaded`);
sendResult();
