import { Action, createReducer, on } from '@ngrx/store';
import { DetailsPageState } from '../interfaces/details-page.interface';
import * as DetailsActions from '../actions/details-page.action';

export const initialState: DetailsPageState = {
    data: null,
    isLoading: false,
    tpye: null
};

const reducer = createReducer(
    initialState,
    on(DetailsActions.SaveDetailsDataAction, (state, action) => ({...state, data: action.payload, isLoading: false})),
    on(DetailsActions.LoadDetailsAction, (state, action) => ({...state, isLoading: true, tpye: action.payload.type}))
);

export function DetailsPageReducer(state: DetailsPageState, action: Action) {
    return reducer(state, action);
}
