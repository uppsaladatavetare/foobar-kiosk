import React, { PropTypes, Component } from 'react';

export default class AccountBar extends Component {
  render() {
    const {dispatch} = this.props;
    return (
      <div id="account">
        <div className="name">{this.props.name}</div>
        <div id="balance">Balance: <span>{this.props.balance}</span> kr</div>
      </div>
    );
  }
}

AccountBar.propTypes = {
  name: PropTypes.string,
  balance: PropTypes.string
};
