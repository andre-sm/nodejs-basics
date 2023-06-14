const parseArgs = () => {
    const args = [];
    process.argv.slice(2).forEach((arg, i, arr) => {
        if (i % 2 === 0) {
            args.push(`${arg.slice(2)} is ${arr[i + 1]}`);
        }
    });
    console.log(args.join(', '));
};

parseArgs();