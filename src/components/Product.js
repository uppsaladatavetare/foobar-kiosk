import React, { PropTypes, Component } from 'react';
import selectProduct from '../actions';

export default class Product extends Component {
  render() {
    const {dispatch} = this.props;
    if(this.props.loading) {
      return (
          <product className="loading">
            <div className="rekt1"/>
            <div className="rekt2"/>
            <div className="rekt3"/>
            <div className="rekt4"/>
            <div className="rekt5"/>
          </product>
      );
    } else if(this.props.failed) {
      return (
        <product className="message">
          <div>Unknown item</div>
        </product>
      );
    } else {
      return (
          <product className={this.props.selected && 'selected'}
                   onClick={(e) => this.props.onSelect(this.props.ean)}>
            <cell className="image">
              <img src={this.props.image} alt="" />
            </cell>
            <cell className="name">{this.props.name}</cell>
            <cell className="quantity">{this.props.qty} x</cell>
            <cell className="price">{this.props.price} kr</cell>
            <cell className="overlay"/>
          </product>
      );
    }
  }
}

Product.propTypes = {
  name: PropTypes.string
};
