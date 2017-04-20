import { IAccount } from "types/Account";
import { IProduct } from "types/Product";

export interface IAppProps {
    dispatch: Function;
    products: {
        type: string;
        page: number;
        products: IProduct[];
        maxPage?: number;
    };
    account: IAccount;
    purchase: any;
}

export interface IThunder {
    channel: string;
    payload: string;
}
