export interface IAccount {
    id?: string;
    user_id: string;
    name: string;
    balance: number;
    token: string;
    request?: boolean;
    failed?: boolean;
    is_complete?: boolean;
    dispatch: Function;
    card_id: string;
}
