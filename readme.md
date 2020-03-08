## TypeScript

***TS cheatsheet***

in terminal run: "tsc <filename>.ts" to compile, or "tsc <filename>.ts -w" to watch, aka reload whenever it changes

to watch the whole project, "tsc --init" (creates tsconfig.json file), can now run "tsc" and it will compile all files in the project. Or "tsc -w" and it will watch them too.

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


---

To use debugger in vs code: download vs code extension "debugger for chrome" and in the tsconfig file, set sourceMap to true



---


classes: 

````ts
class Department {
  name: string;
  employees: string[] = [];

  constructor(n: string) {
    this.name = n;
  }

  describe(this: Department) {
    console.log(`Department: ${this.name}`)
  }

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInfo() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

const coles = new Department("Coles");
coles.describe();


coles.addEmployee("Not Mark");
coles.addEmployee("Manure");
coles.employees[2] = "Anna";
coles.printEmployeeInfo();
````

in the above code, you can access employees by coles.employees[2] = "Anna"; but maybe you don't want to be able to access it outside the class just in case! So you can create a private propery: 

````ts
class Department {
  name: string;
  private employees: string[] = [];

  constructor(n: string) {
    this.name = n;
  }
  //...etc
````

Can also mark methods as private!
Private is the "modifier", you also have "public" but that is the default for classes.


-----

class initialization shortcut for typescript: 

````ts
class Department {
  // private id: string;
  // private name: string;
  private employees: string[] = [];

  constructor(private id: string, public name: string) {
    //above is a typescript shortcut instead of stating the id and name twice!

    // this.name = n;
    // this.id = id;
  }
````


"readonly" properties (to make sure things can't change, i.e. once initialized it can't be modified!) allows you to be very explicit 

ie
````ts
constructor(private readonly id: string, public name: string) {
  }
  ````

private makes a property / method only available within the class it originates. To make it available in inherited classes as well, you can use "protected".

----

adding static methods and properties: (a utility method, accessible without instantiating the class) ie: 

````ts
class Department {
  static fiscalYear = 2020;
  protected employees: string[] = [];

  constructor(private readonly id: string, public name: string) {
  }

  static createEmployee(name: string) {
    return {name: name};
  }
}
const employee1 = Department.createEmployee("Joe");
console.log(employee1);
console.log(Department.fiscalYear);
````



====

If you want every inheritaned class to have a method, but not the same one. You can make an empty one in your base class, and force all inherited classes to add an override method with the same name (i.e. one that overrides the blank class):

- add "abstract" infront of method in base class
- add "abstract" infront of class definition


````ts
abstract class Department {
  static fiscalYear = 2020;
  protected employees: string[] = [];

  constructor(protected readonly id: string, public name: string) {
  }

  static createEmployee(name: string) {
    return {name: name};
  }

  // describe(this: Department) {
  //   console.log(`Department ${this.id}: ${this.name}`)
  // }

  //instead of the above, you need whats below. Void is the return type: 

  abstract describe(this: Department): void;

}
````


====

singletons & private constructors:

singleton pattern is about ensuring you only have one instance of a certain class. Can be useful when you can't use static methods or properties, or you don't want to or you always just want one object based on a class.

i.e. if you have more than one ITDepartment, thats fine as is, but if you only have one AccountingDepartment, and you want to make it a singleton ... 

if you make the constructor private, you can't call new on it.

````ts
class AccountingDepartment extends Department {
  private lastReport: string;
  //used to check if an instance exists: 
  private static instance: AccountingDepartment;

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error("No report found");
  }

  set mostRecentReport(value: string) {
    if(!value) {
      throw new Error('Please pass in a valid value');
    }
  }

//made private to avoid ability to instantiate outside of static method:
  private constructor(id: string, private reports: string[]) {
    super(id, "IT");
    this.lastReport = reports[0];
  }

//static method will only work once, since the instance will be filled otherwise. The way to create a new instance on a singleton class
  static getInstance() {
    if(AccountingDepartment.instance) {
      return this.instance;
    } 
    this.instance = new AccountingDepartment("d2", []);
    return this.instance;
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  printReports() {
    console.log(this.reports);
  }

  describe() {
    console.log('Accounting department id:' + this.id)
  }

  addEmployee(name: string) {
    if(name === 'Max') {
      return;
    }

    this.employees.push(name);
  }
}


const accounting = AccountingDepartment.getInstance();
````

