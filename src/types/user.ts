import { LoanedBook } from "./book";

export interface User {
    idNumber:string,
    firstName:string,
    lastName:string,
    type:UserType,// chagne to enum customer Or employees
    loanedBooks:[LoanedBook]
}

export enum UserType{
    Customer,
    Employee
}