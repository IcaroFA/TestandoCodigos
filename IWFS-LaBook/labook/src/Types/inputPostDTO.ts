import { POST_CATEGORIES } from "../Models/typePost"

export type inputPostCreateDTO = {
    description: string,
    url_photo: string,
    category: POST_CATEGORIES
} 