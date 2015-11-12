import React, { PropTypes, Component } from 'react';
import Product from './Product';

export default class ProductList extends Component {
  render() {
    const {products} = this.props;
    return (
      <div id="purchase">
        {products.products.map((product, index) =>
          <Product {...product} key={index}
                   onSelect={this.props.onSelect} />
        )}
      </div>
    );
  }
}

// ProductList.propTypes = {
//   products: PropTypes.array
// };
