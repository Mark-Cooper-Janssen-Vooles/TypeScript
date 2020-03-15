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

// overloads: specify what the return is!
function adder(a: string, b: string): string;
function adder(a: number, b: number): number;
// type guards:
function adder(a: Combinable, b: Combinable) {
  // this is called a "type guard":
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

const result = adder("Mark"," Hmm") as string;
// allows result to be split when using the overloads above:
result.split(' ');


//optional chaining:
const fetchedUserData = {
  id: "u1",
  name: "Max",
  job: { 
    title: 'ceo', 
    description: 'my own company'
  }
};

//optional chaining: when you don't know if some nested data is set or undefined, i.e. if job isn't set: 

console.log(fetchedUserData?.job?.title);
//the above still errors, because ts knows for certain that job doesn't exist. but from an api call, it won't know and this is what you'd do. 

// nullish coalescing:
const userInput = '';
const storedData = userInput || "DEFAULT";
// if stored data is JUST null or undefined (but not an empty string or other falsy value):
const storedData1 = userInput ?? "DEFAULT";
//the '??' is the nullish coalescing thing
console.log(storedData);
console.log(storedData1);

// type UnknownEmployee = Employee | Admin;

// function printEmployeeInfo(emp: UnknownEmployee) {
//   console.log("Name: " + emp.name);
//   // typeof won't work here ...
//   // using the 'in' keyword: does 'privileges' exist as a property in emp?
//   if ("privileges" in emp) {
//     console.log("Privileges " + emp.privileges);
//   }
//   if ('startDate' in emp) {
//     console.log("start date " + emp.startDate);
//   }
// };

// printEmployeeInfo(e1);
// printEmployeeInfo({name: "Moo", startDate: new Date()});

// // another type guard: 'instance of':

// class Car {
//   drive() {
//     console.log("Driving ... ");
//   }
// }

// class Truck {
//   drive() {
//     console.log("driving a truck...");
//   }

//   loadCargo(amount: number) {
//     console.log("Loading cargo..." + amount);
//   }
// }

// type Vehicle = Car | Truck;

// const v1 = new Car();
// const v2 = new Truck();

// function useVehicle(vehicle: Vehicle) {
//   vehicle.drive();

//   //can still use 'in' keyword: 
//   // if ('loadCargo' in vehicle) { 

//   //or a neater way: 
//   if (vehicle instanceof Truck) {
//     vehicle.loadCargo(1000);
//   }
// }

// useVehicle(v1);
// useVehicle(v2);

// //=============== descriminated unions

// // a discriminated union has one common property in every object that makes up the union, which descrives that union (i.e. here it is the type!)

// interface Bird {
//   type: 'bird';
//   flyingSpeed: number;
// }

// interface Horse {
//   type: 'horse';
//   runningSpeed: number;
// }

// type Animal = Bird | Horse;

// function moveAnimal(animal: Animal) {
//   let speed;
//   switch (animal.type) {
//     case 'bird':
//       speed = animal.flyingSpeed;
//       break;
//     case 'horse':
//       speed = animal.runningSpeed;
//       break;
//   }
//   console.log("Moving with speed: " + speed);
// }

// moveAnimal({type: 'bird', flyingSpeed: 10});

// // ======


// // const userInputElement = document.getElementById('user-input')!;
// // const userInputElement = <HTMLInputElement>document.getElementById('user-input')!;

// //the as keyword is used instead of angled brackets to not clash with react (either of them work!)
// const userInputElement = document.getElementById('user-input')! as HTMLInputElement;

// // using <HTMLInputElement>, typescript knows whatever is after, i.e. .value, it checks if that exists on the html input element type and allows it!

// userInputElement.value = "Hi there!";

// // alternative syntax with a type guard: 

// const userInputElement2 = document.getElementById('user-input');

// if (userInputElement2) {
//   (userInputElement2 as HTMLInputElement).value = "Hi there again!";
// }


// // index properties: 

// interface ErrorContainer {
//   // { email: "Not a valid email", username: "Must start with a character"}

//   //index type means we need properties of only string:
//   [prop: string]: string;
// }

// const errorBag: ErrorContainer = {
//   email: "Not a valid email",
//   username: "Must start with a capital character"
// }

// //======

