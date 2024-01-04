import * as React from "react";
import { computed } from "mobx";
import { observer } from "mobx-react";
import { style } from "typestyle";
import { Button } from "components/Button";
import { black } from "common/styling";
import { viewStore } from "store/ViewStore";
import { cartStore } from "store/CartStore";

const classNames = {
    sidebar: style({
        background: black,
        display: "flex",
        flexDirection: "column"
    }),
    up: style({
        marginBottom: "auto"
    }),
    down: style({
        marginTop: "auto"
    })
};

@observer
export class Sidebar extends React.Component {
    @computed
    get canScrollUp() {
        return viewStore.page > 0;
    }

    @computed
    get canScrollDown() {
        return viewStore.page < viewStore.maxPage;
    }

    @computed
    get hasSelection() {
        return cartStore.selection.length > 0;
    }

    increase = () => {
        cartStore.changeSelectionQty(1);
    }

    decrease = () => {
        cartStore.changeSelectionQty(-1);
    }

    remove = () => {
        cartStore.removeSelectedProducts();
    }

    scrollUp = () => {
        viewStore.changePage(-1);
    }

    scrollDown = () => {
        viewStore.changePage(1);
    }

    render() {
        return (
            <div className={classNames.sidebar}>
                <Button icon="chevron-up"
                        className={classNames.up}
                        onClick={this.scrollUp}
                        disabled={!this.canScrollUp}/>
                <Button icon="plus" disabled={!this.hasSelection} onClick={this.increase}/>
                <Button icon="minus" disabled={!this.hasSelection} onClick={this.decrease}/>
                <Button icon="trash" disabled={!this.hasSelection} onClick={this.remove}/>
                <Button icon="chevron-down"
                        className={classNames.down}
                        onClick={this.scrollDown}
                        disabled={!this.canScrollDown}/>
            </div>
        );
    }
}
