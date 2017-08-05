import { IAccount } from "types/Account";
import { IProduct } from "types/Product";
import { IPurchaseState } from "reducers";

export interface IAppProps {
    dispatch: Function;
    products: {
        type: string;
        page: number;
        products: IProduct[];
        maxPage?: number;
    };
    account: IAccount;
    purchase: IPurchaseState;
}
