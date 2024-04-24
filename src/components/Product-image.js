import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";

const ProductImage = ({ diapositive, images, layout }) => {
  let currImage =
    images && window.innerWidth < 800
      ? images.mobile?.childImageSharp.gatsbyImageData
      : !diapositive
      ? images.default?.childImageSharp.gatsbyImageData
      : images.diapositive?.childImageSharp.gatsbyImageData;

  let imageStyle = {
    width: "unset",
    ...(layout === "horizontal-right" && {
      left: "unset",
      right: 0,
    }),
  };

  return (
    <div className="product__image">
      {currImage && (
        <GatsbyImage
          image={currImage}
          className="product__image-inner"
          // outerWrapperClassName="product__image-outer"
          imgStyle={window.innerWidth > 800 ? imageStyle : {}}
          alt=""
        />
      )}
    </div>
  );
};

export default ProductImage;
