import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect, Effect } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap } from 'rxjs/operators';
import * as ExploreActions from '../actions/explore-page.actions';
import { Action } from '@ngrx/store';
import { MessageAction } from '../actions/notification.actions';
import { ExplorePageService } from '../services/explore-page.servicce';
import { ExplorePageState } from '../interfaces/explore-page.interface';

/**
 * This file contains all effects used to manage local(native) storage state.
 * There are these many effects, cause all the operitions on local storage 
 * are asynchronous. 
 */
@Injectable()
export class ExplorePageEffect {

  constructor(
    private actions$: Actions,
    private _service: ExplorePageService
  ) { }

  loadData$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(ExploreActions.LoadExploreDataAction),
    exhaustMap(action =>
      this._service.loadInitialLists(action.payload).pipe(
        map((data: ExplorePageState) => ExploreActions.SaveExploreDataAction(data)),
        catchError(error => of(MessageAction('Something went wrong while loading your data!')))
      )
    )
  ));

  CustomList$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(ExploreActions.LoadCustomListAction),
    exhaustMap(action =>
      this._service.getCustomList(action.payload).pipe(
        mergeMap((data) => {
          const actionsList: Action[] = [];
          actionsList.push(
            action.payload.listCatagory == 'movie' ?
              ExploreActions.SaveMoviesListAction(data) :
              ExploreActions.SaveShowsListAction(data)
          );
          actionsList.push(ExploreActions.UpdateLoading());
          return actionsList;
        }),
        catchError(error => of(MessageAction('Something went wrong while loading this list!')))
      )
    )
  ));

  DefaultList$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(ExploreActions.LoadDefaultListAction),
    exhaustMap(action =>
      this._service.getDefaultList(action.payload).pipe(
        mergeMap((data) => {
          const actionsList: Action[] = [];
          actionsList.push(
            action.payload.listCatagory == 'movie' ?
              ExploreActions.SaveMoviesListAction(data) :
              ExploreActions.SaveShowsListAction(data)
          );
          actionsList.push(ExploreActions.UpdateLoading());
          return actionsList;
        }),
        catchError(error => of(MessageAction('Something went wrong while loading this list!')))
      )
    )
  ));
}