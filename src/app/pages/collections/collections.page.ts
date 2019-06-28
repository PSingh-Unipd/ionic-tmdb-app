import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CollectionsService } from './providers/collections.service';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController, ActionSheetController } from '@ionic/angular';
import { debounceTime } from 'rxjs/operators';
import { StorageItem } from 'src/app/state/interfaces/local-storage.interfaces';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.page.html',
  styleUrls: ['./collections.page.scss'],
})
export class CollectionsPage implements OnInit {

  filterVal: FormControl = new FormControl();
  selected: string = 'bluray';
  data: StorageItem[] = [];
  filteredItems: StorageItem[];
  loading: boolean = true;
  searchResults: any[];
  reorder: boolean = true;
  loadNoData: boolean = false;

  constructor(private _service: CollectionsService,
    private router: Router,
    private _alertController: AlertController,
    private _actionSheetController: ActionSheetController) { 
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

  removeFromList(index: number) {
    this.presentToast(this._service.removeElement(index, this.selected));
  }

  showDetails(item: StorageItem) {
    const navigationExtras: NavigationExtras = {
      state: {
        id: item.id,
        type: item.type
      }
    };
    this.router.navigate(['/details'], navigationExtras);
  }

  async presentToast(message: string) {
    const alert = await this._alertController.create({
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async manageItem(item) {
    const actionSheet = await this._actionSheetController.create({
      header: item.title.toUpperCase(),
      buttons: [
        {
          text: 'Details',
          icon: 'information-circle',
          handler: () => {
            this.showDetails(item);
          }
        }, {
          text: 'Remove item from list',
          icon: 'trash',
          handler: () => {
            this.removeFromList(item);
          }
        }, 
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
    });
    await actionSheet.present();
  }
}
