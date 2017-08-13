import * as React from "react";
import * as QRCode from "qrcode.react";
import { observer } from "mobx-react";
import { style } from "typestyle";
import { Account } from "types/Account";

const classNames = {
    qrcode: style({
        width: 216,
        height: 216,
        padding: 8,
        background: "#ffffff",
        boxShadow: "0 0 25px rgba(0, 0, 0, 0.4)",
        marginBottom: 16
    }),
    info: style({
        textAlign: "center"
    })
};

interface IProfilePopupProps {
    account: Account;
}

@observer
export class ProfilePopup extends React.Component<IProfilePopupProps> {
    render() {
        const url = config.API.host + "/profile/" + this.props.account.token;
        return (
            <div>
                <div className={classNames.qrcode}>
                    <QRCode size={200} value={url}/>
                </div>
                <div className={classNames.info}>
                    Scan the QRcode to<br />view or edit your profile
                </div>
            </div>
        );
    }
}
