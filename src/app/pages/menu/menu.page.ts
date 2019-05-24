import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  pages = [
    {
      title: 'Scan Barcode',
      url: '/menu/scan',
      icon: 'search'
    },
    {
      title: 'Explore Movies',
      url: '/menu/explore',
      icon: 'film'
    },
    {
      title: 'My Watchlist',
      url: '/menu/list',
      icon: 'time'
    },
    {
      title: 'My Favorites',
      url: '/menu/favorite',
      icon: 'heart'
    }
  ];

  selectedPath = '';
  constructor(private _router: Router) {
    this._router.events.subscribe(
      (event: RouterEvent) => this.selectedPath = event.url
    );
   }

  ngOnInit() {
  }
}
