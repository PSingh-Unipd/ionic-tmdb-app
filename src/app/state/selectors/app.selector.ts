import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from '../interfaces/app-state.interface';

/**
 * This file contains all selectors.
 * Selector is used to read specific state from store.
 * All components/pages in this application use selectors under this file to read states from store.
 */

export const appStateData = createFeatureSelector<AppState>('appState');

export const getDatilsPageData = createSelector(
    appStateData, 
    state => state.Details
);

export const getStorageData = createSelector(
    appStateData, 
    state => state.LocalStorage
);

export const getNotificationsData = createSelector(
    appStateData, 
    state => state.Notifications
);

export const getExploreData = createSelector(
    appStateData, 
    state => state.Explore
);

export const getExploreInitialLoading = createSelector(
    appStateData, 
    state => state.Explore.initialListLoading
);

export const getExploreLoading = createSelector(
    appStateData, 
    state => state.Explore.isLoading
);

export const getCollectionData = createSelector(
    appStateData, 
    state => {return {dvd: state.LocalStorage.cdvd, bluray: state.LocalStorage.cbluray};}
);

export const getWatchlistShows = createSelector(
    appStateData, 
    state => {return {movies: state.LocalStorage.mwl, shows: state.LocalStorage.tvwl};}
);

export const getDvdCollection = createSelector(
    getStorageData, 
    state => state.cdvd
);

export const getBlurayCollection = createSelector(
    getStorageData, 
    state => state.cbluray
);