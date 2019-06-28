export interface StorageData {
    mwl: StorageItem[];
    cbluray: StorageItem[];
    cdvd: StorageItem[];
    tvwl: StorageItem[];
    error?: boolean;
}

export interface StorageItem {
    title: string;
    id: number;
    poster: string;
    date: Date;
    type ?: string;
    duration ?: any;
    seasons ?: any[];
}