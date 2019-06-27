import { Action, createReducer, on } from '@ngrx/store';
import { Notifications } from '../interfaces/notification.interface';
import * as NotificationsActions from '../actions/notification.actions';

export const initialState: Notifications = {
    loading: null,
    message: null
};

const reducer = createReducer(
    initialState,
    on(NotificationsActions.LoadingAction, (state, action) => ({...state, loading: action.payload})),
    on(NotificationsActions.MessageAction, (state, action) => ({...state, message: action.payload}))
);

export function NotificationsReducer(state: Notifications, action: Action) {
    return reducer(state, action);
}