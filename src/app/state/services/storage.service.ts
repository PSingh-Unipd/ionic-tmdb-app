import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { from, Observable } from 'rxjs';
import { StorageData, StorageItem } from 'src/app/state/interfaces/local-storage.interfaces';

/**
 * Storage service used to read and write data on/from local native storage
 */
@Injectable()
export class LocalStorageProvaService {
    constructor(private _storage: Storage) {
    }

    loadData(): Observable<StorageData> {
        let data: StorageData = { mwl: [], cbluray: [], cdvd: [], tvwl: [], error: false };
        return from(Promise
            .all([this._storage.get('mwl'),
            this._storage.get('tvwl'),
            this._storage.get('cbluray'),
            this._storage.get('cdvd')])
            .then((result) => {
                data.mwl = result[0]? result[0] : [];
                data.tvwl = result[1]? result[1] : [];
                data.cbluray = result[2]? result[2] : [];
                data.cdvd = result[3]? result[3] : [];
                return data;
            })
            .catch(function (err) {
                data.error = true; //change state to true if error
                return data; //returning intialstate
            }));
    }

     /**
     * Update shows watchlist on local storage
     * @param _value - array of shows
     */
    updateTvSeriesWL(_value: StorageItem[]):Observable<boolean> {
        return from(this._storage.set('tvwl', _value).then(
            success => true,
            error => false
        ));
    }
    
    /**
     * Update movies watchlist on local storage
     * @param _value - array of movies
     */
    updateMoviesWL(_value: StorageItem[]):Observable<boolean> {
        return from(this._storage.set('mwl', _value).then(
            success => true,
            error => false
        ));
    }

    /**
     * Update dvd collection list on local storage
     * @param _value - array of dvd collection items
     */
    updateCdvd(_value: StorageItem[]):Observable<boolean> {
        return from(this._storage.set('cdvd', _value).then(
            success => true,
            error => false
        ));
    }

    /**
     * Update bluray collection list on local storage
     * @param _value - array of bluray collection items
     */
    updateCbluray(_value: StorageItem[]):Observable<boolean> {
        return from(this._storage.set('cbluray', _value).then(
            success => true,
            error => false
        ));
    }

}