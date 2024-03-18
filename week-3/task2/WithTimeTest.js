import WithTime from "./WithTime.js";

const fetchFromUrl = (url, cb) => {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        cb(null, data);
    }).catch((err) => cb(err));
}

const withTime = new WithTime();

withTime.on('start', () => console.log('About to execute'));
withTime.on('end', () => console.log('Done with execute'));

withTime.execute(fetchFromUrl, 'https://jsonplaceholder.typicode.com/posts/1');

console.log(withTime.rawListeners('end'));
