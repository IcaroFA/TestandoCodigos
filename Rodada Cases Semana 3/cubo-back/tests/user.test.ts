import { UserBusiness } from "../src/Business/UserBusiness";
import { IdGeneratorMock } from "./mock/IdGeneratorMock";
import { UserDataBaseMock } from "./mock/UserDatabaseMock";

const userBusinessMock = new UserBusiness(
    new UserDataBaseMock() as any,
    new IdGeneratorMock()
)

describe('Teste para inserir usuário na tabela', () => {
    test("Erro devido a nome vazio", async () => {
        expect.assertions(1)
        try {
            await userBusinessMock.createUser({
                firstName: "",
                lastName: "Ferreira",
                participation: 35
            })

        } catch (e) {
            expect(e.message).toEqual("To an incomplete field")
            expect(e.statusCode).toBe(422)
        }
    })
    test("Erro devido a sobrenome vazio", async () => {
        expect.assertions(1)
        try {
            await userBusinessMock.createUser({
                firstName: "Ícaro",
                lastName: "",
                participation: 35
            })
        } catch (e) {
            expect(e.message).toEqual("To an incomplete field")
            expect(e.statusCode).toBe(422)
        }
    })

    test("Erro devido a participação vazia ou 0", async () => {
        expect.assertions(1)
        try {
            await userBusinessMock.createUser({
                firstName: "Ícaro",
                lastName: "Ferreira",
                participation: 0
            })
        } catch (e) {
            expect(e.message).toEqual("To an incomplete field")
            expect(e.statusCode).toBe(422)
        }
    })

    test("Sucesso ao Inserir", async () => {
        expect.assertions(1)
        try {
            const user = await userBusinessMock.createUser({
                firstName: "Ícaro",
                lastName: "Ferreira",
                participation: 35
            })
            expect(user).toEqual("Usuário inserido na tabela com sucesso!")
        } catch (e) {
            console.log(e)
        }
    })

})

describe("Buscar todos os usuários", () => {
    test("Buscar todos os usuários", async () => {
        expect.assertions(1)
        try {
            const users = await userBusinessMock.getUser()
            expect(users).toEqual([{
                id: "id_mockado_1",
                firstName: "Ícaro",
                lastName: "Ferreira",
                participation: 35
            }, {
                id: "id_mockado_2",
                firstName: "Evelim",
                lastName: "Matarrachi",
                participation: 25
            }])
        } catch (e) {
            console.log(e)
        }
    })
}) 