import React from "react";

export default class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tapped: false,
    };
  }

  animate = (e) => {
    this.setState({ tapped: true }, () => {
      setTimeout(() => {
        this.setState({ tapped: false });
      }, 100);
    });
  };

  render() {
    let { product, toggleProducts, disabled, ...rest } = this.props;
    return (
      <div
        className="checkbox"
        data-tapped={this.state.tapped}
        onClick={!disabled ? toggleProducts.bind(this, product) : this.animate}
        role="presentation"
        {...rest}
      >
        <input
          className="checkbox__input"
          type="checkbox"
          value={product.checkbox.visible ? product.checkbox.visible : 0}
        />
        <label className="checkbox__label" disabled={disabled}>
          <div className="checkbox__icon-container">
            <p className="checkbox__number">
              {product.checkbox.visible > 0 && product.checkbox.visible}
            </p>
          </div>
          <div className="checkbox__content">
            <h3 className="checkbox__title">{product.checkbox.title}</h3>
            <h3 className="checkbox__text">{product.checkbox.text}</h3>
          </div>
        </label>
      </div>
    );
  }
}
