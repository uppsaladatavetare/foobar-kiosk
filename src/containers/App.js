import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  addProduct,
  removeProduct,
  selectProduct,
  increaseProductQty,
  changePage
} from '../actions/product';
import { login } from '../actions/account';
import { requestPurchase } from '../actions/purchase';
import ProductList from '../components/ProductList';
import PurchaseButton from '../components/PurchaseButton';
import AccountBar from '../components/AccountBar';
import ButtonBar from '../components/ButtonBar';


class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    //dispatch(login('154464990'));
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
    const { dispatch, products, account, purchase } = this.props;
    let selected = products.products.filter((p) => p.selected).length;
    if(purchase.started) {
      return (
        <div id="container">
          <ProductList
            products={products}
            onSelect={(ean) => dispatch(selectProduct(ean))}
          />
          <span id="trash" className="button"></span>
          <div id="sidebar">
            <AccountBar {...account} />
            <div id="menubox"></div>
            <PurchaseButton
              products={products}
              onPurchase={() => dispatch(requestPurchase())}
            />
          </div>
          <ButtonBar
            onIncrease={() => dispatch(increaseProductQty(1))}
            onDecrease={() => dispatch(increaseProductQty(-1))}
            onRemove={() => dispatch(removeProduct())}
            onScrollUp={() => this.addRandomProduct()}
            onScrollDown={() => dispatch(changePage(1))}
            active={selected > 0}
            scrollUpActive={products.page > 0}
            scrollDownActive={products.page < products.maxPage}
          />
        </div>
      );
    }
    else if(purchase.finalized) {
      return (
        <div id="container">
          <div id="start">
            <div>Total cost of purchase was {purchase.cost} kr.</div>
          </div>
        </div>
      );
    }
    else {
      return (
        <div id="container">
          <div id="start">
            <div>Blip a card linked with your account.</div>
            <div>or</div>
            <div>Scan a product to start cash payment.</div>
            <span className="button" onClick={() => dispatch(login('154464990'))}>I like pies</span>
          </div>
        </div>
      );
    }
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { products, account, purchase } = state;

  return {
    products,
    account,
    purchase
  };
}

export default connect(mapStateToProps)(App);
