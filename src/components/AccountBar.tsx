import * as React from "react";

interface Props {
    id: number;
    name: string;
    balance: number;
}

export default class AccountBar extends React.Component<Props, {}> {
    render() {
        if (this.props.id == null) {
            return (
                <div id="account" className="single">
                    <div className="name">Paying with cash</div>
                </div>
            );
        } else {
            return (
                <div id="account">
                    <div className="name">{this.props.name}</div>
                    <div className="balance">Balance: {this.props.balance} kr</div>
                </div>
            );
        }
    }
}
