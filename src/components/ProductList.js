import React, { PropTypes, Component } from 'react';
import Product from './Product';

export default class ProductList extends Component {
  render() {
    const {products} = this.props;
    if(products.products.length == 0) {
      return (
        <div id="purchase">
          <div className="info">Scan an item to make it a part of your purchase.</div>
        </div>
      );
    } else {
      let page = products.page;
      var containerStyle = {
        'transform': `translate(0, calc(${page} * -206px))`
      };
      return (
        <div id="purchase" style={containerStyle}>
          {products.products.map((product, index) =>
            <Product {...product} key={index}
              onSelect={this.props.onSelect} />
          )}
        </div>
      );
    }
  }
}

// ProductList.propTypes = {
//   products: PropTypes.array
// };
