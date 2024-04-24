import React from "react";
import { Link } from "react-scroll";
import arrow from "../../static/img/arrow.png";

const ScrollLink = Link;

const Button = ({ text, link, images, diapositive, size }) => {
  return (
    <a
      className="btn"
      href={link}
      data-size={size}
      data-diapositive={diapositive}
    >
      <p className="btn__text">{text}</p>
    </a>
  );
};

const ButtonPoint = ({ text, link }) => {
  return (
    <ScrollLink
      rel="noopener noreferrer"
      target="_blank"
      to={link}
      smooth={true}
      offset={-190}
      duration={500}
      className="btn"
      data-type="point"
    >
      <p className="btn__text">{text}</p>
      <img className="btn__arrow" src={arrow} alt="arrow" />
    </ScrollLink>
  );
};

const ButtonLarge = ({ text, link, handler }) => {
  return (
    <a className="btn" data-type="large" href={link} onClick={handler}>
      <p className="btn__text">{text}</p>
    </a>
  );
};

const ButtonImage = ({ text, link, images }) => {
  return (
    <a className="btn" data-type="image" href={link}>
      <img className="btn__img" src={images.normal.relativePath} alt="" />
      <img
        className="btn__img btn__img--hover"
        src={images.inverse.relativePath}
        alt=""
      />
      <p className="btn__text">{text}</p>
    </a>
  );
};

const buttonSelector = (props) => {
  if (props.type === "point") return <ButtonPoint {...props} />;
  if (props.type === "image") return <ButtonImage {...props} />;
  if (props.type === "large") return <ButtonLarge {...props} />;
  return <Button {...props} />;
};

export default buttonSelector;
