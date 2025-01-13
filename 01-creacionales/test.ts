const people = [
  { name: "Juan", age: 25 },
  { name: "Maria", age: 30 },
  { name: "Pedro", age: 25 },
  { name: "Ana", age: 30 },
  { name: "Daniel", age: 25 },
];


interface ArrayStructure {
    [key: number]: { name: string; age: number }[] 
}
const withReduce = people.reduce(
  (acc: ArrayStructure, person) => {
    const age = person.age;
    if (!acc[age]) acc[age] = [];
    acc[age].push(person);
    return acc;
  },
  {}
);

console.log({withReduce});
// {
//     withReduce: {
//       "25": [
//         { name: "Juan", age: 25 },
//         { name: "Pedro", age: 25 },
//         { name: "Daniel", age: 25 }
//       ],
//       "30": [ { name: "Maria", age: 30 }, { name: "Ana", age: 30 } ]
//     }
// }
const withGroupBy = Object.groupBy(people, (person) => person.age)
console.log({withGroupBy})
