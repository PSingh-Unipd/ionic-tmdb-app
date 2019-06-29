import { StorageData } from './local-storage.interfaces';
import { DetailsPageState } from './details-page.interface';
import { ExplorePageState } from './explore-page.interface';

export interface AppState {
    LocalStorage: StorageData;
    Details: DetailsPageState;
    Notifications: string;
    Explore: ExplorePageState;
    /*PersonDetails: PersonPageData;
    lodaing: boolean;
    showMessages: string;*/
}