import { MongoClientOptions } from "mongodb"
import { config } from "dotenv";
import {connectToDB} from './DAL'
import { User } from "./types/user";
import { Book } from "./types/book";

config()

const {library_host} = process.env

export const mongoClientOption: MongoClientOptions ={
    authSource: 'admin',
    maxPoolSize:50,
    
}

export const mongoUri =`mongodb://${library_host}`

export const libraryDbName= 'library'

const usersCollectionName = 'users'
const booksCollectionName = 'books'

export const DbConnection = connectToDB()

export const usersCollection = DbConnection.collection<User>(usersCollectionName)
export const booksCollection = DbConnection.collection<Book>(booksCollectionName)

// const bookSchema = {
//     $jsonSchema: {
//       bsonType: "object",
//       required: ["name", "author", "topic", "year","availableToLoan","amount","popularity"],
//       properties: {
//         name: {
//           bsonType: "string",
//           description: "the book name must be a string and is required"
//         },
//         author: {
//           bsonType: "string",
//           description: "must be a string and is required"
//         },
//         topic: {
//             bsonType: "string",
//             description: "must be a string and is required"
//           },
//         year: {
//           bsonType: "int",
//           minimum: 0,
//           description: "must be a positive integer and is required"
//         },
//         availableToLoan: {
//             bsonType: "int",
//             minimum: 0,
//             description: "must be a positive integer and is required"
//         },
//         amount: {
//             bsonType: "int",
//             minimum: 0,
//             description: "must be a positive integer and is required"
//         },
//         popularity: {
//             bsonType: "int",
//             minimum: 1,
//             description: "must be a positive integer and is required"
//         },
//       }
//     }
//   };

booksCollection.createIndex({
    "author": 1,
    "topic":1,
    "year":1
})
usersCollection.createIndex({"idNumber":1})
