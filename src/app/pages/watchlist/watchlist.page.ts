import { Component, OnInit, OnDestroy } from '@angular/core';
import { WatchListService } from './providers/watchlist.service';
import { StorageItem } from 'src/app/interfaces/storage-item.interface';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: './watchlist.page.html',
  styleUrls: ['./watchlist.page.scss'],
})
export class WatchListPage implements OnInit, OnDestroy{
  filterVal: FormControl = new FormControl();
  selected: string = 'movie';
  data: StorageItem[] = [];
  filteredItems: StorageItem[];
  loading: boolean = true;
  searchResults: any[];
  reorder: boolean = true;
  loadNoData: boolean = false;

  constructor(private _service: WatchListService,
    private router: Router,
    public _alertController: AlertController) { 
    }

  ngOnInit(): void {
    this.filterVal.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(val => {
      this.filterItem(val);
    });
    this._service.loading.subscribe(
      value => {
        this.loading = value;
      }
    );
    this._service.data.subscribe(
      data => {
        this.data = data;
        if (this.data.length > 0) {
          this.loadNoData = false;
        } if (this.data.length == 0) {
          this.loadNoData = true;
        }
        this.assignCopy();
      }
    );
  }

  doRefresh(event) {
    setTimeout(() => {
      this._service.getListType(this.selected);
      event.target.complete();
    }, 400);
  }

  ngOnDestroy(): void {
    this.selected = null;
    this.data = null;
    this.filteredItems = null;
    this.loading = null;
    this.searchResults = null;
    this.reorder = null;
    this.loadNoData = null;
  }

  updateSelected(): void {
    this._service.getListType(this.selected);
  }

  reorderList(): void {
    this.assignCopy();
    this.reorder = !this.reorder;
  }

  assignCopy() {
    this.filteredItems = Object.assign([], this.data);
  }

  filterItem(value) {
    if (!value) {
      this.assignCopy();
    }
    this.filteredItems = Object.assign([], this.data).filter(
      item => item.title.toLowerCase().indexOf(value.toLowerCase()) > -1
    )
  }

  reset(event) {
    this.assignCopy();
  }

  reorderItems(event) {
    this.filterVal.setValue('');
    const temp = this.data.splice(event.detail.from, 1)[0];
    this.data.splice(event.detail.to, 0, temp);
    event.detail.complete();
    this._service.updateList(this.data, this.selected);
    this.assignCopy();
  }

  removeFromList(index: number) {
    this.presentToast(this._service.removeElement(index, this.selected));
  }

  showDetails(item: StorageItem) {
    const navigationExtras: NavigationExtras = {
      state: {
        id: item.id,
        type: this.selected == 'movie' ? 'movie' : 'show'
      }
    };
    this.router.navigate(['/menu/details'], navigationExtras);
  }

  async presentToast(message: string) {
    const alert = await this._alertController.create({
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
