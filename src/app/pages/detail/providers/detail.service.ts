import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { BaseService } from 'src/app/common/providers/base.service';
import { HttpClient } from '@angular/common/http';
import { SubjectElement } from 'src/app/interfaces/subject.interface';

@Injectable()
export class DetailService extends BaseService{

    private subjectValue = new BehaviorSubject<SubjectElement>(null);
    public _specInfo = this.subjectValue.asObservable();

    constructor(public http: HttpClient) { 
        super(http);
    }

    updateValue(_value: SubjectElement) {
        this.subjectValue.next(_value);
    }
    
    getDetails(id, type): Observable<any> {
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
    }
}