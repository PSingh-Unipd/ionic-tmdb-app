import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect, Effect } from '@ngrx/effects';
import { of, EMPTY, Observable } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap } from 'rxjs/operators';
import * as StorageActions from '../actions/local-storage.actions';
import { LocalStorageProvaService } from '../services/storage.service';
import { Action } from '@ngrx/store';
import { StorageData } from 'src/app/state/interfaces/local-storage.interfaces';

@Injectable()
export class LocalStorageEffect {

  constructor(
    private actions$: Actions,
    private _service: LocalStorageProvaService
  ) { }

  loadData$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(StorageActions.LoadStorageAction),
    exhaustMap(action =>
      this._service.loadData().pipe(
        map((data: StorageData) => StorageActions.StorageDataAction(data))
        //catchError(error => of(AuthApiActions.loginFailure({ error })))
      )
    )
  ));

  UpdateMoviesWatchlist$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(StorageActions.UpdateWatchlistMoviesAction),
    exhaustMap((action) =>
      this._service.updateMoviesWL(action.payload).pipe(
        map((condition: Boolean) => StorageActions.WatchlistMoviesAction(action.payload))
      )
    )
  ));

  UpdateShowsWatchlist$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(StorageActions.UpdateWatchlistShowAction),
    exhaustMap((action) =>
      this._service.updateTvSeriesWL(action.payload).pipe(
        map((condition: Boolean) => StorageActions.WatchlistShowsAction(action.payload))
      )
    )
  ));

  UpdateBlurayCollectionlist$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(StorageActions.UpdateCollectionBlurayAction),
    exhaustMap((action) =>
      this._service.updateCbluray(action.payload).pipe(
        map((condition: Boolean) => StorageActions.CollectionBlurayAction(action.payload))
      )
    )
  ));

  UpdateDvdCollectionlist$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(StorageActions.UpdateCollectionDvdAction),
    exhaustMap((action) =>
      this._service.updateCdvd(action.payload).pipe(
        map((condition: Boolean) => StorageActions.CollectionDvdAction(action.payload))
      )
    )
  ));

}