import { Action, createReducer, on } from '@ngrx/store';
import * as LocalStorageActions from '../actions/local-storage.actions';
import { StorageData } from 'src/app/state/interfaces/local-storage.interfaces';

export const initialState: StorageData = {
    mwl: [],
    tvwl: [],
    cbluray: [],
    cdvd: [],
    error: false
};

const reducer = createReducer(
    initialState,
    on(LocalStorageActions.WatchlistMoviesAction, (state, action) => ({ ...state, mwl: action.payload})),
    on(LocalStorageActions.WatchlistShowsAction, (state, action) => ({ ...state, tvwl: action.payload })),
    on(LocalStorageActions.CollectionBlurayAction, (state, action) => ({ ...state, cbluray: action.payload })),
    on(LocalStorageActions.CollectionDvdAction, (state, action) => ({ ...state, cdvd: action.payload })),
    on(LocalStorageActions.StorageDataAction, (state, action) => ({ ...state, mwl: action.payload.mwl,
        cbluray: action.payload.cbluray, cdvd: action.payload.cdvd, tvwl: action.payload.tvwl }))
);

export function LocalStorageReducer(state: StorageData, action: Action) {
    return reducer(state, action);
}
