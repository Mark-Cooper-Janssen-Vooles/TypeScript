abstract class Department {
  // private id: string;
  // private name: string;
  static fiscalYear = 2020;
  protected employees: string[] = [];

  constructor(protected readonly id: string, public name: string) {
    //above is a typescript shortcut instead of stating the id and name twice!

    // this.name = n;
    // this.id = id;
  }

  static createEmployee(name: string) {
    return {name: name};
  }

  // describe(this: Department) {
  //   console.log(`Department ${this.id}: ${this.name}`)
  // }

  abstract describe(this: Department): void;

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInfo() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

class ITDepartment extends Department {
  admins: string[];
  constructor(id: string, admins: string[]) {
    super(id, "IT");
    //have to call super before using 'this' keyword.
    this.admins = admins;
  }

  describe() {
    console.log("IT Department - ID: " + this.id);
  }
}

class AccountingDepartment extends Department {
  private lastReport: string;
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

  private constructor(id: string, private reports: string[]) {
    super(id, "IT");
    this.lastReport = reports[0];
  }

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

const coles = new ITDepartment("d1", ['Max', 'Josie']);
coles.describe();
console.log(coles);



coles.addEmployee("Not Mark");
coles.addEmployee("Manure");
// coles.employees[2] = "Anna";
coles.printEmployeeInfo();
// const colesCopy = { name: "hmm", describe: coles.describe };

// colesCopy.describe();


// const accounting = new AccountingDepartment("d2", []);
const accounting = AccountingDepartment.getInstance();

console.log("===============")

accounting.mostRecentReport = "hmm";
accounting.addReport("somehting went wrong...")
console.log(accounting.mostRecentReport);
accounting.printReports();
accounting.addEmployee("Max");
accounting.addEmployee("Mark");
accounting.printEmployeeInfo();

accounting.describe();

// const employee1 = Department.createEmployee("Joe");
// console.log(employee1);
// console.log(Department.fiscalYear);