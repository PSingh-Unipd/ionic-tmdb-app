import { Action, createReducer, on } from '@ngrx/store';
import { ExplorePageState } from '../interfaces/explore-page.interface';
import * as ExploreActions from '../actions/explore-page.actions';

const initialState: ExplorePageState = {
    showList: null,
    movieList: null,
    isLoading: false,
    initialListLoading: true // When the application start this value is true
};

const reducer = createReducer(
    initialState,
    on(ExploreActions.SaveExploreDataAction, (state, action) => ({
        ...state,
        movieList: action.payload.movieList,
        showList: action.payload.showList,
        initialListLoading: false
    })),
    on(ExploreActions.SaveMoviesListAction, (state, action) => ({ ...state, movieList: action.payload, isLoading: false })),
    on(ExploreActions.SaveShowsListAction, (state, action) => ({ ...state, showList: action.payload, isLoading: false })),
    on(ExploreActions.LoadCustomListAction, (state, action) => ({ ...state, isLoading: true })),
    on(ExploreActions.LoadDefaultListAction, (state, action) => ({ ...state, isLoading: true }))
);

export function ExplorePageReducer(state: ExplorePageState = initialState, action: Action) {
    return reducer(state, action);
}
