import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  addProduct,
  removeProduct,
  selectProduct,
  increaseProductQty
} from '../actions';
import ProductList from '../components/ProductList';
import PurchaseButton from '../components/PurchaseButton';
import AccountBar from '../components/AccountBar';


class App extends Component {
  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
  }

  addRandomProduct() {
    var eans = [
      '7310500088853',
      '7340083438684',
      '7611612221351',
      '7310500114934',
      '7310070765840',
      '7315360010754',
      '7622300342753'
    ];

    var randomIndex = Math.floor(Math.random() * eans.length);
    this.props.dispatch(addProduct(eans[randomIndex]));
  }

  render() {
    const { dispatch, products } = this.props;
    return (
      <div id="container">
        <ProductList products={products}
                     onSelect={(ean) => dispatch(selectProduct(ean))} />
            <span id="trash" className="button"></span>
            <div id="sidebar">
                <AccountBar name="Krzysztof" balance="0" />
                <div id="menubox"></div>
                <PurchaseButton products={products} />
            </div>
            <div id="edit">
                <span className="button scroll up" onClick={(e) => this.addRandomProduct()}><i className="fa fa-chevron-up"></i></span>
                <div className="container">
                    <span className="button plus"
                          onClick={(e) => dispatch(increaseProductQty(1))}>
                      <i className="fa fa-plus"></i>
                    </span>
                    <span className="button minus"
                          onClick={(e) => dispatch(increaseProductQty(-1))}>
                      <i className="fa fa-minus"></i>
                    </span>
                    <span className="button trash"
                          onClick={(e) => dispatch(removeProduct())}>
                      <i className="fa fa-trash"></i>
                    </span>
                </div>
                <span className="button scroll down">
                  <i className="fa fa-chevron-down"></i>
                </span>
            </div>
        </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { products } = state;

  return {
    products
  };
}

export default connect(mapStateToProps)(App);
