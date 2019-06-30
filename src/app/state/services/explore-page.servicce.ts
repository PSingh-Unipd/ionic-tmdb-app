import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, forkJoin } from 'rxjs';
import { BaseService } from 'src/app/common/providers/base.service';
import { map } from 'rxjs/operators';
import { ListType } from '../interfaces/list-type.interface';
import { ExplorePageState } from '../interfaces/explore-page.interface';

/**
 * Serive to manage all data for explore page. 
 */
@Injectable()
export class ExplorePageService extends BaseService {
    constructor(private _http: HttpClient) {
        super(_http);
    }

    /**
    * Load initial lists when the application stqrt
    * @param data - vlues about the list to load from REST API
    */
    loadInitialLists(data: ListType[]): Observable<ExplorePageState> {
        return forkJoin(
            this.detailsREST('', data[0].listId, data[0].listCatagory),
            this.detailsREST('', data[1].listId, data[1].listCatagory),
        ).pipe(
            map((results) => {
                let temp: ExplorePageState = {
                    movieList: results[0].results,
                    showList: results[1].results
                };
                temp.showList.map(el => {
                    el.title = el.name;
                    el.release_date = el.first_air_date
                });
                return temp;
            })
        );
    }

    /**
     * Load simple movies or shows lists from TMDB
     * @param ListType - list id and catagory
     */
    getDefaultList(data: ListType): Observable<any[]> {
        return this.detailsREST('', data.listId, data.listCatagory).pipe(map(
            res => {
                const list: any[] = res.results;
                if (data.listCatagory == 'tv') {
                    list.filter(el => {
                        el.title = el.name;
                        el.release_date = el.first_air_date;
                    });
                }
                return list;
            }
        ));
    }

    /**
     * Load custom(made by users) movies or shows list from TMDB
     * @param ListType - list id and catagory
     */
    getCustomList(data: ListType): Observable<any[]> {
        return this.listREST(data.listId).pipe(map(
            res => {
                const list: any[] = res.items;
                if (data.listCatagory == 'tv') {
                    list.filter(el => {
                        el.title = el.name;
                        el.release_date = el.first_air_date;
                    });
                }
                return list;
            }
        ));
    }
}