import * as React from "react";
import { observer } from "mobx-react";
import { style } from "typestyle";
import { Button } from "components/Button";
import { accountStore } from "store/AccountStore";
import { cartStore } from "store/CartStore";
import { black, white } from "common/styling";

const classNames = {
    devbar: style({
        display: "flex",
        alignItems: "center",
        color: white,
        fontSize: 22,
        textAlign: "left",
        height: 60,
        background: black,
        zIndex: 9,
        flexShrink: 0
    }),
    title: style({
        flex: 1,
        paddingLeft: 16
    })
};

const products = [
    {
        id: "6dd79b06-e5b4-4109-80fb-a212cafb7692",
        name: "PASTA FYRA OSTAR FRYST",
        code: "731050008885",
        price: 35
    }, {
        id: "df4791cb-23b9-467f-8346-9836e5feb13a",
        name: "SALTADE CHIPS",
        code: "7340083438677",
        price: 15
    }, {
        id: "2f51a767-f965-4b2e-8e19-7ab0ef7186d1",
        name: "ENERGY DRINK BURK",
        code: "7611612221351",
        price: 10
    }, {
        id: "bb410d65-c044-4a4d-9369-2236b35e79b8",
        name: "THAI KYCKLING KOKOSMJÖLK FRYST",
        code: "7310500114934",
        price: 35
    }, {
        id: "9916f5b0-51cb-4667-a37a-d66dc9391e69",
        name: "7UP BURK",
        code: "7310070765840",
        price: 10
    }, {
        id: "fbef9d4f-9120-499a-8e57-1e2551c15203",
        name: "DELICATOBOLL",
        code: "7315360010754",
        price: 7
    }, {
        id: "3bae6c4d-e72c-4bd5-b4ee-a748dc7fd0d1",
        name: "ZINGO CITRON/FLÄDER PET",
        code: "7310070000439",
        price: 12
    }
];

@observer
export class DevToolbar extends React.Component {
    addRandomProduct = () => {
        const product = products[Math.floor(Math.random() * products.length)];
        cartStore.cache.add(product.code, product, 5 * 60);
        cartStore.fetchProduct(product.code);
    }

    qrcode() {
        const account = accountStore.account;
        if (account && account.token) {
            const url = config.API.host + "/profile/" + account.token;
            return (
                <Button icon="qrcode" onClick={() => window.open(url)}/>
            );
        }
    }

    render() {
        return (
            <div className={classNames.devbar}>
                <div className={classNames.title}>{config.API.host}</div>
                {this.qrcode()}
                <Button icon="credit-card" onClick={() => accountStore.login("1337")}/>
                <Button icon="plus" onClick={this.addRandomProduct}/>
            </div>
        );
    }
}
