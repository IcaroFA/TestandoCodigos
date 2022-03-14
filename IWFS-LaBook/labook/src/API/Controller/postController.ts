import { Request, Response } from "express";
import { PostDatabase } from "../../Data/postDatabase";
import { inputPostCreateDTO } from "../../Types/inputPostDTO";
import { PostSetting } from "../Settings/postSettings";

export class PostController {
    private postSettings: PostSetting

    constructor(){
        this.postSettings = new PostSetting(new PostDatabase())
    }

    createNewPost = async (req: Request, resp: Response):Promise<any> => {
        const { description, url_photo, category } = req.body

        const token: string = req.headers.authorization as string

        const inputCreatePost: inputPostCreateDTO = {
            description: description, 
            url_photo: url_photo, 
            category: category 
        }

        try{
            const post = await this.postSettings.createNewPost(inputCreatePost, token)

            resp.status(post.statusCode).send({message: post.message, post: post.postBase})
        } catch (error: any){
            if (error.message) return resp.status(400).send(error.message || error.mysql )

            resp.status(400).send( error.mesage || error.mysql )
        }
    }

    getPostById = async (req: Request, resp: Response):Promise<any> => {
        const { id } = req.params

        const token: string = req.headers.authorization as string

        try{
            const post = await this.postSettings.getPostById(id, token)

            resp.status(post.statusCode).send({post: post.post})
        } catch (error: any){
            if (error.message) return resp.status(400).send(error.message || error.mysql )

            resp.status(400).send( error.mesage || error.mysql )
        }
    }
} 