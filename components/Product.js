import React, { PropTypes, Component } from 'react';
import selectProduct from '../actions';

export default class Product extends Component {
  render() {
    const {dispatch} = this.props;
    return (
      <colu className={this.props.selected ? 'selected' : ''} onClick={(e) => this.props.onSelect(this.props.ean)}>
        <cell className="image"><img src={this.props.image} alt="" /></cell>
        <cell className="name">{this.props.name || 'Loading'}</cell>
        <cell className="quantity">{this.props.qty} x</cell>
        <cell className="price"><span>{this.props.price} kr</span></cell>
        <div className="overlay"></div>
      </colu>
    );
  }
}

Product.propTypes = {
  name: PropTypes.string
};
