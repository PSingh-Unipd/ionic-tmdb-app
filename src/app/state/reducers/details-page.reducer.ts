import { Action, createReducer, on } from '@ngrx/store';
import { DetailsPageData } from '../interfaces/details-page.interface';
import * as DetailsActions from '../actions/details-page.action';

export const initialState: DetailsPageData = {
    detail: null,
    credits: null,
    videos: null,
    recommendations: null,
    element: null
};

const reducer = createReducer(
    initialState,
    on(DetailsActions.SaveDetailsDataAction, (state, action) => ({...action.payload}))
);

export function DetailsPageReducer(state: DetailsPageData, action: Action) {
    return reducer(state, action);
}