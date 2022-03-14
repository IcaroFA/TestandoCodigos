import { v4 } from "uuid"

export class IdMaker {
    public generate():string{
        return v4()
    }
}