import express from "express";
import { app } from "..";
import { UserController } from "../API/Controller/userController";

export const userRouter = express.Router()

userRouter.post('/signup', new UserController().signup)
userRouter.post('/login', new UserController().login) 