import express from "express"
import morgan from "morgan"
import cors from 'cors'
import cookieParser from "cookie-parser"
import { connectMongo } from './database/db.js'
import iRouter from './routes/index.routes.js'


export const app = express()
connectMongo()

app.use(morgan("tiny"))
app.use(express.json())
app.use(cookieParser());
app.use(cors());

app.use(iRouter) 