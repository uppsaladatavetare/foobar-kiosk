import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';

export default class ButtonBar extends Component {
  render() {
    const {
      onIncrease,
      onDecrease,
      onRemove,
      onScrollUp,
      onScrollDown,
      scrollUpActive,
      scrollDownActive,
      active
    } = this.props;

    var scrollUpClasses = classNames({
      'button': true,
      'scroll': true,
      'up': true,
      'active': scrollUpActive,
    });

    var scrollDownClasses = classNames({
      'button': true,
      'scroll': true,
      'down': true,
      'active': scrollDownActive,
    });

    return (
      <div id="edit" className={active && "active"}>
        <span className={scrollUpClasses} onClick={onScrollUp}>
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
        <span className={scrollDownClasses} onClick={onScrollDown}>
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
