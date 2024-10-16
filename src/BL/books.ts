import * as booksQueries from "../DAL/booksQueries"

export const addBook = (bookToAdd:Book)=>{
    booksQueries.addBook(bookToAdd)
}

export const getBooks = ()=>{
    return booksQueries.getBooks()
}

export const updateBook = (bookToUpdate:Book)=>{
    booksQueries.updateBook(bookToUpdate)
}

export const searchBooks = (author:string, topic:string, year:number)=>{
    return booksQueries.searchBooks(author, topic, year)
}