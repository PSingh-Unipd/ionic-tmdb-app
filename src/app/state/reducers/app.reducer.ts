import { ActionReducerMap, ActionReducer, combineReducers } from "@ngrx/store";
import { AppState } from '../interfaces/app-state.interface';
import { DetailsPageReducer } from './details-page.reducer';
import { LocalStorageReducer } from './local-storage.reducer';
import { NotificationsReducer } from './notification.reducer';

const reducers: ActionReducerMap<AppState> = {
  LocalStorage: LocalStorageReducer,
  Details: DetailsPageReducer,
  Notifications: NotificationsReducer
};

export const appReducer: ActionReducer<AppState> = combineReducers(reducers);