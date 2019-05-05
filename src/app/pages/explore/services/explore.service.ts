import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ExploreService {

    ApiKey: string = '29371e05e1dfa0327af74c0805fef777';

    constructor(private http: HttpClient) { }

    search(queryString: string): Observable<any> {
        let realUrl = 'https://api.themoviedb.org/3/search/movie?api_key=' + this.ApiKey + '&language=en-US&query=' + queryString + '&page=1&include_adult=true';
        return this.http.get<any>(realUrl);
    }

    getMovies(): Observable<any> {
        return this.http.get<any>('https://api.themoviedb.org/3/movie/now_playing?api_key='+this.ApiKey+'&language=en-US&page=1');
    }

    getTopRated(): Observable<any> {
        return this.http.get<any>('https://api.themoviedb.org/3/movie/top_rated?api_key=29371e05e1dfa0327af74c0805fef777&language=en-US&page=1');
    }
}