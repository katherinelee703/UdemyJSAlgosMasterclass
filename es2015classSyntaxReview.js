// ES2015 CLASS SYNTAX

/* 

Objectives:

A class is a "blueprint" for creating objects with pre-defined properties and methods
(technically JS doesn't have its own "class" like in OOP, it takes advantage of the prototype chain part of objects in JS)
("prototype based inhertance" -- see MDN for review)

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes

Why learn this?
  - to implement data structures as classes
  - then instantiate an instance of a class

The Syntax: 

  class Student {
    constructor(firstName, lastName) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.tardies = 0;
    }
  }

Note the "variable name" is capitalized at the first letter
the constructor tells you what any instance of the class is allowed to "take in" as a parameter
the this. will help assign the   inputs to a specific instance of that class once it is created

let me = new Student("Kate", "Lee");
let you = new Student("Your", "Name")

use "new" to instantiate an instance of Student
can set that "Student" to a variable, with "let"

INSTANCE METHODS:

  - helps an intance of a class utilize some specific functionality that you build into the class itself
  - see examples for fullName(), markLate(), addScore(), and calcAvg();

*/

class Student {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.tardies = 0;
    this.scores = [];
  }
  fullName() {
    return `This student's full name is $this.firstName} ${this.lastName}.`;
  }
  markLate() {
    this.tardies += 1;
    if (this.tardies >= 3) {
      return `YOU ARE EXPELLED!`;
    }
    return `This student (${this.firstName}) has been late ${this.tardies} time(s).`;
  }
  addScore(score) {
    this.scores.push(score);
    return this.scores;
  }
  calcAvg() {
    let sum = this.scores.reduce(function (a, b) {
      return a + b;
    });
    return sum / this.scores.length;
  }
  static enrollStudents() {
    return 'ENROLLED';
  }
}
let me = new Student('Kate', 'Lee');
me.markLate();
me.addScore(98);
me.addScore(100);
me.calcAvg();

/* 

CLASS METHODS:

uses static keyword - see example of static enrollStudents()
it acts more like an overall utility function, as it cannot be called on an instance, but can be called with the class

you cannot do:
me.enrollStudents();

but you CAN do:
Student.enrollStudents();

*/

// me.enrollStudents(); // gets "TypeError: me.enrollStudents is not a function"

Student.enrollStudents(); // should return "ENROLLED";

// the above wasn't a great example of why a class method is helpful vs an instance method.
// see this from MDN example

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  static distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.hypot(dx, dy);
  }
}

let p1 = new Point(5, 5);
let p2 = new Point(10, 10);

Point.distance(p1, p2); // expect 7.071067....

// The CLASS method is useful when you need to do things to multiple instances of a certain class, but cannot throw them into a specific instance without making the code clunky

// Imagine if distance was an instance method. You would have to be able to throw p2 into p1 like this: p1.distance(p2);
// That doesn't seem so bad, but if you have to do this many many times, or with many pieces at once, that is why CLASS method is better.

// All of this class syntax stuff is really more about making code more organized and easier to understand.
// that doesn't mean you can't do things differently, but this is just more organized and makes sense to other developers who might need to use your code.

// For data structures questions we will be using the constructor, and intance methods.
// We will ALMOST NEVER use static class methods.

// As for THIS, in ES2015 class syntax, the this refers to the instance (object) we make using the class. the this is not referring to the class itself. only the instance. be clear on this.
