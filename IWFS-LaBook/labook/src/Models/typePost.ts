export enum POST_CATEGORIES {
    NORMAL = "normal",
    EVENT = "event"
}

export type Type_Post = {
    id: string
    description: string
    category: POST_CATEGORIES
    created_at: string
    url_photo: string
    creator_id: string
}
