// decorators: 

function Logger(logString: string) {
  return function(constructor: Function) {
    console.log("logger factory");
    console.log(logString);
    console.log(constructor);
  }
}

function WithTemplate(template: string, hookId: string) {
  console.log("template factory");
  return function<T extends {new(...args: any[]): {name: string}}>(originalConstructor: T) {

    //returning a new constructor function, based on original constructor. Now the decorator functionality will only fire when the class is instantiated, not when its jsut called 
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

@Logger('logging')
@WithTemplate('<h1>Title</h1>', 'app')
class Person1 {
  name = "Max";

  constructor() {
    console.log('Creating person object...');
  }
}

// const pers = new Person1();
// const pers2 = new Person1();


// ========

// property decorators: 
function Log(target: any, propertyName: string | Symbol) {
  console.log("Property decorator");
  console.log(target, propertyName);
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log('Accessor decorator!');
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log3(target: any, name: string | symbol, descriptor: PropertyDescriptor) {
  console.log('Methd decorator!');
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log4(target: any, name: string | symbol, position: number) {
  console.log('Parameter decorator!');
  console.log(target);
  console.log(name);
  console.log(position);
}

class Product {
  @Log
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

const p1 = new Product('Book', 19);
const p2 = new Product('Book2', 29);

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

const p = new Printer();

const button = document.querySelector('button')!;
button.addEventListener('click', p.showMessage)


// ----

// using decorators as validation

interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[] 
    // ['required', ['positive'] 
  }
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ['required']
  }
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ['positive']
  }
}

function validate(obj: any): boolean {
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if (!objValidatorConfig) {
    return true;
  }
  let isValid = true;
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case 'required':
          isValid = isValid && !!obj[prop];
          break;
        case 'positive':
          isValid = isValid && obj[prop] > 0;
          break;
      }
    } 
  }
  return isValid;
}

class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', event => {
  event.preventDefault();
  const titleEl = document.getElementById('title') as HTMLInputElement;
  const priceEl = document.getElementById('price') as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  const createdCourse = new Course(title, price);
  if (!validate(createdCourse)) {
    alert('Invalid input, please try again!');
    return;
  }
  console.log(createdCourse);
})