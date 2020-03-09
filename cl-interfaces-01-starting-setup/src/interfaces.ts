// type AddFn = (a: number, b: number) => number;

//same as the above:
interface AddFn {
  (n1: number, n2: number): number;
}

let add: AddFn;

add = (n1: number, n2: number) => {
  return n1 + n2;
}

interface Named {
  readonly name?: string;
  outputName?: string;
}

//just has the structure (properties, methods and types), not the concrete values:
interface Greetable extends Named {
  greet(phrase: string): void;
}

// forces Person to implement name and greet, because we're implementing the interface above. Thus interfaces are often used to share functionality amongst different classes
class Person implements Greetable {
  name?: string;
  age: number = 30;
  constructor(n?: string) {
    if(n) {
      this.name = n;
    }
  }

  greet(phrase: string) {
    if(this.name) {
      console.log(`${phrase} ${this.name}`);
    } else {
      console.log(phrase);
    }
  }
}

let user1: Greetable;

user1 = new Person('Max');
const user2 = new Person();
user2.greet("Sup playa")


user1.greet("Hi there - I am");

console.log(user1);