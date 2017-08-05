import * as React from 'react';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { IProductState, IAccount } from 'types';
import Product from './Product';
import Icon from 'components/Icon';

import { Box, Flex } from 'reflexbox';

import * as style from 'styles/secondary/components/Cart.scss';

interface ICartProps {
    products: IProductState;
    account: IAccount;
}

export default class Cart extends React.Component<ICartProps> {
    render() {
        const total = this.props.products.products.filter((product) => {
            return !product.loading && !product.failed;
        }).map((product) => {
            return product.price * product.qty;
        }).reduce((x, y) => x + y, 0);
        const accountIcon = this.props.account.name ? 'user-circle-o' : 'money';

        return (
            <Flex column className={style.container}>
                <Box>
                    <Flex className={style.bar} px={2} align="center" auto>
                        <Flex auto>
                            <Icon name="shopping-cart" />
                            <Box ml={2}>Your shopping cart</Box>
                        </Flex>
                    </Flex>
                </Box>
                <Flex auto pt={1} pr={1}>
                    <Box>
                        {this.renderProducts()}
                    </Box>
                </Flex>
                <Box>
                    <Flex className={style.bar} px={2} align="center" auto>
                        <Icon name={accountIcon} />
                        <Box auto ml={2}>{this.props.account.name || 'Cash payment'}</Box>
                        <Box>Total: <strong>{total} kr</strong></Box>
                    </Flex>
                </Box>
            </Flex>
        );
    }

    renderProducts() {
        const { products } = this.props;
        if (products.products.length > 0) {
            const content = products.products.map((product) => {
                return <Product {...product} key={product.code} />;
            });

            return (
                <ReactCSSTransitionGroup
                    component='div'
                    className={style.products}
                    transitionName="product"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}>
                    {content}
                </ReactCSSTransitionGroup>
            );
        } else {
            return (
                <Flex align="center" justify="center">
                    <Box>Your cart is empty.</Box>
                </Flex>
            );
        }
    }
}
