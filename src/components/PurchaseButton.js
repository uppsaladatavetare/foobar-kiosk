import React, { PropTypes, Component } from 'react';

export default class PurchaseButton extends Component {
  render() {
    const {
      products,
      purchaseState,
      accountBalance,
      onPurchase
    } = this.props;
    let total = products.products
      .filter((p) => !p.loading)
      .map((p) => p.price * p.qty).reduce((x, y) => x + y, 0);

    if(purchaseState == 'ONGOING') {
      if(total > 0 && (total <= accountBalance || !accountBalance)) {
        var buttonClass = 'active';
      } else if(total > 0 && total > accountBalance) {
        var buttonClass = 'alert';
      }
    }

    return (
      <span id="buy" className={'button ' + buttonClass}
      onClick={buttonClass == 'active' ? onPurchase : null}>
        {total} kr <i className="fa fa-shopping-cart"></i>
      </span>
    );
  }
}

PurchaseButton.propTypes = {
  /* products: PropTypes.array, */
  onPurchase: PropTypes.func
};
