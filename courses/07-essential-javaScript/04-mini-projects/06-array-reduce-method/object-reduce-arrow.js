import { studentsArr } from './studentsArr.js'

// Using an arrow function 
const calculateClassAverage = (studentsArr) => {
    const totalGrades = studentsArr.reduce((total, currentStudent) =>
        total + currentStudent.grade, 0)
    return totalGrades / studentsArr.length
}

// Using a annanmous function
// 
// function calculateClassAverage(studentsArr) {
//     const totalGrades = studentsArr.reduce(function(total, currentStudent){
//         return total + currentStudent.grade
//     }, 0)
//     return totalGrades / studentsArr.length
// }

console.log(calculateClassAverage(studentsArr))