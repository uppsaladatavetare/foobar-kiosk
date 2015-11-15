import React, { PropTypes, Component } from 'react';

export default class PurchaseButton extends Component {
  render() {
    const {products} = this.props.products;
    let total = products
      .filter((p) => !p.loading)
      .map((p) => p.price * p.qty).reduce((x, y) => x + y, 0);
    return (
      <span id="buy" className={total > 0 ? 'button active' : 'button'} href="#">
        {total} kr <i className="fa fa-shopping-cart"></i>
      </span>
    );
  }
}

// PurchaseButton.propTypes = {
//   products: PropTypes.array
// };
