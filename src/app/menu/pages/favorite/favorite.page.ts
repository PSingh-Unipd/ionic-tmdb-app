import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/movie.interface';
import { Storage } from '@ionic/storage';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit {
  scandata;
  fml: Movie[] = [];
  loaded: boolean = false;
  filteredItems: any;
  filterVal: FormControl = new FormControl();
  constructor(
    private router: Router,
    private storage: Storage,
    private toastController: ToastController) { }

  ngOnInit() {

    this.filterVal.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(val => {
      this.filterItem(val);
    });

    this.storage.get('fml').then((elements) => {
      if (elements) {
        this.fml = elements;
        this.assignCopy();
        this.loaded = true;
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
    const temp = this.fml.splice(event.detail.from, 1)[0];
    this.fml.splice(event.detail.to, 0, temp);
    event.detail.complete();
    this.storage.set('fml', this.fml);
    this.assignCopy();
  }

  async presentToast(message:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 4000
    });
    toast.present().then(res => console.log(res));
  }

  removeFromList(index : number) {
    this.loaded = false;
    this.fml.splice(index, 1);
    this.storage.set('fml', this.fml);
    this.presentToast('Movie removed from favorites!');
    this.loaded = true;
  }  

  assignCopy() {
    this.filteredItems = Object.assign([], this.fml);
  }

  filterItem(value) {
    if (!value) {
      this.assignCopy();
    }
    this.filteredItems = Object.assign([], this.fml).filter(
      item => item.title.toLowerCase().indexOf(value.toLowerCase()) > -1
    )
  }

  reset(event) {
    this.assignCopy();
  }
}
