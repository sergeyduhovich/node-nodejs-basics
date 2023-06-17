import { Worker } from "worker_threads";
import * as os from "os";

const workerPromise = (src, input) => {
  const worker = new Worker(src, { workerData: input });
  return new Promise((resolve) => {
    worker.on("message", (message) => {
      resolve({ status: "resolved", data: message.result });
    });
    worker.on("error", () => {
      resolve({ status: "error", data: null });
    });
  });
};

const performCalculations = async () => {
  const numCores = os.cpus().length;
  // console.log(`number of logical core is ${numCores}`);
  let workerPromisesArray = [];
  for (let i = 0; i < numCores; i++) {
    const input = 10 + i;
    // console.log(`main.js - created a worker ${input}`);
    const worker = workerPromise("./src/wt/worker.js", input);
    workerPromisesArray.push(worker);
  }
  const arrayToLog = await Promise.all(workerPromisesArray);
  console.log(arrayToLog);
};

await performCalculations();
