import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import * as CastActions from '../actions/cast-page.action';
import { CastPageService } from '../services/cast-page.service';
import { CastPageData } from '../interfaces/cast-page.interface';

@Injectable()
export class CastPageEffect {
    constructor(
        private actions$: Actions,
        private _service: CastPageService
    ) { }

    loadCastDetails$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(CastActions.LoadCastDetailsAction),
        switchMap(action => {
            return this._service.getDetails(action.payload).pipe(
                map((data: CastPageData) => CastActions.SaveDetailsDataAction(data))
            );
        })
    ));
}