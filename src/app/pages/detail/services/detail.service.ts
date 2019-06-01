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
    
    getDetails(id, type): Observable<any> {
        return this.DetailsREST(id, '', '&language=en-US&page=1', type);
    }

    getVideos(id, type): Observable<any> {
        return this.DetailsREST(id, '/videos', '&language=en-US&page=1', type);
    }

    getCredits(id, type) {
        return this.DetailsREST(id, '/credits', '', type);
    }

    getRecommendations(id, type) {
        return this.DetailsREST(id, '/recommendations', '&language=en-US&page=1', type);
    }
}