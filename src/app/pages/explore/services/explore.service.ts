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

    getMovies(): Observable<any> {
        return this.MovieREST('', 'now_playing', '&language=en-US&page=1');
    }

    getTopRated(): Observable<any> {
        return this.MovieREST('', 'top_rated', '&language=en-US&page=1');
    }

    getGenere(): Observable<any> {
        return this._http.get('https://api.themoviedb.org/3/genre/movie/list?api_key='+this.ApiKey+'&language=en-US');
    }
}