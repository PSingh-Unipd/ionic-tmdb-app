import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { BaseService } from 'src/app/common/providers/base.service';

/**
 * Service to read all the information about a season of specific tv-show
 * It extends the BaseService class
 */
@Injectable()
export class InfoService extends BaseService{

    constructor(private _http: HttpClient) { 
        super(_http);
    }

    getSeasonDetails(seasonNumber, showId): Observable<any> {
        return this.seasonREST(seasonNumber, showId);
    }

}