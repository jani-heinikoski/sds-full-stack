// const person = {
//     name: "John Doe",
//     age: 30,
// };

// console.log(__dirname, __filename);

class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greeting() {
        console.log(`my name is ${this.name} and I am ${this.age}`);
    }
}

module.exports = Person;
