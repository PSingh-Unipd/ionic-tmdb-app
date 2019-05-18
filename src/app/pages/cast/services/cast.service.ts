import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class CastService {

    ApiKey: string = '29371e05e1dfa0327af74c0805fef777';

    constructor(private http: HttpClient) { }

    getDetails(id): Observable<any> {
        return this.http.get<any>('https://api.themoviedb.org/3/person/'+id+'?api_key='+this.ApiKey+'&language=en-US');
    }
}