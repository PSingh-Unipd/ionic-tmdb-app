import { createAction } from '@ngrx/store';
import { Season } from '../interfaces/info-page.inteface';

export const LoadSeasonInfoAction = createAction(
    '[INfo Page] Load(from backend) all details about specific season',
    (payload: Season) => {
        return ({ payload });
    }
);

export const SaveSeasonInfoAction = createAction(
    '[Info Page] Save all details about specific season on store',
    (payload: any) => {
        return ({ payload });
    }
);
