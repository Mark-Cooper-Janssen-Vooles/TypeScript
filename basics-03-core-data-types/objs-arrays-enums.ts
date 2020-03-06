// const ADMIN = 0;

enum Role { ADMIN, READ_ONLY, AUTHOR };

const person = {
  name: "Mark",
  age: 28,
  hobbies: ["sports", "cooking"],
  role: Role.READ_ONLY
};

let favoriteActivities: any[];
favoriteActivities = ['sports', 1]


console.log(person.name);

for (const hobby of person.hobbies) {
  console.log(hobby.toString());
}

if (person.role === Role.ADMIN) {
  console.log("is admin")
} else if (person.role === Role.READ_ONLY) {
  console.log("is read only")
}

