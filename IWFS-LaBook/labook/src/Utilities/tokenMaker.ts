import * as jwt from "jsonwebtoken"
import { autheticationData } from "../Models/authenticationData";
import dotenv from "dotenv"

dotenv.config()


export class TokenMaker {
    public generate(input: autheticationData): string {
        const token = jwt.sign(
            input,
            process.env.JWT_KEY as string,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        )
        return token
    }

    public verify(token: string): autheticationData {
        const data = jwt.verify(token, process.env.JWT_KEY)
            return data as autheticationData
    }
} 