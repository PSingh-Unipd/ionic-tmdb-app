import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from 'src/app/common/base.service';
import { HTTP } from '@ionic-native/http/ngx';
import { Observable } from 'rxjs/internal/Observable';


@Injectable()
export class ScanService extends BaseService {

    constructor(private _http: HttpClient, private ihttp: HTTP) {
        super(_http);
    }

    scanSearch(code, key) {
        /*const httpOptions = {
            headers: new HttpHeaders({
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json; charset=ISO-8859-1'
            }),
            withCredentials: true 
          };*/
        return this.ihttp.get('https://digit-eyes.com/gtin/v2_0/?upc_code='+code+'&app_key=/3FPYTl2PTmb&signature='+key+'&language=en&field_names=description', {}, {});
        //return this._http.get(, httpOptions);
    }

    search(queryString: string): Observable<any> {
        return this.SearchREST(queryString, '&language=en-US&query=', '&page=1&include_adult=false');
    }
}