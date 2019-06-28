import { createAction } from '@ngrx/store';

export const MessageAction = createAction(
    '[Notifications] show message action',
    (payload: string) => {
        return ({ payload });
    }
);
