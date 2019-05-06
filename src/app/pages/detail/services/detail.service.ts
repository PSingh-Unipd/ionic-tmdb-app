import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class DetailService {

    ApiKey: string = '29371e05e1dfa0327af74c0805fef777';

    constructor(private http: HttpClient) { }

    getDetails(id): Observable<any> {
        return this.http.get<any>('https://api.themoviedb.org/3/movie/'+id+'?api_key='+this.ApiKey+'&language=en-US&page=1');
    }

    getVideos(id): Observable<any> {
        return this.http.get<any>('https://api.themoviedb.org/3/movie/'+id+'/videos?api_key='+this.ApiKey+'&language=en-US&page=1');
    }

    getCredits(id) {
        return this.http.get<any>('https://api.themoviedb.org/3/movie/'+id+'/credits?api_key='+this.ApiKey);
    }
    getCast() : Observable<any> {
        return null;
    }
}