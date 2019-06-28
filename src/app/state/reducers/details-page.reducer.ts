import { Action, createReducer, on } from '@ngrx/store';
import { DetailsPageData, DetailsPageState } from '../interfaces/details-page.interface';
import * as DetailsActions from '../actions/details-page.action';

export const initialState: DetailsPageState = {
    data: null,
    isLoading: false,
};

const reducer = createReducer(
    initialState,
    on(DetailsActions.SaveDetailsDataAction, (state, action) => ({...state, data:action.payload, isLoading:false})),
    on(DetailsActions.LoadDetailsAction, (state, action) => ({...state, isLoading:true}))
);

export function DetailsPageReducer(state: DetailsPageState, action: Action) {
    return reducer(state, action);
}