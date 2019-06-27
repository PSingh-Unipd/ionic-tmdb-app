import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { LocalStorageService } from 'src/app/common/providers/storage.service';
import { StorageItem } from 'src/app/state/interfaces/local-storage.interfaces';
/**
 * Priveder service to manage all data for watchlist page. 
 * This service rappresent "Model" in Model-View-Controller pattern!
 */
@Injectable()
export class CollectionsService {

    private dataSource = new BehaviorSubject<StorageItem[]>([]);
    private listLoading = new BehaviorSubject<boolean>(true);
    loading = this.listLoading.asObservable();
    data = this.dataSource.asObservable();

    bluray: StorageItem[] = [];
    dvd: StorageItem[] = [];

    constructor(private _storage: LocalStorageService) {
        this._storage._oservables.cbluray.subscribe(
            data => {
                this.bluray = data;
                this.dataSource.next(this.bluray);
                this.listLoading.next(false);
            }
        );
        this._storage._oservables.cdvd.subscribe(
            data => this.dvd = data
        );
    }

    /**
     * Remove element from natice local storage
     * @param index - specific index of element in list to remove
     * @param type - type of item list (movie or show)
     */
    removeElement(index: number, type: string): string {
        if (type == 'bluray') {
            this.bluray.splice(index, 1);
            this._storage.updateCbluray(this.bluray);
            this.dataSource.next(this.bluray);
            return 'Element removed from your collection!';
        } else {
            this.dvd.splice(index, 1);
            this._storage.updateCdvd(this.dvd);
            this.dataSource.next(this.dvd);
            return 'Element removed from your collection!';
        }
    }

    /**
     * Update the list subject dipeding on param type
     * @param type can be movie or show
     */
    getListType(type: string): void {
        this.listLoading.next(true);
        type == "bluray" ? this.dataSource.next(this.bluray) : this.dataSource.next(this.dvd);
        setTimeout(() => this.listLoading.next(false), 300);
    }

    /**
     * Update a specific list in a local native storage!
     * @param list - list to update
     * @param type - type of list(movies or show)
     */
    updateList(list: StorageItem[], type: string): void {
        if (type == 'movie') {
            this.bluray = list;
            this._storage.updateMoviesWL(this.bluray);
        } else {
            this.dvd = list;
            this._storage.updateTvSeriesWL(this.dvd);
        }
    }
}