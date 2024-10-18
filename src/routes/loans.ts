import express from "express"
import {StatusCodes} from 'http-status-codes'
import { userNotPermittedMessage } from "./consts"
import { getUserById } from "../DAL/usersQueries"
import { isUserEmployee } from "../BL/utils"
import { loanBook,returnBook } from "../BL/loan"
import { LibraryError, LibraryErrorToHttpError } from "../types/libraryError"
const router = express.Router()

router.post('/loanBook',async (req,res:any)=>{    
    if (!req.headers.authorization)
        return res.status(StatusCodes.UNAUTHORIZED).send(userNotPermittedMessage)    
    const user = await getUserById(req.headers.authorization)    
    if (!user || !isUserEmployee(user))
        return res.status(StatusCodes.FORBIDDEN).send(userNotPermittedMessage)
    const {success,message,type} = await loanBook(user!.idNumber,req.body)
    if (!success)
        return res.status(LibraryErrorToHttpError.get(type?? LibraryError.DbError)?? StatusCodes.INTERNAL_SERVER_ERROR).send(message)
    return res.status(StatusCodes.OK).send(message)
})

router.post('/returnBook',async (req,res:any)=>{
    if (!req.headers.authorization)
        return res.status(StatusCodes.UNAUTHORIZED).send(userNotPermittedMessage)
    const user = await getUserById(req.headers.authorization?? "")
    if (!user || !isUserEmployee(user))
        return res.status(StatusCodes.FORBIDDEN).send(userNotPermittedMessage)
    const {success,message,type} = await returnBook(user!.idNumber,req.body)
    if (!success)
        return res.status(LibraryErrorToHttpError.get(type?? LibraryError.DbError)?? StatusCodes.INTERNAL_SERVER_ERROR).send(message)
    return res.status(StatusCodes.OK).send(message)
})
export default router