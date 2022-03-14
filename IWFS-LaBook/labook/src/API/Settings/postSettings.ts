import { Inter_PostRepository } from "../../Interface/interface_PostRepository"
import { autheticationData } from "../../Models/authenticationData"
import { POST_CATEGORIES, Type_Post } from "../../Models/typePost"
import { inputPostCreateDTO } from "../../Types/inputPostDTO"
import { IdMaker } from "../../Utilities/idMaker"
import { TokenMaker } from "../../Utilities/tokenMaker"


export class PostSetting {
    private postDatabase: Inter_PostRepository
    private idMaker: IdMaker
    private tokenMaker: TokenMaker

    constructor(postDatabase: Inter_PostRepository){
        this.postDatabase = postDatabase
        this.idMaker = new IdMaker()
        this.tokenMaker = new TokenMaker()
    }

    createNewPost = async (input: inputPostCreateDTO, token: string):Promise<any> => {
        const {description, url_photo, category} = input

        const categoryWorked = category.toLocaleLowerCase()

        let message  = 'Seu post foi criado'
        let statusCode = 201

        if(!description || !url_photo || !categoryWorked) {
            statusCode = 406
            message = '"descrição", "imagem" e "categoria" devem ser definidos'
            throw new Error(message)
        }

        if(!token){
            statusCode = 406
            message = 'O token não foi informado'
            throw new Error(message)
        }

        if(categoryWorked !== POST_CATEGORIES.NORMAL && categoryWorked !== POST_CATEGORIES.EVENT) {
            statusCode = 406
            message = 'Seu post deve ser da categoria "normal" ou "evento"'
            throw new Error(message)
        }

        const tokenVerify: autheticationData = this.tokenMaker.verify(token)

        if(!tokenVerify){
            message = "Esse token tá lascado"
            throw new Error(message)
        }

        const id = this.idMaker.generate()

        const creationDate = new Date().toISOString().split("T")[0]

        const postBase: Type_Post = {
            id: id,
            description: input.description,
            url_photo: input.url_photo,
            category: categoryWorked,
            created_at: creationDate,
            creator_id: tokenVerify.id
        }
        await this.postDatabase.createNewPost(postBase)

        return {postBase, statusCode, message}
    }

    getPostById = async (id: string, token: string):Promise<any> => {

        let message  = 'Post criado!'
        let statusCode = 200

        if(!token){
            statusCode = 406
            message = 'Deu ruim com o token informado.'
            throw new Error(message)
        }

        const postData: Type_Post = await this.postDatabase.findById(id)

        if(!postData){
            statusCode = 404
            message = 'ID invalida, o post não rolou'
            throw new Error (message)
        }

        const convertedDate:string = postData.created_at.toISOString().split("T")[0]
        const reloadedData: string = convertedDate.split("-").reverse().join("/")

//tá dando ruim, mas não consigo resolver, vou tentar no final de semana


        const post: Type_Post = {
            id: postData.id,
            description: postData.description,
            url_photo: postData.url_photo,
            category: postData.category,
            created_at: reloadedData,
            creator_id: postData.creator_id
        }

        return {post, statusCode}
    }
}