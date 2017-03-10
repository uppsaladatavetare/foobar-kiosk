export interface IAccount {
    id?: string;
    user_id: string;
    name: string;
    balance: number;
    token:string;
    request?: boolean;
    failed?: boolean;
    isComplete?:boolean;
    dispatch: Function;
}
