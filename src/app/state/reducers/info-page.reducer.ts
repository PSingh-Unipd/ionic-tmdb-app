import { Action, createReducer, on } from '@ngrx/store';
import * as InfoActions from '../actions/info-page.actions';
import { InfoPageState } from '../interfaces/info-page.inteface';

export const initialState: InfoPageState = {
    data: null,
    isLoading: false,
};

const reducer = createReducer(
    initialState,
    on(InfoActions.SaveSeasonInfoAction, (state, action) => ({ ...state, data: action.payload, isLoading: false })),
    on(InfoActions.LoadSeasonInfoAction, (state, action) => ({ ...state, isLoading: true }))
);

export function InfoPageReducer(state: InfoPageState = initialState, action: Action) {
    return reducer(state, action);
}