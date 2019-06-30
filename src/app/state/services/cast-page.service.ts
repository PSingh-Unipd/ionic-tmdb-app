import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, forkJoin } from 'rxjs';
import { BaseService } from 'src/app/common/providers/base.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CastPageData } from '../interfaces/cast-page.interface';

/**
 * Service to read all the information about cast(actor, director, producer, etc)
 * It extends the BaseService class
 */
@Injectable()
export class CastPageService extends BaseService {
    constructor(public http: HttpClient) {
        super(http);
    }

    getDetails(id: string): Observable<CastPageData> {
        return forkJoin(
            this.personREST(id, ''),
            this.personREST(id, '/movie_credits'),
            this.personREST(id, '/tv_credits')
        ).pipe(
            map(([details, movies, shows]) => {
                if (details.biography == '')
                    details.biography = 'No biography available for this person in our database!';
                let temp: CastPageData = {
                    detail: details,
                    movies: movies,
                    shows: shows,
                };
                return temp;
            })
        );
    }
}