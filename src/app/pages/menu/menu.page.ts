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
      title: 'Movies',
      url: '/menu/explore'
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
