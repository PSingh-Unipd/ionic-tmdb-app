import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/common/providers/base.service';
import { map } from 'rxjs/operators';

/**
 * Serive used only for searchbar.
 * All other data in this application is manage by ngrx.
 */
@Injectable()
export class ExploreService extends BaseService {
    constructor(private _http: HttpClient) {
        super(_http);
    }

    /**
     * Search a movie or show by given string on TMDB API
     * @param queryString - value to search
     * @param type - movie or tv
     */
    search(queryString: string, type: string): Observable<any> {
        return this.searchREST(queryString, '&page=1&include_adult=false', type).pipe(
            map(res => type != 'movie' ? res.results.filter(el => {
                el.title = el.name;
                el.release_date = el.first_air_date;
                return el;
            }) : res.results)
        );
    }
}
