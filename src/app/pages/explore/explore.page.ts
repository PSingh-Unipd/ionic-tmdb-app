import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { switchMap, debounceTime } from 'rxjs/operators';
import { ExploreService } from './services/explore.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {
  results;
  searchResults;
  trendings;
  queryField: FormControl = new FormControl();
  constructor(private _service: ExploreService) {
  }

  ngOnInit(): void {
    this._service.getMovies().subscribe(
      data => {
        this.results = data.results;
        console.log(this.results);
      }
    );

    this._service.getTV().subscribe(
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
}
