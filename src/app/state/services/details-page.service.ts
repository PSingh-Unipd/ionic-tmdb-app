import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, forkJoin } from 'rxjs';
import { BaseService } from 'src/app/common/providers/base.service';
import { HttpClient } from '@angular/common/http';
import { DetailsElement } from 'src/app/state/interfaces/details.interfaces';
import { DetailsPageData } from '../interfaces/details-page.interface';
import { map } from 'rxjs/operators';

/**
 * Service to read all the information about movie or show
 * It extends the BaseService class
 */
@Injectable()
export class DetailsPageService extends BaseService {

    constructor(public http: HttpClient) {
        super(http);
    }

    getDetails(id: string, type: string): Observable<DetailsPageData> {
        return forkJoin(
            this.detailsREST(id, '', type),
            this.detailsREST(id, '/videos', type),
            this.detailsREST(id, '/credits', type),
            this.detailsREST(id, '/recommendations', type)
        ).pipe(
            map(([details, videos, credits, recommendations ]) => {
                let temp: DetailsPageData = {
                    detail: details,
                    credits: credits,
                    videos: videos,
                    recommendations: recommendations
                };
                return temp;
            })
        );
    }


/*getDetails(id, type): Observable<any> {
    return this.detailsREST(id, '', type);
}

getVideos(id, type): Observable<any> {
    return this.detailsREST(id, '/videos', type);
}

getCredits(id, type) {
    return this.detailsREST(id, '/credits', type);
}

getRecommendations(id, type) {
    return this.detailsREST(id, '/recommendations', type);
}*/
}