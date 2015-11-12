import React, { PropTypes, Component } from 'react';

export default class ButtonBar extends Component {
  render() {
    const {
      onIncrease,
      onDecrease,
      onRemove,
      onScrollUp,
      onScrollDown,
      active
    } = this.props;

    return (
      <div id="edit" className={active && "active"}>
        <span className="button scroll up" onClick={onScrollUp}>
          <i className="fa fa-chevron-up"></i>
        </span>
        <div className="container">
            <span className="button plus" onClick={onIncrease}>
              <i className="fa fa-plus"></i>
            </span>
            <span className="button minus" onClick={onDecrease}>
              <i className="fa fa-minus"></i>
            </span>
            <span className="button trash" onClick={onRemove}>
              <i className="fa fa-trash"></i>
            </span>
        </div>
        <span className="button scroll down" onClick={onScrollDown}>
          <i className="fa fa-chevron-down"></i>
        </span>
      </div>
    );
  }
}

ButtonBar.propTypes = {
  onIncrease: PropTypes.func,
  onDecrease: PropTypes.func,
  onRemove: PropTypes.func,
  onScrollUp: PropTypes.func,
  onScrollDown: PropTypes.func,
  active: PropTypes.bool
};
