import WithTime from "./WithTime.js";

const fetchFromUrl = async (url, cb) => {
    const response = await fetch(url);
    const posts = await response.json();
    // fetch from https://jsonplaceholder.typicode.com/posts/1
    // transform to JSON
    return posts;
}

const withTime = new WithTime();

withTime.on('start', () => console.log('About to execute'));
withTime.on('end', () => console.log('Done with execute'));

withTime.execute(fetchFromUrl, 'https://jsonplaceholder.typicode.com/posts/1');

console.log(withTime.rawListeners("end"));
