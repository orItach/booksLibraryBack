export interface Book {
    name:string,
    topic:string,
    author:string,
    year:number,
    availableToLoan:number,
    amount:number,
    popularity:number // 1 to 5
}

export interface LoanedBook extends Book {
    dateOfLoan: Date
}