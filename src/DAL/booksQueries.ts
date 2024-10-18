import { ObjectId } from "mongodb";
import { booksCollection } from "../config";
import { Book } from "../types/book";

export const addBook= async (bookToAdd:Book)=>await booksCollection.insertOne(bookToAdd)

export const getBooks = ()=>booksCollection.find({}).toArray()

export const getBookById = (id:ObjectId)=>booksCollection.findOne({_id: { $eq: id }})

export const updateBook = async (bookToUpdate:Book)=>await booksCollection.updateOne({
    author: { $eq: bookToUpdate.author },
    topic: { $eq: bookToUpdate.topic },
    year: { $eq: bookToUpdate.year }
}, bookToUpdate)

export const searchBooks = (author:string, topic:string, year:number)=>booksCollection.find({
    author,
    topic,
    year
}).toArray()

export const deleteBook = async (bookToDelete:Book)=>await booksCollection.deleteOne({
    author: { $eq: bookToDelete.author },
    topic: { $eq: bookToDelete.topic },
    year: { $eq: bookToDelete.year }
})