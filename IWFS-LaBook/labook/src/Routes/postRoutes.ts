import express from "express"
import { PostController } from "../API/Controller/postController"

export const postRouter = express.Router()

postRouter.get('/:id', new PostController().getPostById)
postRouter.post('/create', new PostController().createNewPost)
