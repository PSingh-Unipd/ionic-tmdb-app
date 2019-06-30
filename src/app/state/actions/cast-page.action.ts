import { createAction } from '@ngrx/store';
import { CastPageData } from '../interfaces/cast-page.interface';

export const LoadCastDetailsAction = createAction(
    '[Cast Page] Load all details of cast',
    (payload: string) => {
        return ({ payload });
    }
);

export const SaveDetailsDataAction = createAction(
    '[Cast Page] Save all details about cast',
    (payload: CastPageData) => {
        return ({ payload });
    }
);


