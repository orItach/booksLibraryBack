import * as usersQueries from "../DAL/usersQueries"
import { LibraryError } from "../types/libraryError"
import { User } from "../types/user"

export const getUserById = async (id:string)=> await usersQueries.getUserById(id)

export const addUser= async (userToAdd:User)=>{
    const insertResult = await usersQueries.addUser(userToAdd)
    if (insertResult.insertedId)
        return {success: true,message:"Successfully add user to DB"}
    return {success: false,message:"Failed to add book to DB", type:LibraryError.DbError}
}

export const getUsers = ()=>usersQueries.getUsers

export const updateUser = async (userToUpdate:User)=>{
    const updateResult = await usersQueries.updateUser(userToUpdate)
    if (updateResult.modifiedCount>0) 
        return {success: true,message:"Successfully update user"}
    return {success: false,message:"Failed to update user",type:LibraryError.DbError}
}

export const searchUsers = (firstName:string, lastName:string)=>usersQueries.searchUsers(firstName,lastName)

export const deleteUser = async (userToDelete:User)=>{
    if (userToDelete.loanedBooks.length>0)
        return {success: false,message:"Can't delete user, there is books loaned by users",type:LibraryError.badRequest}
    const deleteResult = await usersQueries.deleteUser(userToDelete)
    if (deleteResult.deletedCount>0)
        return {success: true,message:"Successfully add book to DB "}
    return {success: false,message:"Failed to add book to DB",type:LibraryError.DbError}
}