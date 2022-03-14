import { Inter_PostRepository } from "../Interface/interface_PostRepository";
import { Type_Post } from "../Models/typePost";
import { BaseDatabase } from "./connectionData";


export class PostDatabase extends BaseDatabase implements Inter_PostRepository{
    private static TABLE_NAME: string = "labook_posts"

    async createNewPost(post: Type_Post): Promise<void> {
        await this.connectionData()
            .into(PostDatabase.TABLE_NAME)
            .insert(post)
    }

    async findById(id: string): Promise<Type_Post | null> {
        const results: any = await this.connectionData()
            .into(PostDatabase.TABLE_NAME)
            .select("*")
            .where({ id: id })

            return results.length ? results[0] : null
    }
} 