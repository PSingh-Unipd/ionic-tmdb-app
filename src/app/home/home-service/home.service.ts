import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HomeService {
  ApiKey : string = '29371e05e1dfa0327af74c0805fef777';
  url: string = 'https://api.themoviedb.org/3/search/movie?api_key='+this.ApiKey+'&language=en-US&query=';
  constructor(private http: HttpClient) { }
  search(queryString: string): Observable<any> {
      let realUrl = this.url + queryString+'&page=1&include_adult=true';
      return this.http.get<any>(realUrl);
  }
}