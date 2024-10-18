import express from "express"
import {StatusCodes} from 'http-status-codes'
import { addUser, deleteUser, getUsers, searchUsers, updateUser } from "../BL/users"
import { LibraryError, LibraryErrorToHttpError } from "../types/libraryError"
const router = express.Router()


router.get('/all',(req,res)=>{
    res.status(StatusCodes.OK).send(getUsers())
})

router.post('/addUser',async (req,res:any )=>{
    const {success,message,type} = await addUser(req.body)
    if (!success) 
        return res.status(LibraryErrorToHttpError.get(type?? LibraryError.DbError)?? StatusCodes.INTERNAL_SERVER_ERROR).send(message)
    return res.status(StatusCodes.OK).send(message)
})

router.put('/updateUser',async (req,res:any)=>{
    const {success,message,type} = await updateUser(req.body)
    if (!success)
        return res.status(LibraryErrorToHttpError.get(type?? LibraryError.DbError)?? StatusCodes.INTERNAL_SERVER_ERROR).send(message)
    return res.status(StatusCodes.OK).send(message)
})


router.get('/searchBooks/:firstName/:lastName',async (req,res:any)=>{
    const {firstName,lastName} = req.params
    if (!firstName || !lastName )
        return res.status(StatusCodes.BAD_REQUEST).send("the search request doesn't include all requested filed")
    return res.status(StatusCodes.OK).send(await searchUsers(firstName,lastName))
})

router.delete('/deleteUser',async (req,res:any)=>{
    const {success,message,type} = await deleteUser(req.body)
    if (!success)
        return res.status(LibraryErrorToHttpError.get(type?? LibraryError.DbError)?? StatusCodes.INTERNAL_SERVER_ERROR).send(message)
    return res.status(StatusCodes.OK).send(message)
})


export default router