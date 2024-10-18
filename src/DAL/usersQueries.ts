import { usersCollection } from "../config";
import { User } from "../types/user";

export const getUserById = async (idNumber:string)=> await usersCollection.findOne({idNumber})

export const addUser= async (userToAdd:User)=>await usersCollection.insertOne(userToAdd)

export const getUsers = ()=>usersCollection.find({}).toArray()

export const updateUser = async (userToUpdate:User)=>await usersCollection.updateOne({
    idNumber: { $eq: userToUpdate.idNumber }
}, userToUpdate)

export const searchUsers = (firstName:string, lastName:string)=>usersCollection.find({
    firstName,
    lastName,
}).toArray()

export const deleteUser = async (idNumber:string)=>await usersCollection.deleteOne({
    idNumber
})