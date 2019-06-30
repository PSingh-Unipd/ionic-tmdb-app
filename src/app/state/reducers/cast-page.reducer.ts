import { Action, createReducer, on } from '@ngrx/store';
import * as CastActions from '../actions/cast-page.action';
import { CastPageState } from '../interfaces/cast-page.interface';

export const initialState: CastPageState = {
    data: null,
    isLoading: false
};

const reducer = createReducer(
    initialState,
    on(CastActions.SaveDetailsDataAction, (state, action) => ({...state, data:action.payload, isLoading:false})),
    on(CastActions.LoadCastDetailsAction, (state, action) => ({...state, isLoading:true}))
);

export function CastPageReducer(state: CastPageState = initialState, action: Action) {
    return reducer(state, action);
}