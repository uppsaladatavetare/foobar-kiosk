import * as React from 'react';
import { Box, Flex } from 'reflexbox';
import * as style from 'styles/common/Alert.scss';

interface IAlertProps {
    title: string;
    msg: string;
}

export default class Alert extends React.Component<IAlertProps> {
    render() {
        return (
            <Flex auto className={style.alert} column align='center' justify='center'>
                <Box className={style.icon}>
                    <span className="fa-stack fa-lg">
                      <i className="fa fa-circle-thin fa-stack-2x"></i>
                      <i className="fa fa-check fa-stack-1x"></i>
                    </span>
                </Box>
                <Box mt={2} className={style.title}>
                    {this.props.title}
                </Box>
                <Box mt={1} className={style.msg}>
                    {this.props.msg}
                </Box>
            </Flex>
        );
    }
}
