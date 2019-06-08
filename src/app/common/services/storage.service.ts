import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { Movie } from 'src/app/interfaces/movie.interface';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';

@Injectable()
export class LocalStorageService {

    private notfications: any[];

    private data =  {
        movies: new BehaviorSubject<Movie[]>([]),
        tv :new BehaviorSubject<Movie[]>([]),
        cbluray :new BehaviorSubject<Movie[]>([]),
        cdvd :new BehaviorSubject<Movie[]>([])
    }

    private loadings = {
        movies: new BehaviorSubject<boolean>(false),
        tv: new BehaviorSubject<boolean>(false),
        cdvd: new BehaviorSubject<boolean>(false),
        cbluray: new BehaviorSubject<boolean>(false)
    };

    public _oservables = {
        movies: this.data.movies.asObservable(),
        moviesLoading: this.loadings.movies.asObservable(),
        tv: this.data.tv.asObservable(),
        tvLoading: this.loadings.tv.asObservable(),
        cbluray: this.data.cbluray.asObservable(),
        cblurayLoading: this.loadings.cbluray.asObservable(),
        cdvd: this.data.cdvd.asObservable(),
        cdvdLoading: this.loadings.cdvd.asObservable()
    }

    constructor(private _storage: Storage,
        private localNotifications: LocalNotifications) {

        this._storage.get('tvwl').then((elements) => {
            if (elements) {
                this.data.tv.next(elements);
            }
            this.loadings.tv.next(true);
        });

        this._storage.get('mwl').then((elements) => {
            if (elements) {
                this.data.movies.next(elements);
            }
            this.loadings.movies.next(true);
        });

        this._storage.get('cbluray').then((elements) => {
            if (elements) {
                this.data.cbluray.next(elements);
            }
            this.loadings.cbluray.next(true);
        });

        this._storage.get('cdvd').then((elements) => {
            if (elements) {
                this.data.cdvd.next(elements);
            }
            this.loadings.cdvd.next(true);
        });

        this._storage.get('noty').then((elements) => {
            if (elements) {
                this.notfications = elements;
            }
        });
    }

    updateTvSeriesWL(_value: Movie[]) {
        this.data.tv.next(_value);
        this._storage.set('tvwl', _value);
    }
    
    updateMoviesWL(_value: Movie[]) {
        this.data.movies.next(_value);
        this._storage.set('mwl', _value);
    }

    updateCdvd(_value: Movie[]) {
        this.data.cdvd.next(_value);
        this._storage.set('cdvd', _value);
    }

    updateCbluray(_value: Movie[]) {
        this.data.cbluray.next(_value);
        this._storage.set('cbluray', _value);
    }

    notificationMovie(id: string, movieName: string) {
        this.localNotifications.schedule({
            id: Number(id),
            title: 'Film in uscita oggi',
            text: 'Il film' + movieName + ' presente nella tua lista è in uscita oggi nelle sale, non perderlo!',
            trigger: { every: ELocalNotificationTriggerUnit.MINUTE },
            foreground: true
        });
    }

    clearOldNotifications() {
        if (this.notfications.length > 0) {
            this.notfications = this.notfications.filter(el => this.getDateFormat(el.date) != this.getDateFormat(new Date()));
        }
    }

    getDateFormat(date: Date) {
        return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
    }

}