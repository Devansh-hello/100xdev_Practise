// Write a function sum that finds the sum of two numbers. 

const Assignment1 = () => {
    var Number1 = 51;
    var Number2 = 53;

    console.log(`Result: ${Number1 + Number2}`)
}

// Write a function called canVote that returns true or false if the age of a user is > 18

const Assignment2 = () => {
    var age = 12;

    function canVote(age){
        if(age >= 18){
            console.log ("Yes You can vote")
        }else{
            console.log("Nahh Mate not old enough")
        }
    }

    canVote(age);
}

// // Write an if/else statement that checks if a number is even or odd. If it's even, print "The number is even." Otherwise, print "The number is odd."

const Assignment3 = () => {
    var Number = 2;

    function everOdd(Number){
        if(Number%2 == 0){
            console.log ("Even Number")
        }else{
            console.log("Odd Number")
        }
    }

    everOdd(Number);
}

// Write a function called sum that finds the sum from 1 to a number
const Assignment4 = () => {
    var Num = 6;

    function findSum(n){
        var sum = 0;
        for (let i=0; i <= n; i++ ){
            sum += i
        }
        console.log(sum)
    }

    findSum(Num);
}
Assignment4()