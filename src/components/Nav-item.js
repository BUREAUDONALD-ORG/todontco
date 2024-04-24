import React from "react";
import { Link } from "react-scroll";
import slugify from "slugify";

const ScrollLink = Link;

const NavItem = ({ product, toggleProducts, sticky }) => {
  return (
    <ScrollLink
      className="navbar__item"
      data-checked={product.checkbox.visible}
      activeClass="navbar__item--active"
      to={slugify(product.checkbox.title)}
      spy={true}
      smooth={true}
      offset={-200}
      duration={500}
      isDynamic
    >
      <h2 className="navbar__item-title">{product.checkbox.title}</h2>
      <h2 className="navbar__item-title navbar__item-title--responsive">
        {product.checkbox.smallText}
      </h2>
    </ScrollLink>
  );
};

export default NavItem;
