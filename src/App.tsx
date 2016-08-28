declare const Thunder: any;

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as classNames from "classnames";
import { Provider, connect } from "react-redux";
import { IProduct } from "types";

import configureStore from "store/configureStore";
import { login } from "actions/account";
import { requestPurchase, clearPurchase, endPurchase } from "actions/purchase";
import { addProduct, removeProduct, selectProduct, increaseProductQty, changePage } from "actions/product";

import { Flex, Box } from "reflexbox";
import { ProductList, PurchaseButton, Account, Sidebar, LoadingBox, Button } from "components";

import * as style from "styles/App.scss";

interface IAppProps {
    dispatch: Function;
    products: {
        type: string;
        page: number;
        products: IProduct[];
        maxPage?: number;
    };
    account: any;
    purchase: any;
}

interface IThunder {
    channel: string;
    payload: string;
}

class App extends React.Component<IAppProps, {}> {
    addRandomProduct() {
        let codes = [
            "7310500088853",
            "7340083438684",
            "7611612221351",
            "7310500114934",
            "7310070765840",
            "7315360010754",
            "7622300342753"
        ];

        let randomIndex = Math.floor(Math.random() * codes.length);
        this.props.dispatch(addProduct(codes[randomIndex]));
    }

    componentDidMount() {
        const { dispatch } = this.props;

        // dispatch(login("154464990"));
        Thunder.connect("localhost:8080", "foobar", ["products", "cards"]);
        Thunder.listen((data: IThunder) => {
            if (data.channel === "products") {
                dispatch(addProduct(JSON.parse(data.payload)));
            } else if (data.channel === "cards") {
                dispatch(login(data.payload));
            }
        });
    }

    render() {
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
                        addRandomProduct={() => this.addRandomProduct()}
                        active={selected > 0}
                        scrollUpActive={products.page > 0}
                        scrollDownActive={products.page < products.maxPage}/>
                    <Flex column auto>
                        <ProductList
                            products={products}
                            onSelect={(code: string) => dispatch(selectProduct(code))}/>
                        <Flex>
                            <Account {...account} />
                            <PurchaseButton
                                products={products}
                                purchaseState={purchase.state}
                                accountBalance={account.balance}
                                onPurchase={() => dispatch(requestPurchase())}/>
                        </Flex>
                    </Flex>
                    <Button icon="times" alert className={style.quit} onClick={() => dispatch(clearPurchase())}/>
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
                    <Box py={1}>Thank you for you purchase</Box>
                    <Box py={1}><Button label="Okay" onClick={() => dispatch(endPurchase())}/></Box>
                </Flex>
            );
        } else /* if(purchase.state === "WAITING") */ {
            return (
                <Flex
                    column
                    align="center"
                    justify="center"
                    className={classNames(style.container, style.start)}>
                    <Box py={1}>Blip a card linked with your account</Box>
                    <Box py={1}>or</Box>
                    <Box py={1}>Scan a product to start a cash payment</Box>
                    {(process.env.NODE_ENV === "development" ? (
                        <Box py={1}><Button label="dev cash buy" onClick={() => this.addRandomProduct()}/></Box>
                    ) : undefined)}
                    {(process.env.NODE_ENV === "development" ? (
                        <Box py={1}>
                            <Button label="dev account buy" onClick={() => dispatch(login("154464990"))}/>
                        </Box>
                    ) : undefined)}
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
