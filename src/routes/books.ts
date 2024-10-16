import express from "express"
import {StatusCodes} from 'http-status-codes'
const router = express.Router()
import {getBooks, addBook,searchBooks,updateBook} from "../BL/books"
import { getUser } from "../BL/users"
import { isUserEmployee } from "../BL/utils"

router.get('/',(req,res)=>{
    res.status(StatusCodes.OK).send(getBooks())
})

router.post('/addBook',(req,res)=>{
    addBook(req.body)
    res.status(StatusCodes.OK)
})

router.put('/updateBook',(req,res)=>{
    if (!isUserEmployee(getUser(req.headers.authorization?? "")))
        res.status(StatusCodes.FORBIDDEN).send()
    updateBook(req.body)
    res.status(StatusCodes.OK)
})


router.put('/updateBook',(req,res)=>{
    if (!isUserEmployee(getUser(req.headers.authorization?? "")))
        res.status(StatusCodes.FORBIDDEN).send()
    updateBook(req.body)
    res.status(StatusCodes.OK)
})

router.get('/searchBooks',(req,res)=>{
    // searchBooks(req.body)
    res.status(StatusCodes.OK)
})

export default router