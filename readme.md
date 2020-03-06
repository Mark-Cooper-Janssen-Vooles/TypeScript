## TypeScript

***TS cheatsheet***

in terminal run: "tsc <filename>.ts" to compile, or "tsc <filename>.ts -w" to watch, aka reload whenever it changes

**Core Types typescript supports**

- number => 1, 4.3, -10 => all numbers, do differene between integers or floats
- string => "Hi", 'Hi', `Hi` => all text values
- boolean => true, false => just these, no truthy of falsy values
- object => {age: 30} => any javascript object, more specifiy types (type of object) are possible
- array => [1, 2, 3] => any javascript array, types can be flexible (i.e. any[]) or strict (i.e string[])
- tuple => [1, 2] => Added by typescript: fixed-length and fixed-type array. first element is numeric identifier, second is human readable string i.e. const role = [2, 'author'], role: [number, string]
- enum => enum { NEW, OLD } => added by typescript: automatically enumerated global constant identifiers
- any => * => any kind of value, no type assignment. doesn't tell typescript anything, wont throw any errors etc either. 

Type inferrence: typescript tries to understand which type you have in a certain variable of constant etc. So in the function, you specify the argument type it needs. 

Also if you have "let number1;" then assign it later "number1 = 5", better to do "let number1: number;"

but don't need to infer every type. I.e. "const number1 = 5;" typescript knows 5 is a number, don't need to say "const number1: number = 5;"

````typescript

const person: {
  name: string;
  age: number;
} = {
  name: "Mark",
  age: 28
};

console.log(person.name);
````

but better to let typescript infer like const person = { .. etc


````typescript

//Of course object types can also be created for nested objects.

//Let's say you have this JavaScript object:

    const product = {
      id: 'abc1',
      price: 12.99,
      tags: ['great-offer', 'hot-and-new'],
      details: {
        title: 'Red Carpet',
        description: 'A great carpet - almost brand-new!'
      }
    }

//This would be the type of such an object:

    {
      id: string;
      price: number;
      tags: string[],
      details: {
        title: string;
        description: string;
      }
    }

//So you have an object type in an object type so to say.

````


````typescript
//enum example: 

enum Role { ADMIN, READ_ONLY, AUTHOR };

const person = {
  name: "Mark",
  age: 28,
  hobbies: ["sports", "cooking"],
  role: Role.READ_ONLY
};

if (person.role === Role.ADMIN) {
  console.log("is admin")
} else if (person.role === Role.READ_ONLY) {
  console.log("is read only")
}

````

resultsConversion below is a literal string: we want a string, but it has to be either 'as-number' or 'as-text', or it wont compile! 
````typescript 
function combine(input1: number | string, input2: number | string, resultConversion: 'as-number' | 'as-text') { 
  let result; 
  if (typeof input1 === "number" && typeof input2 === "number" || resultConversion === "as-number") {
    result = +input1 + +input2;
  } else {
    result = input1.toString() + input2.toString();
  }

  return result;
}

````

````ts
//type aliases / custom types: 
// any name not built into javascript, ie you cant use Date
type Combinable = number | string;
type ConversionDescriptor = "as-number" | "as-text";

function combine(
  input1: Combinable, 
  input2: Combinable, 
  resultConversion: ConversionDescriptor
) { 
  let result; 
  if (typeof input1 === "number" && typeof input2 === "number" || resultConversion === "as-number") {
    result = +input1 + +input2;
  } else {
    result = input1.toString() + input2.toString();
  }

  return result;
}
````

return types: 
here number is set explicitly as the return type, but ts will impilcitly know this anyway.
````ts
function add(n1: number, n2: number): number {
  return n1+n2;
}
````

If you don't return anything, the type will be 'void', if you console log this it will be undefined. You should specify void as the return type to make it clear that it returns nothing!

````ts
function printResult(num: number): void {
  console.log("result: " + num);
}
````

````ts

//this says: combineValues is of type function which takes two arguments, both numbers, and returns a number (any function that does that)
let combineValues: (a: number, b: number) => number;

combineValues = add;

console.log(combineValues(8,8));

````


Call back functions can still return something, even if their return type is specified as void: 

"callback functions can return something, even if the argument on which they're passed does NOT expect a returned value."
````ts

function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
  const result = n1 + n2;
  cb(result);
}

addAndHandle(10, 20, (result) => {
  console.log(result);
})

````

````ts
// unknown type:
// unknown is differet to any. 
let userInput: unknown;
let userName: string;

userInput = 5;
userInput = "Max";
// this code doesn't work:
// userName = userInput;

//will work if you type check first:
if (typeof userInput === "string") {
  userName = userInput;
}

// a better choice than any, less flexible
````