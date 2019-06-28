import { StorageData } from './local-storage.interfaces';
import { DetailsPageState } from './details-page.interface';

export interface AppState {
    LocalStorage: StorageData;
    Details: DetailsPageState;
    Notifications: string;
    /*ExplorePage: ExplorePageData;
    PersonDetails: PersonPageData;
    lodaing: boolean;
    showMessages: string;*/
}