import express, { Express } from "express";
import cors from 'cors'

import { userRouter } from "./Routes/userRoutes";
import { postRouter } from "./Routes/postRoutes";

export const app: Express = express()

app.use(express.json())
app.use(cors())

app.listen(3001, () => console.log("Iniciando projeto"))

app.use('/users', userRouter)
app.use('/posts', postRouter) 