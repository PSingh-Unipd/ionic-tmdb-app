import { ElementType } from './element-type.interface';

/**
 * This interface describe all the data used in details page
 */
export interface DetailsPageData {
    detail: any;
    credits: any;
    videos: any;
    recommendations: any;
}

export interface DetailsPageState {
    data: DetailsPageData;
    isLoading: boolean;
    tpye: string | null;
}