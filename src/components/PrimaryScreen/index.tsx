import * as React from "react";
import * as classNames from "classnames";
import * as QRCode from "qrcode.react";
import { IAppProps } from "types";

import { login, clearAccount } from "actions/account";
import { requestPurchase, endPurchase, viewProfileQR, cancelPurchase } from "actions/purchase";
import { addProduct, removeProduct, selectProduct, increaseProductQty, changePage } from "actions/product";

import { Flex, Box } from "reflexbox";
import { ProductList, PurchaseButton, Account, Sidebar, LoadingBox, Button } from "components";
import * as style from "styles/primary/App.scss";

export default class PrimaryScreen extends React.Component<IAppProps> {
    componentDidMount() {
        const { dispatch } = this.props;

        Thunder.connect(config.THUNDER.host, config.THUNDER.key, ["products", "cards"]);
        Thunder.listen((data) => {
            if (data.channel === "products") {
                dispatch(addProduct(JSON.parse(data.payload)));
            } else if (data.channel === "cards") {
                dispatch(login(data.payload));
            }
        });
    }

    render() {
        const { dispatch, products, account, purchase } = this.props;

        const selected = products.products.filter((product) => product.selected).length;

        if (purchase.state === "ONGOING" || purchase.state === "PENDING") {
            return (
                <Flex className={style.container}>
                    <Sidebar
                        onIncrease={() => dispatch(increaseProductQty(1))}
                        onDecrease={() => dispatch(increaseProductQty(-1))}
                        onRemove={() => dispatch(removeProduct())}
                        onScrollUp={() => dispatch(changePage(-1))}
                        onScrollDown={() => dispatch(changePage(1))}
                        active={selected > 0}
                        scrollUpActive={products.page > 0}
                        scrollDownActive={products.page < (products.maxPage || 0)}/>
                    <Flex column auto>
                        <ProductList
                            products={products}
                            onSelect={(code: string) => dispatch(selectProduct(code))}/>
                        <Flex>
                            <Account account={account} viewProfileQR={() => dispatch(viewProfileQR())}/>
                            <PurchaseButton
                                products={products}
                                purchaseState={purchase.state}
                                accountBalance={account.balance}
                                onPurchase={() => dispatch(requestPurchase())}/>
                        </Flex>
                    </Flex>
                    <Button icon="times" alert className={style.quit} onClick={() => dispatch(cancelPurchase())}/>
                    {(purchase.state === "PENDING" ? <LoadingBox/> : undefined)}
                </Flex>
            );
        } else if (purchase.state === "ONGOING") {
            return (
                <Flex className={classNames(style.container, style.white)}>
                    <LoadingBox/>
                </Flex>
            );
        } else if (purchase.state === "FINALIZED") {
            return (
                <Flex
                    column
                    align="center"
                    justify="center"
                    className={classNames(style.container, style.start)}>
                    <Box py={1}>Total cost of the purchase was {purchase.cost} kr</Box>
                    <Box py={1}>Thank you for your purchase</Box>
                    <Box py={1}><Button label="Okay" onClick={() => dispatch(endPurchase())}/></Box>
                </Flex>
            );
        } else if (account.failed) {
            return (
                <Flex
                    column
                    align="center"
                    justify="center"
                    className={classNames(style.container, style.start)}>
                    <Box py={1}>This card is not registered</Box>
                    <Box py={1}>Ask someone to create register it for you!</Box>
                    <Box py={1}><Button label="Okay" onClick={() => dispatch(clearAccount())}/></Box>
                </Flex>
            );
        } else if (purchase.state === "PROFILE") {
            const url = config.API.host + "/profile/" + account.token;
            return (
                <Flex
                    align="center"
                    justify="center"
                    className={classNames(style.container, style.start)}>
                    <Button icon="times" alert className={style.quit} onClick={() => dispatch(login(account.card_id))}/>
                    <Box className={style.qrcode}>
                        <QRCode size={200} value={url}/>
                    </Box>
                    <Box p={3}><p>Scan the QRcode to<br />view and edit your profile.</p></Box>
                </Flex>);
        } else {
            return (
                <Flex
                    column
                    align="center"
                    justify="center"
                    className={classNames(style.container, style.start)}>
                    <Box py={1}>Blip a card linked with your account</Box>
                    <Box py={1}>or</Box>
                    <Box py={1}>Scan a product to start a cash payment</Box>
                    {(account.request ? <LoadingBox/> : undefined)}
                    {(account.request ? <Box className={style.overlay}/> : undefined)}
                </Flex>
            );
        }
    }
}
