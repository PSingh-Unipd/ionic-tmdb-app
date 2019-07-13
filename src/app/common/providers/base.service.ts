import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Base class, used by every provider service in this application.
 */
export class BaseService {

    /**
     * This is a public-api key(open for everyone),
     * you can get your key for free from https://www.themoviedb.org/
     * -> just register with a valid email and vualá
     */
    ApiKey = '29371e05e1dfa0327af74c0805fef777';
    languege = '&language=en-US';

    constructor(public http: HttpClient) { }

    /**
     * Generic method to get information about some specific element from TMDB
     * @param id - element ID
     * @param path - (movie, show. person)
     * @param type - (/videos, /credits, etc)
     */
    public detailsREST(id, path, type): Observable<any> {
        return this.http.get<any>('https://api.themoviedb.org/3/' + type + '/' + id + path + '?api_key=' + this.ApiKey + this.languege);
    }

    /**
     * Generic method to access the person REST service on TMDB
     * @param id - id of person(celebrity, producer, director, etc)
     * @param path - path of the information to read(changes, credits, images, etc)
     */
    public personREST(id, path): Observable<any> {
        return this.http.get<any>('https://api.themoviedb.org/3/person/' + id + path + '?api_key=' + this.ApiKey + this.languege);
    }

    /**
     * Generic search method, to serach movies or shows on TMDB database
     * @param str - value to search
     * @param params - extra params (number of pages, etc)
     * @param type - type of element to search(movie, show, person, all)
     */
    public searchREST(str, params, type): Observable<any> {
        return this.http.get<any>('https://api.themoviedb.org/3/search/' + type + '?api_key=' + this.ApiKey + this.languege + '&query=' + str + params);
    }

    /**
     * Generic method to get all the custom lists from TMDB
     * @param listID - list id
     */
    public listREST(listID): Observable<any> {
        return this.http.get<any>('https://api.themoviedb.org/3/list/' + listID + '?api_key=' + this.ApiKey + this.languege);
    }

    /**
     * Generic method to get everything about the season of specific tv-show
     * @param seasonNumber - number of season(1, 2, etc)
     * @param showId - show id
     */
    public seasonREST(seasonNumber, showId): Observable<any> {
        return this.http.get<any>('https://api.themoviedb.org/3/tv/' + showId + '/season/' + seasonNumber + '?api_key=' + this.ApiKey + this.languege);
    }
}
