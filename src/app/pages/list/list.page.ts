import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  constructor(private storage: Storage) { }

  ngOnInit() {
    this.storage.get('mwl').then((elements) => {
      console.log(elements? elements: 'not found');
    })
  }

}
