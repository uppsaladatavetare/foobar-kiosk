declare const Thunder: any;

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as classNames from "classnames";
import { Provider, connect } from "react-redux";
import { IProduct, IAccount } from "types";

import configureStore from "store/configureStore";
import { login, clearAccount } from "actions/account";
import { requestPurchase, endPurchase, viewProfileQR, cancelPurchase } from "actions/purchase";
import { addProduct, removeProduct, selectProduct, increaseProductQty, changePage } from "actions/product";

import { Flex, Box } from "reflexbox";
import { ProductList, PurchaseButton, Account, Sidebar, LoadingBox, Button, DevToolbar } from "components";
import * as style from "styles/App.scss";

//Require since qrcode.react does not have support for new javascript "import"
var QRCode = require('qrcode.react');

interface IAppProps {
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

interface IThunder {
    channel: string;
    payload: string;
}

class App extends React.Component<IAppProps, {}> {
    componentDidMount() {
        const { dispatch } = this.props;

        Thunder.connect(process.env.THUNDER.host, process.env.THUNDER.key, ["products", "cards"]);
        Thunder.listen((data: IThunder) => {
            if (data.channel === "products") {
                dispatch(addProduct(JSON.parse(data.payload)));
            } else if (data.channel === "cards") {
                dispatch(login(data.payload));
            }
        });
    }

    render() {
        if (process.env.NODE_ENV == 'development') {
            return (
                <div>
                    <DevToolbar
                        dispatch={this.props.dispatch}
                    />
                    {this.renderApp()}
                </div>
            );
        }
        return this.renderApp();
    }

    renderApp() {
        const { dispatch, products, account, purchase } = this.props;

        let selected = products.products.filter((product: any) => {
            return product.selected;
        }).length;

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
                        scrollDownActive={products.page < products.maxPage}/>
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
            var url = process.env.API.host + "/profile/" + account.token;
            return (
                <Flex
                    align="center"
                    justify="center"
                    className={classNames(style.container, style.start)}>
                    <Button icon="times" alert className={style.quit} onClick={() => dispatch(login(account.card_id))}/>
                    <Box>
                        <div className={style.qrcode}>
                            <QRCode size="200" value={url} className={style.qrcode} />
                        </div>
                    </Box>
                    <Box p={3}><p>Scan the QRcode to<br />view and edit your profile.</p></Box>
                </Flex>);
        }else {
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

function mapStateToProps(state: any) {
    const { products, account, purchase } = state;

    return {
        products,
        account,
        purchase
    };
}

const store = configureStore();
const AppWithState = connect(mapStateToProps)(App);

ReactDOM.render((
    <Provider store={store}>
        <AppWithState/>
    </Provider>
), document.getElementById("app"));
