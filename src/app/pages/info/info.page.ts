import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/interfaces/app-state.interface';
import { getInfoPageData } from 'src/app/state/selectors/app.selector';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {
  season: any;
  loading = true;
  constructor(
    private location: Location,
    public store: Store<{ appState: AppState }>
  ) { }

  ngOnInit() {
    this.store.select(getInfoPageData).subscribe(
      value => {
        this.season = value.data;
        this.loading = value.isLoading;
      }
    );
  }

  close() {
    this.location.back();
  }
}
