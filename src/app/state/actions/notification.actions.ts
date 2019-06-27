import { createAction } from '@ngrx/store';

export const LoadingAction = createAction(
    '[Notifications] loading state change action',
    (payload: boolean) => {
        return ({ payload });
    }
);

export const MessageAction = createAction(
    '[Notifications] show message action',
    (payload: string) => {
        return ({ payload });
    }
);
