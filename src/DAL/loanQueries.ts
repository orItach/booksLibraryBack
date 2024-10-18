import { WithId } from "mongodb";
import { usersCollection,booksCollection } from "../config";
import { Book, LoanedBook } from "../types/book";
import { User } from "../types/user";

export const loanBook= async (user:WithId<User>, bookToLoan:WithId<Book>)=>{
    const updateUserResult =await usersCollection.updateOne({ _id: { $eq: user._id } }, {
        "$push": { "loanedBooks": { ...bookToLoan, dateOfLoan: new Date() } }
    })
    if (updateUserResult.modifiedCount===1)
    {
        const updateBookResult = await booksCollection.updateOne({ _id: { $eq: bookToLoan._id }},{"$set":{availableToLoan:bookToLoan.availableToLoan-1}})
        if (updateBookResult.modifiedCount === 1) 
            return true
        else{
            await usersCollection.updateOne({ _id: { $eq: user._id } }, {
                "$pull": { "loanedBooks": { ...bookToLoan, dateOfLoan: new Date() } }
            })
            return false
        }
    }
    else
        return false  
}

export const returnBook = async (user:WithId<User>, bookToReturn:LoanedBook)=>{
    const updateUserResult =await usersCollection.updateOne({ _id: { $eq: user._id } }, {
        "$pull": { "loanedBooks": { ...bookToReturn } }
    })
    if (updateUserResult.modifiedCount===1)
    {
        const updateBookResult = await booksCollection.updateOne({ author: { $eq: bookToReturn.author },
            topic: { $eq: bookToReturn.topic}
        },{"$set":{availableToLoan:bookToReturn.availableToLoan+1}})
        if (updateBookResult.modifiedCount === 1)
            return true
        else{
            await usersCollection.updateOne({ _id: { $eq: user._id } }, {
                "$push": { "loanedBooks": { ...bookToReturn } }
            })
            return false
        }
    }
    else
        return false
}