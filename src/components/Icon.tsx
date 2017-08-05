import * as React from 'react';
import * as classNames from 'classnames';

interface IIconProps {
    name: string;
    className?: string;
}

export default class Icon extends React.Component<IIconProps> {
    render() {
        const { name, className = "" } = this.props;

        return <i className={classNames('fa', 'fa-' + name, className)}/>;
    }
}
