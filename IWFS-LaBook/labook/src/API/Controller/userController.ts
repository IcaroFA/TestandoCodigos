import { Request, Response } from "express";
import { UserDatabase } from "../../Data/userDatabase";
import { inputUserLoginDTO, inputUserSignupDTO } from "../../Types/inputUserDTO";
import { UserSettings } from "../Settings/userSettings";

export class UserController {
    private userSettings: UserSettings

    constructor(){
        this.userSettings = new UserSettings(new UserDatabase())
    }

    signup = async (req: Request, resp: Response):Promise<any> => {
        const {name, email, password} = req.body

        const inputSignUp: inputUserSignupDTO = {
            name: name,
            email: email,
            password: password
        }

        try{
            const token = await this.userSettings.signup(inputSignUp)

            resp.status(token.statusCode).send({message: token.message, token: token.token})
        } catch (error: any){
            if (error.message) return resp.status(400).send(error.message || error.mysql )

            resp.status(400).send( error.mesage || error.mysql )
        }
    }

    login = async (req: Request, resp: Response):Promise<any> => {
        const {email, password} = req.body

        const inputLogin: inputUserLoginDTO = { 
            email: email,
            password: password
        }
        try{
            const token = await this.userSettings.login(inputLogin)

            resp.status(token.statusCode).send({message: token.message, token: token.token})
        } catch (error: any){
            if (error.message) return resp.status(400).send(error.message || error.mysql )

            resp.status(400).send( error.mesage || error.mysql )
        }
    }

} 