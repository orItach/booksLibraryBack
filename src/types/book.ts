interface Book {
    name:string,
    topic:string,
    author:string,
    year:number,// maybe change to number
    availableToLoan:number,
    amount:number,
    popularity:number // 1 to 5
}

interface LoanedBook extends Book {
    dateOfLoan: Date
}