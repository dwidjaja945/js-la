const cssModules = new Proxy({}, {
    get: (target, prop: string, receiver) => `${prop}`,
});

export default cssModules;