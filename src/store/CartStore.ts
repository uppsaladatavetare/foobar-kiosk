import { apiCall } from "common/api";
import { observable, action, computed } from "mobx";
import { Cache } from "common/Cache";
import { Product, IProduct } from "types/Product";

class CartStore {
    cache = new Cache<IProduct>();
    products = observable.map<Product>();

    @computed
    get selection() {
        const selection: Product[] = [];

        this.products.forEach((product) => {
            if (product.selected) {
                selection.push(product);
            }
        });

        return selection;
    }

    @action
    clearProducts() {
        this.products.clear();
    }

    @action
    selectProduct(code: string) {
        const product = this.products.get(code);

        if (product) {
            product.toggleSelection();
        }
    }

    @action
    changeSelectionQty(change: number) {
        this.selection.forEach((product) => {
            product.changeQty(change);

            if (product.qty === 0) {
                this.products.delete(product.code);
            }
        });
    }

    @action
    removeSelectedProducts() {
        this.selection.forEach((product) => {
            this.products.delete(product.code);
        });
    }

    @action
    fetchProduct(code: string) {
        if (this.products.has(code)) {
            const product = this.products.get(code);

            if (product && !product.failed) {
                product.changeQty(1);
            }
        } else if (this.cache.hasKey(code)) {
            const data = this.cache.get(code);
            if (data) {
                this.products.set(code, new Product(code, data));
            }
        } else {
            const product = new Product(code);
            this.products.set(code, product);

            apiCall(`/products/?code=${code}`)
                .then((response: any) => response.json())
                .then(action((data: IProduct[]) => {
                    if (data.length) {
                        product.populate(data[0]);
                        this.cache.add(code, data[0], 5 * 60);
                    } else {
                        product.setFailed();
                    }
                }))
                .catch((data: any) => {
                    product.setFailed();
                    setTimeout(() => {
                        this.products.delete(code);
                    }, 5000);
                });
        }
    }
}

export const cartStore = new CartStore();
