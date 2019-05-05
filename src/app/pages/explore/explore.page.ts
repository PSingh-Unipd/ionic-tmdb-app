import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { switchMap, debounceTime } from 'rxjs/operators';
import { ExploreService } from './services/explore.service';
import { Storage } from '@ionic/storage';
import { Movie } from 'src/app/interfaces/movie.interface';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {
  results: any[];
  searchResults: any[];
  trendings: any[];
  mwl: Movie[] = []; // My Watchlist -> Read from local storage all film in my list
  queryField: FormControl = new FormControl();
  constructor(
    private _service: ExploreService,
    private _storage: Storage) {}

  ngOnInit(): void {
    this._storage.get('mwl').then((elements) => {
      console.log(elements);
      if(elements) {
        this.mwl = elements;
      }
    })

    this._service.getMovies().subscribe(
      data => {
         this.results = data.results;
      }
    );

    this._service.getTopRated().subscribe(
      response => {
        console.log('Stampa del trandin reponse', response);
        this.trendings = response.results;
      }
    );
    this.queryField.valueChanges.pipe(
      debounceTime(1500),
      switchMap(
        queryField => this._service.search(queryField)
      )
    ).subscribe(response => {
      this.searchResults = response.results;
      console.log(this.searchResults);
    });
  }

  // Add movie to my mwl variabile in local storage
  addMyWatchList(item): void {
    const movie: Movie = {title : item.title, id: item.id, poster: item.poster_path? item.poster_path :  null};
    
    if(this.mwl.find(el => el.id == movie.id) == null) {
      console.log('Stampo la lista per primo' , this.mwl);
      this.mwl.push(movie); 
      this._storage.set('mwl', this.mwl);
    } 
  }
}
