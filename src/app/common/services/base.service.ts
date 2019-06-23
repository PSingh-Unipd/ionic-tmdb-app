import { HttpClient } from '@angular/common/http';

/* This class rappresent base informations used in every service in this application.
   All service use this endpoint in the API for reading all the informations, with different path in most cases! */
export class BaseService {

    /* This is a public-api key(open for everyone), 
    you can get your key for free from https://www.themoviedb.org/ 
    -> just register with a valid email and vualá */
    ApiKey: string = '29371e05e1dfa0327af74c0805fef777';
    languege: string = '&language=en-US';

    constructor(public http: HttpClient) { }

    public DetailsREST(id, path, type) {
        return this.http.get<any>('https://api.themoviedb.org/3/'+type+'/'+id+path+'?api_key='+this.ApiKey+this.languege);
    }

    public PersonREST(id, path) {
        return this.http.get<any>('https://api.themoviedb.org/3/person/'+id+path+'?api_key='+this.ApiKey+this.languege);
    }

    public SearchREST(str, params, type) {
        return this.http.get<any>('https://api.themoviedb.org/3/search/'+type +'?api_key='+this.ApiKey+this.languege+'&query='+str+params);
    }

    public ListREST(listID) {
        return this.http.get<any>('https://api.themoviedb.org/3/list/'+listID+'?api_key='+this.ApiKey+this.languege);
    }

    public SeasonREST(seasonNumber, showId) {
        return this.http.get<any>('https://api.themoviedb.org/3/tv/'+ showId +'/season/'+ seasonNumber +'?api_key='+this.ApiKey+this.languege);
    }

}