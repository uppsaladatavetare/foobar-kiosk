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
        const bg = require('../../../static/openhack-bg.jpg');
        const bannerStyle = {
            backgroundImage: `url(${bg})`
        };
        var QRCode = require('qrcode.react');
        return (
            <Flex auto className={style.container}>
                {this.renderCart()}
                <Flex auto className={style.banner} style={bannerStyle} column={true}>

                    <Flex p={2} mb={4} className={style.ctaWrapper}>
                        <Box className={style.cta}>REGISTER TODAY!</Box>
                    </Flex>
                    <Flex p={1} align={"center"}>
                        <Box  mr={3}>
                            <div className={style.qrcode}>
                                <QRCode size={275} value={'http://uppsala.openhack.io/'} />
                            </div>
                        </Box>
                        <Box>
                            <img height={300} src={require('../../../static/openhack.svg')} />
                        </Box>
                    </Flex>
                </Flex>
            </Flex>
        );
    }
}
