import express, { urlencoded,json } from 'express';
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import responseTime from "response-time";

import routes from "./routes"

const {users, books} = routes
const app = express();
app.use(compression())
app.use(json())
app.use(urlencoded({extended:true}))
app.use(cors({origin:'*'}))
app.use(cookieParser())
app.use(responseTime())
app.use(helmet())
app.use(cors())
app.use('/users',users )
app.use('/books', books)


export default app