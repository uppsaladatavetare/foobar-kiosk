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
import {
  requestPurchase,
  clearPurchase,
  endPurchase
} from '../actions/purchase';
import ProductList from '../components/ProductList';
import PurchaseButton from '../components/PurchaseButton';
import AccountBar from '../components/AccountBar';
import ButtonBar from '../components/ButtonBar';
import LoadingBox from '../components/LoadingBox';

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    //dispatch(login('154464990'));
    Thunder.connect("localhost:8080",
      "foobar", ["products", "cards"]);
    Thunder.listen(function(data) {
      if(data.channel == "products") {
        dispatch(addProduct(JSON.parse(data.payload)));
      } else if(data.channel == "cards") {
        dispatch(login(data.payload));
      }
    });
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
    if((purchase.state == 'ONGOING' || purchase.state == 'PENDING')) {
      return (
        <div id="container">
          <ProductList
            products={products}
            onSelect={(ean) => dispatch(selectProduct(ean))}
          />
          <span id="trash" className="button" onClick={() => dispatch(clearPurchase())}>
            <i className="fa fa-times"></i>
          </span>
          <span style={{ position:'absolute', bottom:0, zIndex: 99 }} className="button" onClick={() => this.addRandomProduct()}>
            <i className="fa fa-plus"></i>
          </span>
          <div id="sidebar">
            <AccountBar {...account} />
            <div id="menubox"></div>
            <PurchaseButton
              products={products}
              purchaseState={purchase.state}
              accountBalance={account.balance}
              onPurchase={() => dispatch(requestPurchase())}
            />
          </div>
          <ButtonBar
            onIncrease={() => dispatch(increaseProductQty(1))}
            onDecrease={() => dispatch(increaseProductQty(-1))}
            onRemove={() => dispatch(removeProduct())}
            onScrollUp={() => dispatch(changePage(-1))}
            onScrollDown={() => dispatch(changePage(1))}
            active={selected > 0}
            scrollUpActive={products.page > 0}
            scrollDownActive={products.page < products.maxPage}
          />
          <LoadingBox/>
        </div>
      );
    }
    else if(purchase.state == 'ONGOING') {
      return (
        <div id="container" className="white">
          <div className="loading">
            <div className="rekt1"/>
            <div className="rekt2"/>
            <div className="rekt3"/>
            <div className="rekt4"/>
            <div className="rekt5"/>
          </div>
        </div>
      );
    }
    else if(purchase.state == 'FINALIZED') {
      return (
        <div id="container">
          <div id="start">
            <div>Total cost of purchase was {purchase.cost} kr.</div>
            <span className="button" onClick={() => dispatch(endPurchase())}>Okay</span>
          </div>
        </div>
      );
    }
    else /* if(purchase.state == 'WAITING') */ {
      return (
        <div id="container">
          <div id="start">
            <div>Blip a card linked with your account.</div>
            <div>or</div>
            <div>Scan a product to start a cash payment.</div>
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
