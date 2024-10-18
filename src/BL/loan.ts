import {Mutex } from 'async-mutex';
import { isTheSameBook } from './utils';
import { PopularityToLoanPeriod } from './const';
import * as usersQueries from "../DAL/usersQueries"
import * as booksQueries from "../DAL/booksQueries"
import * as loanQueries from "../DAL/loanQueries";
import { Book } from '../types/book';
import { LibraryError } from '../types/libraryError';
import { LibraryResult } from '../types/libraryResult';

const loanMutex = new Mutex()

export const loanBooks= (userId:string, booksToLoan:[Book])=>
    booksToLoan.map(bTL=>loanBook(userId,bTL))

export const loanBook= async (userId:string, bookToLoan:Book):Promise<LibraryResult>=>{
    const currentUser = await usersQueries.getUserById(userId)
    if (!currentUser)
        return {success:false, message: "Couldn't find user"}   
    if (currentUser.loanedBooks.length>=5) 
        return {success:false, message: "error, to much books already loaned"} 
    return loanMutex.runExclusive(async()=>{
        const currentBooks =await booksQueries.searchBooks(bookToLoan.author,bookToLoan.topic,bookToLoan.year)
        if (currentBooks.length>1) 
            return {success:false, message: "found multiple suitable books"} 
        if (currentBooks.length===0) 
            return {success:false, message: "didn't find book to loan"} 
        if (currentBooks[0].availableToLoan===0) 
            return {success:false, message: "there isn't available books to loan"}        
        if (await loanQueries.loanBook(currentUser,currentBooks[0])) 
            return {success:true, message: "successfully loan a book"}
        else
            return {success:false, message: "Failed to loan book",type:LibraryError.DbError }
    })
}


export const returnBooks = async (userId:string, booksToReturn:[Book])=>
    booksToReturn.map(bookToReturn=>returnBook(userId,bookToReturn))


export const returnBook= async (userId:string, bookToReturn:Book)=>{
    const currentUser = await usersQueries.getUserById(userId)
    if (!currentUser) 
        return {success:false, message: "Couldn't find user"}
    
    const loanedBook = currentUser.loanedBooks.find(loanedBook=>isTheSameBook(loanedBook,bookToReturn))
    if (!loanedBook) 
        return {success:false, message: "Couldn't find book in loaned books"}
    
    if (isDueDatePast(loanedBook.popularity, loanedBook.dateOfLoan))
        console.log("warning, the book is return after due date")
    if ( await loanQueries.returnBook(currentUser,loanedBook)) 
        return {success:true, message: "successfully return a book"}
    else
        return {success:false, message: "Failed to loan book",type:LibraryError.DbError }
}

const isDueDatePast= (popularity:number, dateOfLoan:Date)=>{
    if (popularity<=3 && popularity >=1 && new Date()>new Date(dateOfLoan.getDate()+PopularityToLoanPeriod.Low)) 
        return true
    if (popularity===4 && new Date()>new Date(dateOfLoan.getDate()+PopularityToLoanPeriod.Medium)) 
        return true
    if (popularity===5 && new Date()>new Date(dateOfLoan.getDate()+PopularityToLoanPeriod.High)) 
        return true
    return false
}