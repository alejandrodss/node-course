import EventEmitter from '../task1/EventEmitter.js';

export default class WithTime extends EventEmitter {
    async execute(asyncFunc, ...args) {
        this.on('data', (data) => console.log(data));
        this.emit('start');
        const startTime = Date.now();
        await asyncFunc(...args)
            .then((data) => {
                this.emit('data', data);
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                const endTime = Date.now();
                this.emit('end');
                console.log(`Execution time: ${endTime - startTime} ms`);
            });
        // call asyncFunc with args specified
        // compute the time it takes to execute asyncFunc
    }
 }