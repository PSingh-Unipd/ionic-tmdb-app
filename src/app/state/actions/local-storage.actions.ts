import { createAction, props } from '@ngrx/store';
import { StorageItem, StorageData } from 'src/app/state/interfaces/local-storage.interfaces';

/**
 * Actions for LocalStorgeEffect
 */
export const LoadStorageAction = createAction(
    '[Local Storage]  Load local storage data'
);

export const UpdateWatchlistMoviesAction = createAction(
    '[Local Storage]  Movies WatchList update',
    (payload: StorageItem[]) => {
        return ({ payload });
    }
);

export const UpdateWatchlistShowAction = createAction(
    '[Local Storage]  Shows WatchList update',
    (payload: StorageItem[]) => {
        return ({ payload });
    }
);

export const UpdateCollectionDvdAction = createAction(
    '[Local Storage] Movies Collection update',
    (payload: StorageItem[]) => {
        return ({ payload });
    }
);

export const UpdateCollectionBlurayAction = createAction(
    '[Local Storage] Shows Collection update',
    (payload: StorageItem[]) => {
        return ({ payload });
    }
);

/**
 * Actions for LocalStorageReducer
 */
export const StorageDataAction = createAction(
    '[Local Storage] Load local storage into store',
    (payload: StorageData) => {
        return ({ payload });
    }
);
export const WatchlistMoviesAction = createAction(
    '[Local Storage] Movies WatchList state update',
    (payload: StorageItem[]) => {
        return ({ payload });
    }
);
export const WatchlistShowsAction = createAction(
    '[Local Storage] Shows WatchList state update',
    (payload: StorageItem[]) => {
        return ({ payload });
    }
);
export const CollectionDvdAction = createAction(
    '[Local Storage] DVD Collection state update',
    (payload: StorageItem[]) => {
        return ({ payload });
    }
);
export const CollectionBlurayAction = createAction(
    '[Local Storage] Bluray Collection Update',
    (payload: StorageItem[]) => {
        return ({ payload });
    }
);
