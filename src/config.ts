import { MongoClientOptions } from "mongodb"
import { config } from "dotenv";
// import {connectToCollection, connectToDB} from './DAL'
config()

// const {libarary_username, libarary_username,libarary_host} = process.env

// export const mongoClientOption: MongoClientOptions ={
//     authSource: 'admin',
//     maxPoolSize:50,
//     auth: {
//         username:libarary_username,
//         password: libarary_username
//     }
// }

// export const mongoUri =`mongodb://${libarary_host}`

// export const libararyDbName= 'libarary'

// const usersCollectionName = 'users'
// const booksCollectionName = 'books'

// export const {DBConnection, mongoClient} = connectToDB()
