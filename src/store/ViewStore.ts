import { observable, action, computed } from "mobx";
import { Popup, IPopup } from "types/Popup";
import { cartStore } from "store/CartStore";

class ViewStore {
    @observable page: number = 0;
    @observable productsPerRow: number = 3;
    @observable popups: Popup[] = [];

    constructor() {
        cartStore.products.observe((change) => {
            if (change.type === "delete") {
                this.changePage(0);
            }
        });
    }

    @computed
    get maxPage() {
        return Math.max(0, Math.ceil((cartStore.products.size - this.productsPerRow) / this.productsPerRow) - 1);
    }

    @action
    changePage(change: number) {
        this.page = Math.max(0, Math.min(this.page + change, this.maxPage));
    }

    @action
    showPopup(popup: IPopup) {
        this.popups.push(new Popup(popup));
    }

    @action
    closePopup(popup: Popup) {
        const index = this.popups.indexOf(popup);
        if (this.popups.length > 0) {
            if (popup.onClose) {
                popup.onClose();
            }
            this.popups.splice(index, 1);
        }
    }
}

export const viewStore = new ViewStore();
