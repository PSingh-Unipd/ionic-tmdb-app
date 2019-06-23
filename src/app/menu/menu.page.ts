import { Component } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage {
  selectedPath = '';
  constructor(private _router: Router) {
    this._router.events.subscribe(
      (event: RouterEvent) => this.selectedPath = event.url
    );
   }
}
