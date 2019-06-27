/**
 * Contains all interfaces for local stoage
*/

/**
 * Data saved in local storage of device
 * mwl = Movie Watch List
 * tvwl = TV Watch List
 * cdvd = Collection of DVD
 * cbluray = Collection of Bluray
 */
export interface StorageData {
    mwl: StorageItem[];
    cbluray: StorageItem[];
    cdvd: StorageItem[];
    tvwl: StorageItem[];
    error?: boolean;
}

/**
 * Describe a single element saved in every array of local storage
 */
export interface StorageItem {
    title: string;
    id: number;
    poster: string;
    date: Date;
    type ?: string;
    duration ?: any;
    seasons ?: any[];
}