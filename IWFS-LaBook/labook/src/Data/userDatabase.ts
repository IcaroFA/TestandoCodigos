import { Inter_UserRepository } from "../Interface/interface_UserRepository";
import { Type_User } from "../Models/typeUser";
import { BaseDatabase } from "./connectionData";


export class UserDatabase extends BaseDatabase implements Inter_UserRepository {
    private static TABLE_NAME: string = "labook_users"

    async createNewUser(user: Type_User): Promise<void> {
        await this.connectionData()
            .into(UserDatabase.TABLE_NAME)
            .insert(user)
    }

    async findByEmail (email: string) {
        const results: Type_User[] = await this.connectionData()
            .into(UserDatabase.TABLE_NAME)
            .select("*")
            .where( {email: email} )

            return results.length ? results[0] : null

    }
} 