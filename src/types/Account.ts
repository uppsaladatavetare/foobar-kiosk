import { observable, action, computed } from "mobx";

export interface IAccount {
    user_id: string;
    name: string;
    balance: number;
    token: string;
    id: string;
    is_complete: boolean;
}

export enum AccountState {
    FAILED,
    LOADING,
    LOADED
}

export class Account {
    readonly cardId: string;
    @observable userId: string = "";
    @observable name: string = "";
    @observable balance: number = 0;
    @observable token: string = "";
    @observable id: string = "";
    @observable isComplete: boolean = false;

    @observable private state: AccountState;

    constructor(cardId: string, account?: IAccount) {
        this.cardId = cardId;
        this.state = AccountState.LOADING;

        if (account) {
            this.populate(account);
        }
    }

    @computed
    get isLoaded() {
        return this.state === AccountState.LOADED;
    }

    @computed
    get isLoading() {
        return this.state === AccountState.LOADING;
    }

    @computed
    get failed() {
        return this.state === AccountState.FAILED;
    }

    @action
    populate(account: IAccount) {
        this.userId = account.user_id;
        this.name = account.name;
        this.balance = account.balance;
        this.token = account.token;
        this.id = account.id;
        this.isComplete = account.is_complete;

        this.state = AccountState.LOADED;
    }

    @action
    setFailed() {
        this.state = AccountState.FAILED;
    }
}
