const getRandomNumber = () => {
    let number = Math.floor(Math.random() * 1000) + 1;
    console.log("The generated random number is:", number);
    return number;
};

getRandomNumber();
export default getRandomNumber;
