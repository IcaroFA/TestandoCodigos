import { UserInputDTO } from "../Model/User";
import { UserDatabase } from "../Data/UserDatabase";
import { IdGenerator } from "../Services/IdGenerator";
import { FieldsToComplet } from "../Error/FieldsToComplet";

export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator
    ) { }

    async createUser(user: UserInputDTO) {
        const id = this.idGenerator.generate()
        if (!user.firstName || !user.lastName || !user.participation && user.participation !== 0) {
            throw new FieldsToComplet()
        }

        if (user.participation <= 0) {
            throw new Error('A participação deve ser superior a 0')
        }

        const result = await this.userDatabase.insertUser(id, user.firstName, user.lastName, user.participation);

        return result
    }

    async getUser() {

        const userDatabase = new UserDatabase();
        const userFromDB = await userDatabase.getAllUser();

        return userFromDB

    }
} 