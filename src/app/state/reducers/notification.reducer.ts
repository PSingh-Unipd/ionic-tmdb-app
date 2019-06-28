import { Action, createReducer, on } from '@ngrx/store';
import * as NotificationsActions from '../actions/notification.actions';

export const initialState: string = null;

const reducer = createReducer(
    initialState,
    on(NotificationsActions.MessageAction, (state, action) => (action.payload))
);

export function NotificationsReducer(state: string, action: Action) {
    return reducer(state, action);
}