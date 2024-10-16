import {Mutex, Semaphore, withTimeout} from 'async-mutex';
import { isTheSameBook } from './utils';
import { PopularityToLoanPeriod } from './const';
const loanMutex = new Mutex()
const returnMutex = new Mutex()


const loanBook= (user:User, bookToLoan:Book)=>{
    loanMutex.runExclusive(async()=>{

        if (user.loanedBooks.length>=5) {
            return "error, to much books already loaned"
        }
        user.loanedBooks.push({...bookToLoan,dateOfLoan:new Date()})
    })
}

const loanBooks= (user:User, booksToLoan:[Book])=>{
    booksToLoan.map(bTL=>loanBook(user,bTL))
}

const returnBook= (user:User, bookToReturn:Book)=>{
    returnMutex.runExclusive(async()=>{
        const loanedBook = user.loanedBooks.find(lB=>isTheSameBook(lB,bookToReturn))
        if (!loanedBook) {
            return "error"
        }
        if (isDueDatePast(loanedBook.popularity, loanedBook.dateOfLoan)){
            console.log("warning, the book is return after due date")
        }
        if (user.loanedBooks.length>=5) {
            return "error, to much books already loaned"
        }
        user.loanedBooks.push({...bookToReturn,dateOfLoan:new Date()})
    })
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