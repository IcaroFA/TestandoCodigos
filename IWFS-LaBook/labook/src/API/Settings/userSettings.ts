import { Inter_UserRepository } from "../../Interface/interface_UserRepository"
import { Type_User } from "../../Models/typeUser"
import { HashManager } from "../../Services/hashManager"
import { inputUserLoginDTO, inputUserSignupDTO } from "../../Types/inputUserDTO"
import { IdMaker } from "../../Utilities/idMaker"
import { TokenMaker } from "../../Utilities/tokenMaker"


export class UserSettings {
    private userDatabase: Inter_UserRepository
    private idMaker: IdMaker
    private tokenMaker: TokenMaker
    private hashManager: HashManager

    constructor(userDatabase: Inter_UserRepository){
        this.userDatabase = userDatabase
        this.idMaker = new IdMaker()
        this.tokenMaker = new TokenMaker()
        this.hashManager = new HashManager()
    }

    signup = async (input: inputUserSignupDTO):Promise<any> => {
        const {name, email, password} = input

        let message  = "Conta criada, HAHA!"
        let statusCode = 201

            if (!name || !email || !password) {
                statusCode = 406
                message = '"name", "email" e "senha" devem ser informados'
                throw new Error(message)
            }

            const userData = await this.userDatabase.findByEmail(email)

            if(userData){
                throw new Error ('Esse email já existe')
            }

            const id = this.idMaker.generate()

            const hashedPassword = await this.hashManager.hash(password)

            const userBase: Type_User = {
                id: id,
                name: input.name,
                email: input.email,
                password: hashedPassword
            }

            await this.userDatabase.createNewUser(userBase)

            const token = this.tokenMaker.generate({id: id})

            return {token, statusCode, message}
    }

    login = async (input: inputUserLoginDTO):Promise<any> => {
        const { email, password } = input

        let message  = 'Logooou!'
        let statusCode = 200

        if (!email || !password) {
            statusCode = 406
            message = '"email" e "senha" devem ser informados'
            throw new Error(message)
        }

        const userData = await this.userDatabase.findByEmail(email)

        if(!userData){
            message = 'Não achei esse email, tenta denovo'
            throw new Error (message)
        }

        const passwordCompare: boolean = await this.hashManager.compare(password, userData.password)

        if (!passwordCompare) {
            statusCode = 401
            message = "Essa senha tá avacalhada"
            throw new Error(message)
        }

        const token: string = this.tokenMaker.generate( {id: userData.id} )

        return {token, statusCode, message}
    }
} 