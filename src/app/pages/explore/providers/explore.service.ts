import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { BaseService } from 'src/app/common/providers/base.service';
import { LocalStorageService } from 'src/app/common/providers/storage.service';
import { map } from 'rxjs/operators';
import { StorageItem, StorageData } from 'src/app/state/interfaces/local-storage.interfaces';

/**
 * Serive to manage all data for explore page. 
 * This service rappresent "Model" in Model-View-Controller pattern!
 */
@Injectable()
export class ExploreService extends BaseService {

    private dataSource = new BehaviorSubject<any[]>([]);
    private listLoading = new BehaviorSubject<boolean>(true);
    loading = this.listLoading.asObservable();
    data = this.dataSource.asObservable();
    storageData: StorageData = { mwl: [], tvwl: [], cbluray: [], cdvd: [] };

    constructor(private _http: HttpClient, private _storage: LocalStorageService) {
        super(_http);

        this._storage._oservables.movies.subscribe(
            data => this.storageData.mwl = data
        );
        this._storage._oservables.cbluray.subscribe(
            data => this.storageData.cbluray = data
        );
        this._storage._oservables.cdvd.subscribe(
            data => this.storageData.cdvd = data
        );
        this._storage._oservables.tv.subscribe(
            data => this.storageData.tvwl = data
        );
        this.getDefaultList('now_playing', 'movie');
    }

    /**
     * Search a movie or show by given string on TMDB
     * @param queryString - value to search
     * @param type - movie or tv 
     */
    search(queryString: string, type: string): Observable<any> {
        return this.searchREST(queryString, '&page=1&include_adult=false', type).pipe(
            map(res => type != 'movie' ? res.results.filter(el => {
                el.title = el.name;
                el.release_date = el.first_air_date;
                return el;
            }) : res.results)
        );
    }

    /**
     * Load simple movies or shows lists from TMDB
     * @param listName - list name/id to load
     * @param catagory - type of list = movie or tv show
     */
    getDefaultList(listName: string, catagory: string): void {
        this.listLoading.next(true);

        this.detailsREST('', listName, catagory).subscribe(
            res => {
                const list: any[] = res.results;
                if (catagory == 'tv') {
                    list.filter(el => el.title = el.name);
                }
                this.dataSource.next(list);
                this.listLoading.next(false);
            }
        );
    }

    /**
     * Load custom(made by users) movies or shows list from TMDB
     * @param listName - list name/id to load
     * @param tv - type of list = movie or tv show
     */
    getCustomList(listName: string, tv?: boolean): void {
        this.listLoading.next(true);

        this.listREST(listName).subscribe(
            res => {
                const list: any[] = res.items;
                if (tv) {
                    list.filter(el => el.title = el.name);
                }
                this.dataSource.next(list);
                this.listLoading.next(false);
            }
        );
    }

    /**
     * Add new item to watchlist in local native
     * @param item - item containing the informations(must contain title, id and poster url)
     * @param type - type of item (movie or show)
     */
    addMyWatchList(item, type: string): string {
        const tempItem: StorageItem = {
            title: item.title,
            id: item.id,
            poster: item.poster_path ? item.poster_path : null,
            date: new Date()
        };
        if (type == 'movie') {
            if (this.storageData.mwl.find(el => el.id == tempItem.id) == null) {
                this.storageData.mwl.unshift(tempItem);
                this._storage.updateMoviesWL(this.storageData.mwl);
                return 'Movie added to your Watchlist';
            } else {
                return 'Movie already present in your Watchlist!';
            }
        }
        else {
            if (this.storageData.tvwl.find(el => el.id == tempItem.id) == null) {
                this.storageData.tvwl.unshift(tempItem);
                this._storage.updateTvSeriesWL(this.storageData.tvwl);
                return 'Show added to your Watchlist';
            } else {
                return 'Show already present in your Watchlist!';
            }
        }
    }

    /**
     * Add new item to blu-ray collection in native local storage
     * @param item - item containing the informations(must contain title, id and poster url)
     * @param type - type of item (movie or show)
     */
    addBlurayCollection(item, type: string): string {
        const tempItem: StorageItem = {
            title: item.title,
            id: item.id,
            poster: item.poster_path ? item.poster_path : null,
            date: new Date(),
            type: type == 'movie' ? 'movie' : 'show'
        };
        if (this.storageData.cbluray.find(el => el.id == tempItem.id) == null) {
            this.storageData.cbluray.unshift(tempItem);
            this._storage.updateCbluray(this.storageData.cbluray);
            return 'Element added to your Bluray collection!';
        } else {
            return 'Element already present in your Bluray collection!';
        }
    }

    /**
     * Add new item to dvd collection in native local storage
     * @param item - item containing the informations(must contain title, id and poster url)
     * @param type - type of item (movie or show)
     */
    addDvdCollection(item, type: string): string {
        const tempItem: StorageItem = {
            title: item.title,
            id: item.id,
            poster: item.poster_path ? item.poster_path : null,
            date: new Date(),
            type: type == 'movie' ? 'movie' : 'show'
        };
        if (this.storageData.cdvd.find(el => el.id == tempItem.id) == null) {
            this.storageData.cdvd.unshift(tempItem);
            this._storage.updateCdvd(this.storageData.cdvd);
            return 'Element added to your Dvd collection!';
        } else {
            return 'Element already present in your Dvd collection!';
        }
    }
}