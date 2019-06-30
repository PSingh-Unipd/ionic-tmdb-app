import { createAction } from '@ngrx/store';
import { DetailsPageData } from '../interfaces/details-page.interface';
import { ElementType } from '../interfaces/element-type.interface';

export const LoadDetailsAction = createAction(
    '[Load Details] Load all details of movie or show',
    (payload: ElementType) => {
        return ({ payload });
    }
);

export const SaveDetailsDataAction = createAction(
    '[Save Details Data] Save all details of movie or show',
    (payload: DetailsPageData) => {
        return ({ payload });
    }
);


