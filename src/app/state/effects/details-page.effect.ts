import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import {  map, switchMap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import * as DetailsActions from '../actions/details-page.action';
import { DetailsPageService } from '../services/details-page.service';
import { DetailsPageData } from '../interfaces/details-page.interface';

@Injectable()
export class DetailsPageEffect {

    constructor(
        private actions$: Actions,
        private _service: DetailsPageService
    ) { }

    loadDetails$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(DetailsActions.LoadDetailsAction),
        switchMap(action => {
            return this._service.getDetails(action.payload.id, action.payload.type).pipe(
                map((data: DetailsPageData) => {
                    return DetailsActions.SaveDetailsDataAction(data);
                })
            );
        })
    ));

}
