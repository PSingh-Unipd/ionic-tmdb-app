import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { BaseService } from 'src/app/common/services/base.service';

@Injectable()
export class InfoService extends BaseService{

    constructor(private _http: HttpClient) { 
        super(_http);
    }

    getSeasonDetails(seasonNumber, showId): Observable<any> {
        return this.SeasonREST(seasonNumber, showId);
    }

}