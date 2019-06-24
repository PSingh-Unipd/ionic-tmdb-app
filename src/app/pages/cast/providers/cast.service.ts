import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { BaseService } from 'src/app/common/providers/base.service';

/**
 * Simple service, witch implement BaseService to read all the information about a person(actor, director, producer, etc)
 */
@Injectable()
export class CastService extends BaseService{

    constructor(private _http: HttpClient) { 
        super(_http);
    }

    getDetails(id): Observable<any> {
        return this.personREST(id, '');
    }

    getMovies(id): Observable<any> {
        return this.personREST(id, '/movie_credits');
    }

    getShows(id): Observable<any> {
        return this.personREST(id, '/tv_credits');
    }
}