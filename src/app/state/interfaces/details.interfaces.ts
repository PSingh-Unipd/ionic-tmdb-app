/**
 * Contains all interfaces/enum for Details page and related page to it
 */

 /**
  * Simple enum used to describe what type of element is loaded in details page
  */
export enum ElementType {
    movie,
    show
}

/**
 * This interface is used to load information of details page
 */
export interface DetailsElement {
    type: string,
    id: string
}

/**
 * This interface describe all the data used in details page
 */
export interface DetailsData {
    detail: any;
    credits: any[];
    videos: any[];
    movieRecommendations: any[];
}