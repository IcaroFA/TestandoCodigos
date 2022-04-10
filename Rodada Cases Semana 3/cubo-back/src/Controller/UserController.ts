import { Request, Response } from "express";
import { UserInputDTO } from "../Model/User";
import { UserBusiness } from "../Business/UserBusiness";
import { BaseDatabase } from "../Data/BaseDatabase";
import { UserDatabase } from "../Data/UserDatabase";
import { IdGenerator } from "../Services/IdGenerator";

const userBusiness = new UserBusiness(
    new UserDatabase(),
    new IdGenerator()
);
export class UserController {
    async createUser(req: Request, res: Response) {
        try {

            const input: UserInputDTO = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                participation: req.body.participation,
            }

            const result = await userBusiness.createUser(input);

            res.status(200).send(result);

        } catch (error) {
            res.status(400).send('BROKEN');
        }

        await BaseDatabase.destroyConnection();
    }

    async getUsers(req: Request, res: Response) {

        try {

            const userBusiness = new UserBusiness(
                new UserDatabase,
                new IdGenerator
            );
            const result = await userBusiness.getUser();

            res.status(200).send(result);

        } catch (error) {
            res.status(400).send('BROKEN');
        }

        await BaseDatabase.destroyConnection();
    }

} 