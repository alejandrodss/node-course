import EventEmitter from '../task1/EventEmitter.js';

export default class WithTime extends EventEmitter {
    execute(asyncFunc, ...args) {
        this.on('data', (data) => console.log(data));
        this.emit('start');
        const startTime = Date.now();
        asyncFunc(...args, (err, data) => {
            if(err !== null) {
                console.error(err);
            } else {
                this.emit('data', data);
            }
            const endTime = Date.now();
            this.emit('end');
            console.log(`Execution time: ${endTime - startTime} ms`);
        });
    }
 }