import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { BaseService } from 'src/app/common/services/base.service';

@Injectable()
export class ExploreService extends BaseService {

    private dataSource = new BehaviorSubject<any[]>([]);
    data = this.dataSource.asObservable();

    private listLoading = new BehaviorSubject<boolean>(true);
    loading = this.listLoading.asObservable();

    constructor(private _http: HttpClient) {
        super(_http);
        this.getDefaultList('now_playing', 'movie');
    }

    search(queryString: string): Observable<any> {
        return this.SearchREST(queryString, '&page=1&include_adult=false', 'movie');
    }

    getDefaultList(listName: string, catagory: string): void {
        this.listLoading.next(true);

        this.DetailsREST('', listName, catagory).subscribe(
            res => {
                const list: any[] = res.results;
                if (catagory == 'tv') {
                    list.filter(el => el.title = el.name);
                }
                this.dataSource.next(list);
                this.listLoading.next(false);
            }
        );
    }

    getCustomList(list): Observable<any> {
        return this.ListREST(list);
    }

}