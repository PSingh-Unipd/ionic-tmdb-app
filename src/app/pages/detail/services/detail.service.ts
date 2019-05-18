import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { BaseService } from 'src/app/common/base.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DetailService extends BaseService{

    public dataSource = new BehaviorSubject<String>('');
    _id = this.dataSource.asObservable();

    constructor(public http: HttpClient) { 
        super(http);
    }
    
    getDetails(id): Observable<any> {
        return this.MovieREST(id, '', '&language=en-US&page=1');
    }

    getVideos(id): Observable<any> {
        return this.MovieREST(id, '/videos', '&language=en-US&page=1');
    }

    getCredits(id) {
        return this.MovieREST(id, '/credits', '');
    }

    getRecommendations(id) {
        return this.MovieREST(id, '/recommendations', '&language=en-US&page=1');
    }
}