import { observable, action, computed } from "mobx";

export interface IProduct {
    id: string;
    name: string;
    code: string;
    price: number;
    active?: boolean;
    image?: string | null;
    description?: string | null;
}

export enum ProductState {
    FAILED,
    LOADING,
    LOADED
}

export class Product {
    readonly code: string;
    @observable id: string = "";
    @observable name: string = "";
    @observable price: number = 0;
    @observable qty: number = 0;
    @observable active: boolean = false;
    @observable image?: string | null = null;
    @observable description?: string | null = null;

    @observable selected: boolean = false;
    @observable state: ProductState;

    constructor(code: string, product?: IProduct) {
        this.code = code;
        this.state = ProductState.LOADING;

        if (product) {
            this.populate(product);
        }
    }

    @computed
    get isLoaded() {
        return this.state === ProductState.LOADED;
    }

    @computed
    get isLoading() {
        return this.state === ProductState.LOADING;
    }

    @computed
    get failed() {
        return this.state === ProductState.FAILED;
    }

    @action
    populate(product: IProduct) {
        this.id = product.id;
        this.name = product.name;
        this.price = product.price;
        this.qty = 1;
        this.active = product.active || false;
        this.image = product.image && config.API.host + product.image;
        this.description = product.description;

        this.state = ProductState.LOADED;
    }

    @action
    changeQty(change: number) {
        if (this.isLoaded) {
            this.qty = Math.max(0, this.qty + change);
        }
    }

    @action
    toggleSelection() {
        if (this.isLoaded) {
            this.selected = !this.selected;
        }
    }

    @action
    setFailed() {
        this.state = ProductState.FAILED;
    }
}
