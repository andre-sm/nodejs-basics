import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { join, dirname } from "path";

const spawnChildProcess = async (args) => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const filePath = join(__dirname, 'files', 'script.js');

    const childProcess = spawn('node', [filePath, ...args], {
        stdio: ['pipe', 'pipe', 'pipe', 'ipc']  
    });

    childProcess.stdin.write(args.join(' '));

    childProcess.stdout.on('data', data => {
        process.stdout.write(data);
    });
      
    childProcess.stderr.on('data', data => {
        process.stderr.write(data);
    });
};

spawnChildProcess(['arg1', 'arg2', 'arg3']);
