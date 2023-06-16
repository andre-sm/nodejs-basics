import { Transform } from "stream";
import { stdin, stdout } from "process";

const transform = async () => {
    const reverse = new Transform({
        transform(chunk, encoding, callback) {
            const data = chunk.toString().trim();
            if (data !== '') {
                this.push(data.split('').reverse().join('') + '\n');
            }
            callback();
        }
    });

    stdout.write('Please, write a message to reverse...\n');
    stdin.pipe(reverse).pipe(stdout);
};

await transform();