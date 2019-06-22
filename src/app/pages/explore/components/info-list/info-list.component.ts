import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Movie } from 'src/app/interfaces/movie.interface';

@Component({
  selector: 'app-info-list',
  templateUrl: './info-list.component.html',
  styleUrls: ['./info-list.component.scss'],
})
export class InfoListComponent implements OnInit {
  ngOnInit(): void {
    this.shallowCopy();
    console.log('STTTATAGG', this.shallowData);
  }

  @Input() data : any[];
  @Output() manageItem = new EventEmitter();
  shallowData : any[] = [];

  constructor() {
    
  }

  manageItemEvent(item) {
    this.manageItem.emit(item);
  }

  shallowCopy() {
    if (this.data.length > this.shallowData.length && this.shallowData.length > 10) {
      const temp = this.data.slice(0, 10);
      temp.filter(el => this.shallowData.push(el));
      this.data.splice(0, 10);
    }
    else {
      this.data.filter(el => this.shallowData.push(el));
      this.data = [];
    }
  }
}
