import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { BaseService } from 'src/app/common/providers/base.service';
import { Season } from '../interfaces/info-page.inteface';
import { map } from 'rxjs/operators';

/**
 * Service to read all the information about a season of specific tv-show.
 * It extends the BaseService class.
 */
@Injectable()
export class InfoPageService extends BaseService {
    constructor(private _http: HttpClient) {
        super(_http);
    }

    getSeasonDetails(data: Season): Observable<any> {
        console.log(data);
        return this.seasonREST(data.seasonNumber, data.showId);
    }

}