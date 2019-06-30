/**
 * This interface describe all the data used in cat page
 */
export interface CastPageData {
    detail: any;
    movies: any;
    shows: any;
}

export interface CastPageState {
    data: CastPageData;
    isLoading: boolean;
}