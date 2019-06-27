import { StorageData } from './local-storage.interfaces';
import { ExplorePageData } from './explore-page.interface';
import { PersonPageData } from './person-page.interface';
import { DetailsPageData } from './details-page.interface';
import { Notifications } from './notification.interface';

export interface AppState {
    LocalStorage: StorageData;
    Details: DetailsPageData;
    Notifications: Notifications;
    /*ExplorePage: ExplorePageData;
    PersonDetails: PersonPageData;
    lodaing: boolean;
    showMessages: string;*/
}