export interface Wine {
    id: number
    name: string
    vintage: string
    total_revenue: number
}

export interface WineQuery {
    query?: string
    sort?: string
}

export interface Env {
    PORT: string;
    FRONTEND_URL: string;
    DATABASE_URL: string;
}
