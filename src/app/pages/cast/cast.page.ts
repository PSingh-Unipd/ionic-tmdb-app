import { Component, OnInit } from '@angular/core';
import { ElementType } from 'src/app/state/interfaces/element-type.interface';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/interfaces/app-state.interface';
import { getCastPageData } from 'src/app/state/selectors/app.selector';
import { CastPageData } from 'src/app/state/interfaces/cast-page.interface';
import { LoadDetailsAction } from 'src/app/state/actions/details-page.action';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cast',
  templateUrl: './cast.page.html',
  styleUrls: ['./cast.page.scss'],
})
export class CastPage implements OnInit {
  loading = false;
  castData: CastPageData;
  constructor(
    private router: Router,
    public store: Store<{ appState: AppState }>,
    private location: Location) { }

  ngOnInit() {
    this.store.select(getCastPageData).subscribe(value => {
      this.loading = value.isLoading;
      this.castData = value.data;
    });
  }

  close() {
    this.location.back();
  }

  getDetails(item, type) {
    const temp: ElementType = { id: item.id, type };
    this.store.dispatch(LoadDetailsAction(temp));
    this.router.navigate(['/details']);
  }
}
