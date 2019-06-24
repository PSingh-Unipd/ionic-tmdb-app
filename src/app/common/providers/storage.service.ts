import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { StorageItem } from 'src/app/interfaces/storage-item.interface';

/**
 * Storage service used to read and write data on/from local native storage
 */
@Injectable()
export class LocalStorageService {

    private data =  {
        movies: new BehaviorSubject<StorageItem[]>([]),
        tv :new BehaviorSubject<StorageItem[]>([]),
        cbluray :new BehaviorSubject<StorageItem[]>([]),
        cdvd :new BehaviorSubject<StorageItem[]>([])
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

    /**
     * All 4 arrays of data are loaded from local storage
     * @param _storage - DI of @ionic/storage service
     */
    constructor(private _storage: Storage) {
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
    }

    /**
     * Update shows watchlist on local storage
     * @param _value - array of shows
     */
    updateTvSeriesWL(_value: StorageItem[]) {
        this.data.tv.next(_value);
        this._storage.set('tvwl', _value);
    }
    
    /**
     * Update movies watchlist on local storage
     * @param _value - array of movies
     */
    updateMoviesWL(_value: StorageItem[]) {
        this.data.movies.next(_value);
        this._storage.set('mwl', _value);
    }

    /**
     * Update dvd collection list on local storage
     * @param _value - array of dvd collection items
     */
    updateCdvd(_value: StorageItem[]) {
        this.data.cdvd.next(_value);
        this._storage.set('cdvd', _value);
    }

    /**
     * Update bluray collection list on local storage
     * @param _value - array of bluray collection items
     */
    updateCbluray(_value: StorageItem[]) {
        this.data.cbluray.next(_value);
        this._storage.set('cbluray', _value);
    }

    /* notificationMovie(id: string, movieName: string) {
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
    } */

}