import { createFeatureSelector, createSelector } from '@ngrx/store';
import { InfoPageState } from '../interfaces/info-page.inteface';
import { CastPageState } from '../interfaces/cast-page.interface';
import { StorageData } from '../interfaces/local-storage.interfaces';
import { ExplorePageState } from '../interfaces/explore-page.interface';
import { DetailsPageState } from '../interfaces/details-page.interface';

/**
 * This file contains all selectors.
 * Selector is used to read specific state from store.
 * All components/pages in this application use selectors under this file to read states from store.
 */

export const getDatilsPageData = createFeatureSelector<DetailsPageState>('Details');
export const getInfoPageData = createFeatureSelector<InfoPageState>('Info');
export const getCastPageData = createFeatureSelector<CastPageState>('Cast');
export const getStorageData = createFeatureSelector<StorageData>('LocalStorage');
export const getNotificationsData = createFeatureSelector<string>('Notifications');
export const getExploreData = createFeatureSelector<ExplorePageState>('Explore');

export const getExploreInitialLoading = createSelector(
    getExploreData,
    state => state.initialListLoading
);

export const getExploreLoading = createSelector(
    getExploreData,
    state => state.isLoading
);

export const getCollectionData = createSelector(
    getStorageData,
    state => ({dvd: state.cdvd, bluray: state.cbluray})
);

export const getWatchlistShows = createSelector(
    getStorageData,
    state => ({movies: state.mwl, shows: state.tvwl})
);

export const getDvdCollection = createSelector(
    getStorageData,
    state => state.cdvd
);

export const getBlurayCollection = createSelector(
    getStorageData,
    state => state.cbluray
);
