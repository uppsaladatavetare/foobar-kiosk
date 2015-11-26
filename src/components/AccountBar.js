import React, { PropTypes, Component } from 'react';

export default class AccountBar extends Component {
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

AccountBar.propTypes = {
  name: PropTypes.string,
  balance: PropTypes.number
};
