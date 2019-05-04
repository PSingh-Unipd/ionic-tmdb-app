import { Component, OnInit } from '@angular/core';
import { HomeService } from './home-service/home.service';
import { FormControl } from '@angular/forms';
import { switchMap, debounceTime, tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  results;
  searchResults;
  queryField: FormControl = new FormControl();
  constructor(private _homeService: HomeService) {
  }

  ngOnInit(): void {
    this._homeService.getMovies().subscribe(
      data => {
        this.results = data.results;
        console.log(this.results);
      }
    );
    this.queryField.valueChanges.pipe(
      debounceTime(1500),
      switchMap(
        queryField => this._homeService.search(queryField)
      )
    ).subscribe(response => {
      this.searchResults = response.results;
      console.log(this.searchResults);
    });
  }
}
