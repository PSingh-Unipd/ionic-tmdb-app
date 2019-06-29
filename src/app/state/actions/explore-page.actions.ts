import { createAction } from '@ngrx/store';
import { ListType } from '../interfaces/list-type.interface';
import { ExplorePageState } from '../interfaces/explore-page.interface';

export const LoadExploreDataAction = createAction(
    '[Explore Data] Load 2 lists of movies and shows',
    (payload: ListType[]) => {
        return ({ payload });
    }
);

export const SaveExploreDataAction = createAction(
    '[Explore Data] loading data into store(state)',
    (payload: ExplorePageState) => {
        return ({ payload });
    }
);

export const SaveShowsListAction = createAction(
    '[Explore Data] Save new shows list into store',
    (payload: any[]) => {
        return ({ payload });
    }
);

export const SaveMoviesListAction = createAction(
    '[Explore Data] Save new movies list into store',
    (payload: any[]) => {
        return ({ payload });
    }
);

export const LoadDefaultListAction = createAction(
    '[Explore Data] Load new default list from REST',
    (payload: ListType) => {
        return ({ payload });
    }
);

export const LoadCustomListAction = createAction(
    '[Explore Data] Load new custom(user made) list from REST',
    (payload: ListType) => {
        return ({ payload });
    }
);

export const UpdateLoading = createAction(
    '[Explore Data] Change loading boolean state'
);


