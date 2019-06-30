import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import * as InfoActions from '../actions/info-page.actions';
import { InfoPageService } from '../services/info-page.service';

@Injectable()
export class InfoPageEffect {
    constructor(
        private actions$: Actions,
        private _service: InfoPageService
    ) { }

    loadInfoDetails$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(InfoActions.LoadSeasonInfoAction),
        switchMap(action => {
            return this._service.getSeasonDetails(action.payload).pipe(
                map((data: any) => {
                    return InfoActions.SaveSeasonInfoAction(data);
                })
            );
        }),

    ));
}