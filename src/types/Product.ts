export interface IProductState {
    type: string;
    page: number;
    products: IProduct[];
    maxPage?: number;
}

export interface IProduct {
    id: string;
    name: string;
    code: string;
    description: string;
    image: string;
    price: number;
    active: boolean;
    qty: number;
    loading?: boolean;
    failed?: boolean;
    selected?: boolean;
}
