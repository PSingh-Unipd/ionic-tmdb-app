import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from 'src/app/common/base.service';
import { Observable } from 'rxjs/internal/Observable';

/* Using a native http ionic module for this service. 
Becase the API digit-eyes don't use cors in header! */
import { HTTP } from '@ionic-native/http/ngx';

@Injectable()
export class ScanService extends BaseService {

    constructor(private _http: HttpClient, private ihttp: HTTP) {
        super(_http);
    }

    scanSearch(code, key) {
        /* Not a valid key -> digit-eyes is a private API -> If you need a key you have to pay for it  */
        return this.ihttp.get('https://digit-eyes.com/gtin/v2_0/?upc_code='+code+'&app_key=/3FPYTl2PTmb&signature='+key+'&language=en&field_names=description', {}, {});
    }

    search(queryString: string): Observable<any> {
        return this.SearchREST(queryString, '&language=en-US&query=', '&page=1&include_adult=false', 'movie');
    }
}