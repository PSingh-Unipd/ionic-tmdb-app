import { createFeatureSelector, createSelector } from "@ngrx/store";
import { StorageData } from '../interfaces/local-storage.interfaces';
import { DetailsPageData } from '../interfaces/details-page.interface';
import { Notifications } from '../interfaces/notification.interface';

export const getStorageData = createFeatureSelector<StorageData>('LocalStorage');
export const getDatilsPageData = createFeatureSelector<DetailsPageData>('Details');
export const getNotificationsData = createFeatureSelector<Notifications>('Notifications');

export const getWatchlistMovies = createSelector(
    getStorageData, 
    state => state.mwl
);

export const getWatchlistShows = createSelector(
    getStorageData, 
    state => state.tvwl
);

export const getDvdCollection = createSelector(
    getStorageData, 
    state => state.cdvd
);

export const getBlurayCollection = createSelector(
    getStorageData, 
    state => state.cbluray
);