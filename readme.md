finish the react and node part, then summarise notes for a gist!!

## TypeScript

***TS cheatsheet***

in terminal run: "tsc <filename>.ts" to compile, or "tsc <filename>.ts -w" to watch, aka reload whenever it changes

to watch the whole project, "tsc --init" (creates tsconfig.json file), can now run "tsc" and it will compile all files in the project. Or "tsc -w" and it will watch them too.

Note: when you use TS with create-react-app, you don't need to do this. Its already all configured for you. 

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

---


What is an interface?
An interface describes the structure of an object 

````ts
//just has the structure (properties, methods and types), not the concrete values:
interface Person {
  name: string;
  age: number;

  greet(phrase: string): void;
}

let user1: Person;

user1 = {
  name: "Max",
  age: 28,
  greet(phrase: string) {
    console.log(`${phrase} ${this.name}`);
  }
}

user1.greet("Hi there - I am");
````

An interface and a custom type are not exactly the same: often you can use "interface" or "type" interchangably, interfaces can only be used to describe the structure of an object. But type can store union types etc.. its more flexible. Interface is clearer! (more strongly typed)


Interfaces force existance of methods, forces shared functionality among classes etc. Forces a certain structure! Important if other parts of code rely on that structure, makes the code more unbreakable. 

In an interface you can also add the readonly modifier. You can't add public or private though. 

Even though readonly is specified only in the interface, it still makes Person's name readonly: 

````ts
interface Greetable {
  readonly name: string;
  greet(phrase: string): void;
}

class Person implements Greetable {
  name: string;
  age: number = 30;
  constructor(n: string) {
    this.name = n;
  }

  greet(phrase: string) {
    console.log(`${phrase} ${this.name}`);
  }
}

let user1: Greetable;

user1 = new Person('Max');

user1.greet("Hi there - I am");

console.log(user1);
````

can also extend interfaces: 

````ts
interface Named {
  readonly name: string;
}

interface Greetable extends Named {
  greet(phrase: string): void;
}
````

why would we split interfaces? Maybe on some objects, you want them to only have a name, but on others you need both. 

Can also inherit from multiple interfaces (on classes this was impossibru), i.e. : 
````ts
interface Greetable extends Named, AnotherInterface {

}
````


interfaces as function types: 

````ts
// type AddFn = (a: number, b: number) => number;

//same as the above:
interface AddFn {
  (n1: number, n2: number): number;
}

let add: AddFn;

add = (n1: number, n2: number) => {
  return n1 + n2;
}
````

optional parameters and properties in interfaces: 
(outputName and myMethod are optional here)

````ts
interface Named {
  readonly name: string;
  outputName?: string;
  myMethod?() { console.log("hi") }
}
````

optional in classes: 
````ts
interface Named {
  readonly name?: string;
  outputName?: string;
}

interface Greetable extends Named {
  greet(phrase: string): void;
}

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

````

Intersection types: 

````ts
// intersection types
type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: "Mark",
  privileges: ["create-server"],
  startDate: new Date()
};

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;
````

===

Type guarding in TS: 

````ts
// type guards:
function adder(a: Combinable, b: Combinable) {
  // this is called a "type guard":
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

type UnknownEmployee = Employee | Admin;

function printEmployeeInfo(emp: UnknownEmployee) {
  console.log("Name: " + emp.name);
  // typeof won't work here ...
  // using the 'in' keyword: does 'privileges' exist as a property in emp?
  if ("privileges" in emp) {
    console.log("Privileges " + emp.privileges);
  }
  if ('startDate' in emp) {
    console.log("start date " + emp.startDate);
  }
};

printEmployeeInfo(e1);
printEmployeeInfo({name: "Moo", startDate: new Date()});

// another type guard: 'instance of':

class Car {
  drive() {
    console.log("Driving ... ");
  }
}

class Truck {
  drive() {
    console.log("driving a truck...");
  }

  loadCargo(amount: number) {
    console.log("Loading cargo..." + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();

  //can still use 'in' keyword: 
  // if ('loadCargo' in vehicle) { 

  //or a neater way: 
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(1000);
  }
}

useVehicle(v1);
useVehicle(v2);
````

===

Descriminated Unions: 

````ts

// a discriminated union has one common property in every object that makes up the union, which descrives that union (i.e. here it is the type!)

interface Bird {
  type: 'bird';
  flyingSpeed: number;
}

interface Horse {
  type: 'horse';
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case 'bird':
      speed = animal.flyingSpeed;
      break;
    case 'horse':
      speed = animal.runningSpeed;
      break;
  }
  console.log("Moving with speed: " + speed);
}

moveAnimal({type: 'bird', flyingSpeed: 10});
````

===

type casting: 

````ts

// const userInputElement = document.getElementById('user-input')!;
// const userInputElement = <HTMLInputElement>document.getElementById('user-input')!;

//the as keyword is used instead of angled brackets to not clash with react (either of them work!)
const userInputElement = document.getElementById('user-input')! as HTMLInputElement;

// using <HTMLInputElement>, typescript knows whatever is after, i.e. .value, it checks if that exists on the html input element type and allows it!

userInputElement.value = "Hi there!";

// alternative syntax with a type guard: 

const userInputElement2 = document.getElementById('user-input');

if (userInputElement2) {
  (userInputElement2 as HTMLInputElement).value = "Hi there again!";
}
````

===

index properties: 

````ts
interface ErrorContainer {
  // { email: "Not a valid email", username: "Must start with a character"}

  //index type means we need properties of only string:
  [prop: string]: string;
}

const errorBag: ErrorContainer = {
  email: "Not a valid email",
  username: "Must start with a capital character"
}
````

===

function overloads:

````ts
// overloads: specify what the return is!
function adder(a: string, b: string): string;
function adder(a: number, b: number): number;
function adder(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

const result = adder("Mark"," Hmm") as string;
// allows result to be split when using the overloads above:
result.split(' ');
````

===

Optional chaining: 

````ts
//optional chaining:
const fetchedUserData = {
  id: "u1",
  name: "Max",
  // job: { 
  //   title: 'ceo', 
  //   description: 'my own company'
  // }
};

//optional chaining: when you don't know if some nested data is set or undefined, i.e. if job isn't set: 

console.log(fetchedUserData?.job?.title);
//the above still errors, because ts knows for certain that job doesn't exist. but from an api call, it won't know and this is what you'd do. 
````

===

nullish coalescing: 

````ts
// nullish coalescing:
const userInput = '';
const storedData = userInput || "DEFAULT";
// if stored data is JUST null or undefined (but not an empty string or other falsy value):
const storedData1 = userInput ?? "DEFAULT";
//the '??' is the nullish coalescing thing
console.log(storedData);
console.log(storedData1);
````

====

# Generics

generic types are the ones in the <> like "Array<string>".

generic types give better type safety: allows you to avoid errors!

````ts
// can do this: const names: string[] = ["hmm", "ok"]
// or this:
const names: Array<string> = [ "Mark", "Bob" ];

//the main type is a promise, but the generic type is string in Promise<string>
const promise: Promise<string> = new Promise((reoslve, reject) => {
  setTimeout(() => {
    reoslve('This is done!');
  }, 2000);
});

promise.then(data => {
  data.split(' ');
})
````

===

Creating a generic:

````ts
// Generics:


// can do this: const names: string[] = ["hmm", "ok"]
// or this:
const names: Array<string> = [ "Mark", "Bob" ];

//the main type is a promise, but the generic type is string in Promise<string>
const promise: Promise<string> = new Promise((reoslve) => {
  setTimeout(() => {
    reoslve('This is done!');
  }, 2000);
});

promise.then(data => {
  data.split(' ');
})
````

Generic utility types using 'Partial': 

````ts
interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(title: string, description: string, completeUntil: Date): CourseGoal {
  // a partial type ... tells typescript that this is an object which in the end will be a CourseGoal. But for now the properties are all optional, so we can set it to an empty object without errors 
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = completeUntil;
  return courseGoal as CourseGoal;
}
````

````ts
// this tells typescript names2 is an array of strngs, but also read only. so it will yell at us if we try to change it! 
const names2: Readonly<string[]> = ['Max', 'Sports'];
// names2.push("Anna") // i.e. this wont work now.
````

// generic types vs union types:
// union types lock in a type, where as generic types are more flexible


===

Decorators: 
A feature which can be very useful for meta-programming
Meta-programming => decorators are well suited for writing code that is easier to use by other developers. 

Need to change tsconfig.json file to uncomment "experimentalDecorators" 


If you add a decorator to a class, it recieves its constructor function. 

If you add a decorator to a property, it recieves the target of the property, the 2nd argument we get is the property name, i.e. string | symbol.

````ts
// decorators: 

//normal decorator function:
// function Logger(constructor: Function) {
//   console.log('Logging...');
//   console.log(constructor);
// }

//decorator factory: 
// returns a decorator function, but allows us to configure it when we assign it to something
function Logger(logString: string) {
  return function(constructor: Function) {
    console.log(logString);
    console.log(constructor);
  }
}

//decorators execute when your class is defined, not when it is instantiated
// @Logger
@Logger("Logging - PERSON")
class Person1 {
  name = "Max";

  constructor() {
    console.log('Creating person object...');
  }
}

const pers = new Person1();

console.log(pers);
````



another example of a decorator factory: 
````ts
function WithTemplate(template: string, hookId: string) {

  //not interested in constructor, so you call tell typescript with an underscore "i know i get this argument but i dont need it":
  // return function(_: Function) {

  return function(constructor: any) {
    const hookEl = document.getElementById(hookId)
    const p = new constructor(); //creates an instance of the class it is put before!
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector('h1')!.textContent = p.name
    }
  }
}

@WithTemplate('<h1>Title</h1>', 'app')
class Person1 {
  name = "Max";

  constructor() {
    console.log('Creating person object...');
  }
}

const pers = new Person1();

````


````ts
// property decorators: 

// If you add a decorator to a property, it recieves the target of the property and its prototypes, the 2nd argument we get is the property name, i.e. string | symbol.

// adding a decorator to a property:
function Log(target: any, propertyName: string | Symbol) {
  console.log("Property decorator");
  console.log(target, propertyName);
}

//adding a decorator to an accessor:
// note, PropertyDescriptor is built into typescript.
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log('Accessor decorator!');
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

//adding a decorator to a method:
//the target, if its an instance then its the prototype of the object. if its a static method 
function Log3(target: any, name: string | symbol, descriptor: PropertyDescriptor) {
  console.log('Methd decorator!');
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

//adding a decorator to a paramter: 
// name here gives back name of the method its in
//position is the number of the argument 
function Log4(target: any, name: string | symbol, position: number) {
  console.log('Parameter decorator!');
  console.log(target);
  console.log(name);
  console.log(position);
}

class Product {
  @Log //executes when you define this property to JS as part of the class.
  title: string;
  private _price: number;

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error('invalid price - should be postive');
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}
````



Ways to use class decorators: 

   //returning a new constructor function, based on original constructor. Now the decorator functionality will only fire when the class is instantiated, not when its jsut called 

   When class is instantiated, new code extends and replaces the old code. 

````ts
function WithTemplate(template: string, hookId: string) {
  console.log("template factory");
  return function<T extends {new(...args: any[]): {name: string}}>(originalConstructor: T) {

    return class extends originalConstructor {
      // use underscore to tell typescript we know we dont use args
      constructor(..._args: any[]) {
        super();

        console.log('rendering template');
        const hookEl = document.getElementById(hookId)
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector('h1')!.textContent = this.name
        }

      }
    }

  }
}
````

Other decorators where you can return something: 
- decorators used for methods (ie log3)
- decorators used for accessors (ie log2)

````ts
// returning (and changing) a class with a decoator function 

function Autobind(_target: any, _methodName: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    }
  };
  return adjDescriptor;
}

class Printer {
  message = "This works!";

  @Autobind
  showMessage() {
    console.log(this.message);
  }
}
````

===

# Writing Modular code

Splitting code into multiple files, we have:
- Namespaces
- File bundling

"namespace" code syntax code helps group code 

alternative to namespaces, the more modern alternative: using ES6 Imports/Exports
out of the box javascript stuff.

i.e. 

````ts

//make a new file: drag-drop-interfaces.ts
// drag and drop interfaces
namespace App {
  // have to chuck export in front
  export interface Draggable {
    someVar: string;
    anotherVar: boolean;
  }

  export interface DragTarget {
    hmm: number;
    ookok: string;
  }
}
````

````ts
//in the new app file, i.e. app.ts
// the below code needs 3 slashes, not a normal comment! picked up by TS!!

/// <reference path="drag-drop-interfaces.ts"/>
namespace App {
  //code goes here. needs to be called the same namespace to be picked up 
}

````

for name spaces also need to have tsconfig.js "outFile" enabled, to something like "./dist/bundle.js" which tells typescript to compile all the files down into one thing
also need to have "module" set to "amd" (its in CompilerOptions)

Note: need to import everything we use in a project into App.ts for the project to work when using namespace's! Or every file imports exactly what it needs. 

He says name spaces aren't the best way of doing it! 

===

to use es6 import / export syntax:
get rid of namespace stuff.

in file we're exporting from:
````ts
//put an export infront of the function, i.e:
  export interface Draggable {
    someVar: string;
    anotherVar: boolean;
  }
````
in file we're importing from: 
````ts
// need to add .js, not .ts! 
import { Draggable } from '../models/drg-drop.js';
````

now to use this, we need to switch tsconfig file again. in compilerOptions => 'module' should now be 'es2015'. 'target' needs to be 'es6'. 'outFile' needs to be commented out

in index.html in the script tag import, you need to say type="module", i.e.: 
````html
<script type="module" src="dist/app.js"></script>
````

can also do: 

````ts
//i.e. it used to be: 
// import { someFunc, anotherFunc } from '../util/validation.js';
import * as Validation from '../util/validation.js';

//instead of then 
//console.log(someFunc);
//need to:
console.log(Validation.someFunc); 
//works like an object! 
````

this syntax however might not work in older browsers; we may have to use a bundling tool to make it work like webpack (pretty sure its inbuilt into react!)

// skip webpack for now and move onto react


====

# React App with Typescript!!

https://create-react-app.dev/docs/adding-typescript/

npx create-react-app <my-app> --template typescript
# or
yarn create react-app <my-app> --template typescript

can edit tsconfig file to my needs.
default should be fine 

.tsx allows you to write typescript code, and also JSX code. 

components are of type React.FC, which means 'functional component', i.e. it returns JSX i.e:

````ts
const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addToTodos = (todo: string) => {
    setTodos([
      ...todos,
      {
        id: Math.random().toString(),
        text: todo
      }
    ]);
  }

  const todoDeleteHandler = (todoId: string) => {
    const newTodos = todos.filter((todo) => todo.id !== todoId)
    setTodos(newTodos);
  }

  return (
    <div className="App">
      <NewTodo addToTodos={addToTodos} />
      <TodoList items={todos} deleteTodo={todoDeleteHandler} />
    </div>
  );
}
````

When passing props down, need to give it a specific interface so it knows exactly whats going on: 

````ts
interface TodoListProps {
  items: {id: string, text: string}[];
  deleteTodo: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = (props) => {
  return (
    <ul>
      {props.items.map((todo) => {
        return (
          <li key={todo.id}>{todo.text}
            //take note of this binding trick, dayumnn (allows you to pass in arguments)
            <button onClick={props.deleteTodo.bind(null, todo.id)}>Delete</button>
          </li>
        )
        })}
    </ul>
  );
}
````

not really a TS thing, but interesting use of useRef hook:

````ts
import React, { useRef } from 'react';
import './newTodo.css';

interface NewTodoProps {
  addToTodos: (todoText: string) => void;
}

const NewTodo: React.FC<NewTodoProps> = (props) => {
  const textInputRef = useRef<HTMLInputElement>(null);

  const todoSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredText = textInputRef.current!.value;
    props.addToTodos(enteredText);
  };

  return (
    <form onSubmit={todoSubmitHandler}>
      <div className="form-control">
        <label htmlFor="todo-text">Todo Text</label>
        <input type="text" id="todo-text" ref={textInputRef} />
      </div>
      <button type="submit">ADD TODO</button>
    </form>
  )
};
````



===

## Using Redux with Typescript 

https://redux.js.org/recipes/usage-with-typescript

## Using react-router with TypeScript 

normal npm i to install react router, 
then: 
"npm install --save-dev @types/react-router-dom"
(need to do this if typescript isn't aware of its features!!, i.e. red underline)

General process for new packages: 
- Check docs to see if it has info about typescript 
- Install and see if it has support already
- If not, run "npm install --save-dev @types/<name of package>"


# Typescript with Node and Express

Cannot run "node <filename>.ts" => if you've used any typescript. Need to convert it to a js file first, and then run node on that.

to start a file: "npm init" (and hit enter a few times) + "tsc --init". 

in tsconfig:
- set target to 'es2018'
- add, under module: "moduleResolution": "node",
- uncomment / set: "outDir": "./dist",
- uncomment / set: "rootDir": "./src",

npm install --save express body-parser
npm install --save-dev nodemon
npm install --save-dev @types/node ==> (need this especially for typescript to pickup on node syntax!!)
npm install --save-dev @types/express (this should get rid of the 'any')

to get type highlighting, use this syntax: 
(hover over app and it will have type as Express)
````ts
import express from 'express';

const app = express();

app.listen(3000);
````

for a general request handler function, this takes care of TS errors: 
````ts
import { RequestHandler } from 'express';

export const createTodo: RequestHandler = (req, res, next) => {};
````