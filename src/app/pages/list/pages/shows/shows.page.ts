import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Movie } from 'src/app/interfaces/Movie.interface';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-shows',
  templateUrl: './shows.page.html',
  styleUrls: ['../../list.page.scss'],
})
export class ShowsPage implements OnInit {

  filterVal: FormControl = new FormControl();
  tvwl: Movie[] = [];
  loaded: boolean = false;
  filteredItems: any;

  constructor(
    private router: Router,
    private storage: Storage,
    public toastController: ToastController) { }

  ngOnInit() {
    this.filterVal.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(val => {
      this.filterItem(val);
    });

    this.storage.get('tvwl').then((elements) => {
      if (elements) {
        this.tvwl = elements;
        this.loaded = true;
        this.assignCopy();
      }
    });
  }

  async movieDetails(item: Movie) {
    const navigationExtras: NavigationExtras = {
      state: {
        id: item.id
      }
    };
    this.router.navigate(['/menu/details'], navigationExtras);
  }

  reorderItems(event) {
    const temp = this.tvwl.splice(event.detail.from, 1)[0];
    this.tvwl.splice(event.detail.to, 0, temp);
    event.detail.complete();
    this.storage.set('tvwl', this.tvwl);
    this.assignCopy();
  }

  reset(event) {
    this.assignCopy();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 4000
    });
    toast.present().then();
  }

  removeFromList(index: number) {
    this.loaded = false;
    this.tvwl.splice(index, 1);
    this.storage.set('tvwl', this.tvwl);
    this.presentToast('Movie removed from Watchlist!');
    this.loaded = true;
  }

  assignCopy() {
    this.filteredItems = Object.assign([], this.tvwl);
  }

  filterItem(value) {
    if (!value) {
      this.assignCopy();
    }
    this.filteredItems = Object.assign([], this.tvwl).filter(
      item => item.title.toLowerCase().indexOf(value.toLowerCase()) > -1
    )
  }

}
