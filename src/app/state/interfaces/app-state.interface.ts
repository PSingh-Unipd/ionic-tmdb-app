import { StorageData } from './local-storage.interfaces';
import { DetailsPageState } from './details-page.interface';
import { ExplorePageState } from './explore-page.interface';
import { CastPageState } from './cast-page.interface';
import { InfoPageState } from './info-page.inteface';

export interface AppState {
    LocalStorage: StorageData;
    Details: DetailsPageState;
    Notifications: string;
    Explore: ExplorePageState;
    Cast: CastPageState,
    Info: InfoPageState
}