declare const Thunder: any;

import * as React from 'react';
import { IAppProps, IThunder } from 'types';

import { Flex, Box } from 'reflexbox';
import Cart from './Cart';
import Alert from 'components/Alert';
import * as style from 'styles/secondary/App.scss';

export default class SecondaryScreen extends React.Component<IAppProps, {}> {
    componentDidMount() {
        const { dispatch } = this.props;

        Thunder.connect(process.env.THUNDER.host, process.env.THUNDER.key, ['state']);
        Thunder.listen((data: IThunder) => {
            dispatch({'type': '_LOAD_STATE', 'data': JSON.parse(data.payload)});
        });
    }

    renderCart() {
        const { purchase, products, account } = this.props;

        if (purchase.state === 'FINALIZED') {
            return (
                <Flex className={style.receiptContainer}>
                    <Alert title="Thanks for the purchase!"
                           msg={`The total cost was ${purchase.cost} kr.`} />
                </Flex>
            );

        } else if (purchase.state === 'ONGOING' || purchase.state === 'PENDING') {
            return (
                <Flex className={style.receiptContainer}>
                    <Cart products={products} account={account} />
                </Flex>
            );
        }
    }

    render() {
        return (
            <Flex auto className={style.container}>
                {this.renderCart()}
                <Flex p={1} auto className={style.banner}>
                    <Box>
                        <img src={require('../../../static/ud.svg')} />
                    </Box>
                </Flex>
            </Flex>
        );
    }
}
