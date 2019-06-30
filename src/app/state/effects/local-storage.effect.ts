import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect, Effect } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap } from 'rxjs/operators';
import * as StorageActions from '../actions/local-storage.actions';
import { LocalStorageProvaService } from '../services/storage.service';
import { Action } from '@ngrx/store';
import { StorageData } from 'src/app/state/interfaces/local-storage.interfaces';
import { MessageAction } from '../actions/notification.actions';

/**
 * This file contains all effects used to manage local(native) storage state.
 * There are these many effects, cause all the operitions on local storage 
 * are asynchronous. 
 */
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
        map((data: StorageData) => StorageActions.StorageDataAction(data)),
        catchError(error => of(MessageAction('Something went wrong while loading your data!')))
      )
    )
  ));

  UpdateMoviesWatchlist$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(StorageActions.UpdateWatchlistMoviesAction),
    exhaustMap((action) =>
      this._service.updateMoviesWL(action.payload).pipe(
        mergeMap((condition: Boolean) => [
          StorageActions.WatchlistMoviesAction(action.payload),
          MessageAction(action.payload[0].title + ' added to your watchlist')
        ]),
        catchError(error => of(MessageAction('Something went wrong!')))
      )
    )
  ));

  UpdateShowsWatchlist$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(StorageActions.UpdateWatchlistShowAction),
    exhaustMap((action) =>
      this._service.updateTvSeriesWL(action.payload).pipe(
        mergeMap((condition: Boolean) => [
          StorageActions.WatchlistShowsAction(action.payload),
          MessageAction(action.payload[0].title + ' added to your watchlist')
        ]),
        catchError(error => of(MessageAction('Something went wrong!')))
      )
    )
  ));

  UpdateBlurayCollectionlist$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(StorageActions.UpdateCollectionBlurayAction),
    exhaustMap((action) =>
      this._service.updateCbluray(action.payload).pipe(
        mergeMap((condition: Boolean) => [
          StorageActions.CollectionBlurayAction(action.payload),
          MessageAction(action.payload[0].title + ' added to your Bluray collection!')
        ]),
        catchError(error => of(MessageAction('Something went wrong!')))
      )
    )
  ));

  UpdateDvdCollectionlist$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(StorageActions.UpdateCollectionDvdAction),
    exhaustMap((action) =>
      this._service.updateCdvd(action.payload).pipe(
        mergeMap((condition: Boolean) => [
          StorageActions.CollectionDvdAction(action.payload),
          MessageAction(action.payload[0].title + ' added to your DVD collection!')
        ]),
        catchError(error => of(MessageAction('Something went wrong!')))
      )
    )
  ));

  ReorderMoviesWatchlist$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(StorageActions.ReorderWatchlistMoviesAction),
    exhaustMap((action) =>
      this._service.updateMoviesWL(action.payload).pipe(
        mergeMap((condition: Boolean) => [
          StorageActions.WatchlistMoviesAction(action.payload)
        ]),
      )
    )
  ));

  ReorderShowsWatchlist$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(StorageActions.ReorderWatchlistShowsAction),
    exhaustMap((action) =>
      this._service.updateTvSeriesWL(action.payload).pipe(
        mergeMap((condition: Boolean) => [
          StorageActions.WatchlistShowsAction(action.payload)
        ]),
      )
    )
  ));

  DeleteMovieWatchlist$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(StorageActions.DeleteWatchlistMovieAction),
    exhaustMap((action) =>
      this._service.updateMoviesWL(action.payload).pipe(
        mergeMap((condition: Boolean) => [
          StorageActions.WatchlistMoviesAction(action.payload),
          MessageAction('Movie removed from your watchlist!')
        ]),
        catchError(error => of(MessageAction('Something went wrong!')))
      )
    )
  ));

  DeleteShowsWatchlist$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(StorageActions.DeleteWatchlistShowAction),
    exhaustMap((action) =>
      this._service.updateTvSeriesWL(action.payload).pipe(
        mergeMap((condition: Boolean) => [
          StorageActions.WatchlistShowsAction(action.payload),
          MessageAction('Show removed from your watchlist!')
        ]),
        catchError(error => of(MessageAction('Something went wrong!')))
      )
    )
  ));

  DeleteBlurayCollectionlist$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(StorageActions.DeleteBlurayCollectionItemAction),
    exhaustMap((action) =>
      this._service.updateCbluray(action.payload).pipe(
        mergeMap((condition: Boolean) => [
          StorageActions.CollectionBlurayAction(action.payload),
          MessageAction('Item removed from your Bluray collection!')
        ]),
        catchError(error => of(MessageAction('Something went wrong!')))
      )
    )
  ));

  DeleteDvdCollectionlist$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(StorageActions.DeleteDvdCollectionItemAction),
    exhaustMap((action) =>
      this._service.updateCdvd(action.payload).pipe(
        mergeMap((condition: Boolean) => [
          StorageActions.CollectionDvdAction(action.payload),
          MessageAction('Item removed from your DVD collection!')
        ]),
        catchError(error => of(MessageAction('Something went wrong!')))
      )
    )
  ));
}