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

//===

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

// =============

// this tells typescript names2 is an array of strngs, but also read only. so it will yell at us if we try to change it! 
const names2: Readonly<string[]> = ['Max', 'Sports'];
// names2.push("Anna") // i.e. this wont work now.

//=======
// generic types vs union types:
// union types lock in a type, where as generic types are more flexible