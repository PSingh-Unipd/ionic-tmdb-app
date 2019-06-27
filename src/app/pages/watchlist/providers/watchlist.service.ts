import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { LocalStorageService } from 'src/app/common/providers/storage.service';
import { StorageItem } from 'src/app/state/interfaces/local-storage.interfaces';
/**
 * Priveder service to manage all data for watchlist page. 
 * This service rappresent "Model" in Model-View-Controller pattern!
 */
@Injectable()
export class WatchListService {

    private dataSource = new BehaviorSubject<StorageItem[]>([]);
    private listLoading = new BehaviorSubject<boolean>(true);
    loading = this.listLoading.asObservable();
    data = this.dataSource.asObservable();

    movies: StorageItem[] = [];
    shows: StorageItem[] = [];

    constructor(private _storage: LocalStorageService) {
        this._storage._oservables.movies.subscribe(
            data => {
                this.movies = data;
                this.dataSource.next(this.movies);
                this.listLoading.next(false);
            }
        );
        this._storage._oservables.tv.subscribe(
            data => this.shows = data
        );
    }

    /**
     * Remove element from natice local storage
     * @param index - specific index of element in list to remove
     * @param type - type of item list (movie or show)
     */
    removeElement(index: number, type: string): string {
        if (type == 'movie') {
            this.movies.splice(index, 1);
            this._storage.updateMoviesWL(this.movies);
            this.dataSource.next(this.movies);
            return 'Movie removed from your Watchlist!';
        } else {
            this.shows.splice(index, 1);
            this._storage.updateTvSeriesWL(this.shows);
            this.dataSource.next(this.shows);
            return 'Show removed from your Watchlist!';
        }
    }

    /**
     * Update the list subject dipeding on param type
     * @param type can be movie or show
     */
    getListType(type: string): void {
        this.listLoading.next(true);
        type == "movie" ? this.dataSource.next(this.movies) : this.dataSource.next(this.shows);
        setTimeout(() => this.listLoading.next(false), 300);
    }

    /**
     * Update a specific list in a local native storage!
     * @param list - list to update
     * @param type - type of list(movies or show)
     */
    updateList(list: StorageItem[], type: string): void {
        if (type == 'movie') {
            this.movies = list;
            this._storage.updateMoviesWL(this.movies);
        } else {
            this.shows = list;
            this._storage.updateTvSeriesWL(this.shows);
        }
    }
}