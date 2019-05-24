import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/common/base.service';

@Injectable()
export class ExploreService extends BaseService{

    constructor(private _http: HttpClient) { 
        super(_http);
    }

    search(queryString: string): Observable<any> {
        return this.SearchREST(queryString, '&language=en-US&query=', '&page=1&include_adult=false');
    }

    getMovies(type:string): Observable<any> { // now_playing, upcoming, top_rated
        return this.MovieREST('', type, '&language=en-US');
    }

    getList(list): Observable<any> {
        return this.ListREST(list,'&language=en-US');
    }

}