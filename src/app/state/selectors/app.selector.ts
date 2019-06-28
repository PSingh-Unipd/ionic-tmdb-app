import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from '../interfaces/app-state.interface';

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

export const getWatchlistMovies = createSelector(
    appStateData, 
    state => state.LocalStorage.mwl
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