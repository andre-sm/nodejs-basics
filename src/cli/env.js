const parseEnv = () => {
    const envKeys = Object.keys(process.env).filter(key => key.startsWith('RSS_'));
    const envPairs = envKeys.map(key => `${key}=${process.env[key]}`);
    console.log(envPairs.join('; '));
};

parseEnv();