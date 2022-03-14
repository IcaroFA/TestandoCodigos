import { Type_Post } from "../Models/typePost"

export interface Inter_PostRepository {
    createNewPost(user: Type_Post):Promise<void>
    findById(email: string):Promise<Type_Post | null>
} 