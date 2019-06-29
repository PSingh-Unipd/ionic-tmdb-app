import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { BaseService } from 'src/app/common/providers/base.service';
import { LocalStorageService } from 'src/app/common/providers/storage.service';
import { map } from 'rxjs/operators';
import { StorageItem, StorageData } from 'src/app/state/interfaces/local-storage.interfaces';

/**
 * Serive to manage all data for explore page. 
 * This service rappresent "Model" in Model-View-Controller pattern!
 */
@Injectable()
export class ExploreService extends BaseService {
    constructor(private _http: HttpClient, private _storage: LocalStorageService) {
        super(_http);  
    }

    /**
     * Search a movie or show by given string on TMDB
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