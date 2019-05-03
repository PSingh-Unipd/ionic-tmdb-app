import { Component, OnInit } from '@angular/core';
import { HomeService } from './home-service/home.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  results;
  queryField: FormControl = new FormControl();
  constructor(private _homeService: HomeService) {
  }

  ngOnInit(): void {
    this.queryField.valueChanges
      .subscribe(queryField => this._homeService.search(queryField).subscribe(response => 
        {
          this.results = response.results;
        console.log(this.results);
      }));
  }
}
