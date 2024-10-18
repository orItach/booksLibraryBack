import express,{Router} from "express"

import {StatusCodes} from 'http-status-codes'
const router:Router = express.Router()
import {getBooks, addBook,updateBook,searchBooks, deleteBook} from "../BL/books"
import { getUserById } from "../BL/users"
import { isUserEmployee } from "../BL/utils"
import { userNotPermittedMessage } from "./consts"
import { LibraryError, LibraryErrorToHttpError } from "../types/libraryError"

router.get('/all',(req,res)=>{
    res.status(StatusCodes.OK).send(getBooks())
})

router.post('/addBook', async (req: any, res: any)=>{
    if (!req.headers.authorization)
        return res.status(StatusCodes.UNAUTHORIZED).send(userNotPermittedMessage)    
    const user = await getUserById(req.headers.authorization?? "")
    if (!user || !isUserEmployee(user))
        return res.status(StatusCodes.FORBIDDEN).send(userNotPermittedMessage)
    const {success,message,type} = await addBook(req.body)
    if (!success) 
        return res.status(LibraryErrorToHttpError.get(type?? LibraryError.DbError)?? StatusCodes.INTERNAL_SERVER_ERROR).send(message)
    return res.status(StatusCodes.OK).send(message)
})

router.put('/updateBook',async (req,res:any)=>{
    if (!req.headers.authorization) 
        return res.status(StatusCodes.UNAUTHORIZED).send(userNotPermittedMessage)
    const user = await getUserById(req.headers.authorization?? "")
    if (!user || !isUserEmployee(user))
        return res.status(StatusCodes.FORBIDDEN).send(userNotPermittedMessage)
    const {success,message,type} = await updateBook(req.body)
    if (!success)
        return res.status(LibraryErrorToHttpError.get(type?? LibraryError.DbError)?? StatusCodes.INTERNAL_SERVER_ERROR).send(message)
    return res.status(StatusCodes.OK).send(message)
})


router.get('/searchBooks/:author/:topic/:year',async (req,res:any)=>{
    const {author,topic,year} = req.params
    if (!author || !topic || (!year && !Number.parseInt(year))) 
        return res.status(StatusCodes.BAD_REQUEST).send("the search request doesn't include all requested filed")
    return res.status(StatusCodes.OK).send(await searchBooks(author,topic,Number.parseInt(year)))
})

router.delete('/deleteBook',async (req,res:any)=>{
    if (!req.headers.authorization)
        return res.status(StatusCodes.UNAUTHORIZED).send(userNotPermittedMessage)
    const user = await getUserById(req.headers.authorization?? "")
    if (!user || !isUserEmployee(user))
        return res.status(StatusCodes.FORBIDDEN).send(userNotPermittedMessage)
    const {success,message,type} = await deleteBook(req.body)
    if (!success)
        return res.status(LibraryErrorToHttpError.get(type?? LibraryError.DbError)?? StatusCodes.INTERNAL_SERVER_ERROR).send(message)
    return res.status(StatusCodes.OK).send(message)
})

export default router