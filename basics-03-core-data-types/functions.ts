function add(n1: number, n2: number): number {
  return n1+n2;
}

function printResult(num: number): void {
  console.log("result: " + num);
}

function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
  const result = n1 + n2;
  cb(result);
}

printResult(add(2, 5));

//this say: combineValues is of type function which takes two arguments, both numbers, and returns a number (any function that does that)
let combineValues: (a: number, b: number) => number;

combineValues = add;

console.log(combineValues(8,8));

addAndHandle(10, 20, (result) => {
  console.log(result);
})