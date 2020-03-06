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


// never is another type that functions can return: 
// it means that it never returns a type. Also can just leave as void lol
function generateError(message: string, code: number): never {
  throw {message: message, errorCode: code};
}

generateError("An error occurred!", 500);