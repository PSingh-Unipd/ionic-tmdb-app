export interface Movie {
    title: string,
    id: number,
    poster: string,
    date: Date,
    type ?: string,
    duration ?: any,
    seasons ?: any[]
}