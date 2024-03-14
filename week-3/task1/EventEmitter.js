export default class EventEmitter {
    listeners = {};  // key-value pair
   
    addListener(eventName, fn) {
        this.on(eventName, fn);
    }
      
    on(eventName, fn, once=false) {
        let newListener = {
            "once": once,
            "fn": fn,
        };

        if(this.listeners.hasOwnProperty(eventName)){
            this.listeners[eventName].push(newListener);
        } else {
            this.listeners[eventName] = [newListener];
        }
    }
   
    removeListener(eventName, fn) {
        this.off(eventName, fn);
    }
      
    off(eventName, fn) {
        if(this.listeners.hasOwnProperty(eventName)) {
            let listeners = this.listeners[eventName];
            let index = listeners.findIndex((listener) => listener.fn === fn);
            if(index >= 0) {
                listeners.splice(index, 1);
            }
        }
    }
   
    once(eventName, fn) {
        this.on(eventName, fn, true);
    }
   
    emit(eventName, ...args) {
        if(this.listeners.hasOwnProperty(eventName)) {
            const listeners = this.listeners[eventName]
            for(const listener of listeners) {
                let fn = listener["fn"];
                fn(...args);
            }
            let newListeners = listeners.filter(listener => !listener.once);
            this.listeners[eventName] = newListeners;
        }
    }
   
    listenerCount(eventName) {
        let count = 0;
        if(this.listeners.hasOwnProperty(eventName)) {
            count = this.listeners[eventName].length
        }
        return count;
    }
   
    rawListeners(eventName) {
        let listeners = [];
        if(this.listeners.hasOwnProperty(eventName)) {
            for(let listener of this.listeners[eventName]){
                listeners.push(listener.fn)
            }
        }
        return listeners;
    }
}
