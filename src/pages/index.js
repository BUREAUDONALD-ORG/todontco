import React from "react";
import Layout from "../components/Layout";
import { graphql } from "gatsby";

import slugify from "slugify";
import stableSort from "stable";
import { Link } from "react-scroll";

import NavItem from "../components/Nav-item.js";
import Checkbox from "../components/Checkbox.js";
import Button from "../components/Button.js";
import Form from "../components/Form.js";
import ProductImage from "../components/Product-image.js";

import line from "../../static/img/line.png";
import lineHz from "../../static/img/line-hz.png";
import lineShort from "../../static/img/line-short.png";

import ctaTitle from "../../static/img/IYD_Title.svg";
import ctaImg from "../../static/img/Free_Book_Mockup_no_shadow.png";

const ScrollLink = Link;
export default class indexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: this.props.data.products.edges,
      initialProducts: JSON.parse(
        JSON.stringify(this.props.data.products.edges)
      ).sort((a, b) => {
        return a.node.frontmatter.id > b.node.frontmatter.id;
      }),
      scroll: { resizeHeader: false, position: 0 },
    };
  }

  toggleProducts = (product, sticky, e) => {
    let count = this.countSelectedProducts();

    // do simple
    let newProducts = this.state.products.map((p, k) => {
      let pData = p.node.frontmatter;
      if (pData.id === product.id) {
        if (!pData.checkbox.visible && count < 3) {
          count++;
          pData.checkbox.visible = 4;
        } else {
          pData.checkbox.visible = 0;
        }
      }
      return p;
    });

    // Reset the numbers to proper --> Can probably done waaaaay smarter
    count = 0;
    newProducts = newProducts.map((p, k) => {
      let pData = p.node.frontmatter;
      if (pData.checkbox.visible > 0) {
        count++;
        pData.checkbox.visible = count;
      }
      return p;
    });

    // Sort products
    newProducts = stableSort(newProducts, (a, b) => {
      if (a.node.frontmatter.checkbox.visible === 0) {
        return 1;
      } else if (b.node.frontmatter.checkbox.visible === 0) {
        return -1;
      } else if (
        a.node.frontmatter.checkbox.visible ===
        b.node.frontmatter.checkbox.visible
      ) {
        return null;
      } else if (true) {
        return a.node.frontmatter.checkbox.visible <
          b.node.frontmatter.checkbox.visible
          ? -1
          : 1;
      }
    });

    this.setState({
      products: newProducts,
    });
  };

  selectedProducts = () => {
    return this.state.products.filter((product) => {
      return product.node.frontmatter.checkbox.visible;
    });
  };

  countSelectedProducts = () => {
    return this.state.products.reduce((acc, p) => {
      p.node.frontmatter.checkbox.visible > 0 && acc++;
      return acc;
    }, 0);
  };

  interpolatePosition = (start, end, scrollHeight) => {
    if (typeof window !== "undefined") {
      let scrollY = window.scrollY;
      let point = start - (scrollY / scrollHeight) * (start - end);
      let edge = point > end ? point : end;
      return `${edge}rem`;
    } else {
      return undefined;
    }
  };

  scrollTriggers = () => {
    if (typeof window !== "undefined") {
      let scrollY = window.scrollY;
      let navbarElem = document.querySelector(".layout__navbar-container");
      let navbarPos = navbarElem ? navbarElem.offsetTop : 400;
      let navbarOffset = navbarPos - 130;

      if (window.innerWidth > 800) {
        return {
          header: this.state.scroll.position < 400 ? "large" : "small",
          nav: scrollY > navbarOffset,
        };
      } else {
        return {
          header: this.state.scroll.position < 400 ? "large" : "small",
          nav: scrollY > navbarOffset,
        };
      }
    } else {
      return {
        header: "large",
        nav: false,
      };
    }
  };

  handleScroll = (e) => {
    if (typeof window !== "undefined") {
      this.setState({
        scroll: {
          position: window.scrollY,
        },
      });
    }
  };

  componentDidMount() {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", this.handleScroll);
      window.addEventListener("resize", this.handleScroll);
    }
  }

  render() {
    let header = this.props.data.header.edges[0].node.frontmatter;
    let checkboxes = this.props.data.checkboxes.edges[0].node.frontmatter;
    let products = this.state.products;
    let initialProducts = this.state.initialProducts;
    let form = this.props.data.form.edges[0].node.frontmatter;
    let social = this.props.data.social.edges[0].node.frontmatter;
    let credits = this.props.data.credits.edges[0].node.frontmatter;
    return (
      <Layout>
        <div className="layout__page-container">
          <header
            data-size={this.scrollTriggers().header}
            className="layout__header-container"
          >
            <div className="layout__header">
              <div className="header__section">
                <h1 className="header__title">
                  {this.scrollTriggers().header === "large"
                    ? header.title
                    : header.titleSmall}
                </h1>
              </div>
              <img className="header__line" src={line} alt="" />
              <img className="header__line-short" src={lineShort} alt="" />
              <img className="header__line-hz" src={lineHz} alt="" />
              <div className="header__section">
                <h3 className="header__subtitle">
                  {this.scrollTriggers().header === "large"
                    ? header.subTitle
                    : header.subTitleSmall}
                </h3>
                <div className="header__meta-container">
                  <h4 className="header__author">
                    {header.author.prefix}
                    <a
                      rel="noopener noreferrer"
                      target="_blank"
                      href={header.author.link}
                    >
                      {header.author.name}
                    </a>
                  </h4>
                  <h4 className="header__contact">
                    <ScrollLink
                      rel="noopener noreferrer"
                      target="_blank"
                      to={header.contact.link}
                      smooth={true}
                      offset={-300}
                      duration={500}
                    >
                      {header.contact.title}
                    </ScrollLink>
                  </h4>
                </div>
              </div>
            </div>
          </header>

          <section className="layout__cta-container">
            <div className="layout__cta">
              <div className="cta__section__left">
                <img className="cta__title" src={ctaTitle} />
                <Button
                  type="large"
                  text="Go to book website"
                  link="https://www.bispublishers.com/if-you-dont.html"
                />
              </div>
              <div className="cta__section__right">
                <img className="cta__img" src={ctaImg} />
              </div>
            </div>
          </section>

          <div className="layout__products-container">
            <div className="layout__checkboxes-container">
              <div className="layout__checkboxes">
                <h1 className="checkboxes__title">{checkboxes.title}</h1>
                <h3 className="checkboxes__subtitle">{checkboxes.subtitle}</h3>
                <div className="checkboxes__container">
                  {initialProducts.map((product, key) => {
                    product = products.find((p) => {
                      return (
                        product.node.frontmatter.id === p.node.frontmatter.id
                      );
                    });
                    return (
                      <Checkbox
                        key={key}
                        product={product.node.frontmatter}
                        toggleProducts={this.toggleProducts}
                        disabled={
                          this.countSelectedProducts() > 2 &&
                          product.node.frontmatter.checkbox.visible < 1
                        }
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="layout__navbar-container">
              <div className="layout__navbar">
                {!this.scrollTriggers().nav &&
                  this.countSelectedProducts() > 0 && (
                    <Button
                      className="btn"
                      type="point"
                      text={checkboxes.footer}
                      link="layout__product"
                    />
                  )}
                {this.scrollTriggers().nav &&
                  this.selectedProducts().map((product, key) => {
                    return (
                      <NavItem
                        key={key}
                        product={product.node.frontmatter}
                        toggleProducts={this.toggleProducts}
                      />
                    );
                  })}
              </div>
            </div>

            {this.selectedProducts().map((product, key) => {
              let frontmatter = product.node.frontmatter;
              let diapositive = key === 1;
              return (
                <div
                  id={slugify(frontmatter.checkbox.title)}
                  key={frontmatter.id}
                  data-layout={frontmatter.layout}
                  data-diapositive={diapositive}
                  className="layout__product-container"
                >
                  <ProductImage
                    diapositive={diapositive}
                    images={frontmatter.images}
                    layout={frontmatter.layout}
                  />

                  <div className="layout__product">
                    <div className="product__content">
                      <div
                        className="markdown"
                        dangerouslySetInnerHTML={{
                          __html: product.node.html,
                        }}
                      />
                      {frontmatter.buttons.map((btn, key) => {
                        return (
                          <Button
                            text={btn.text}
                            link={btn.link}
                            key={key}
                            position={key}
                            diapositive={diapositive}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {this.selectedProducts() < 1 && (
            <div className="layout__line-container" />
          )}
          <Form data={form} />

          <div className="layout__social-container">
            <div className="layout__social">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={social.hashtag.link}
                className="social__hashtag"
              >
                <img
                  src={social.hashtag.image.relativePath}
                  alt="#ToDontList"
                  className="social__hashtag"
                />
              </a>
              <div className="social__text-container">
                <p className="social__text">{social.text[0].line}</p>
                <p className="social__text">{social.text[1].line}</p>
              </div>
              <div className="btn__container">
                {social.btn.map((btn, key) => {
                  return <Button {...btn} key={key} type="image" />;
                })}
                <div className="social__placeholder" />
              </div>
            </div>
          </div>
          <div className="layout__credits-container">
            <div className="layout__credits">
              <h1 className="credits__title">{credits.title}</h1>
              <div className="credits__text">
                <p>
                  {credits.authorsText}
                  {credits.authors.map((author, key) => {
                    if (author.link) {
                      return (
                        <span key={key}>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={author.link}
                          >
                            {author.name}
                          </a>
                          {", "}
                        </span>
                      );
                    } else {
                      return (
                        <span key={key}>
                          {author.name}
                          {key === credits.authors.length - 1 ? ", " : ", "}
                        </span>
                      );
                    }
                  })}
                  {credits.partnersText}
                  {credits.partners.map((partner, key) => {
                    if (partner.link) {
                      return (
                        <span key={key}>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={partner.link}
                          >
                            {partner.name}
                          </a>
                          {key === credits.partners.length - 1 ? ". " : ", "}
                        </span>
                      );
                    } else {
                      return (
                        <span key={key}>
                          {partner.name}
                          {key === credits.partners.length - 1 ? ". " : ", "}
                        </span>
                      );
                    }
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
        <script
          type="text/javascript"
          src="https://identity.netlify.com/v1/netlify-identity-widget.js"
        ></script>
      </Layout>
    );
  }
}

export const query = graphql`
  query productQuery {
    header: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "//content/frontpage/site/header.md/" }
      }
    ) {
      edges {
        node {
          frontmatter {
            title
            titleSmall
            subTitle
            subTitleSmall
            author {
              link
              name
              prefix
            }
            contact {
              title
              link
            }
          }
        }
      }
    }
    checkboxes: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "//content/frontpage/site/checkboxes.md/" }
      }
    ) {
      edges {
        node {
          frontmatter {
            title
            subtitle
            footer
          }
        }
      }
    }
    products: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "//content/frontpage/products/" } }
      sort: { order: ASC, fields: [frontmatter___id] }
    ) {
      edges {
        node {
          html
          frontmatter {
            id
            timeToRead
            checkbox {
              title
              text
              smallText
              visible
            }
            buttons {
              text
              link
            }
            images {
              default {
                childImageSharp {
                  gatsbyImageData(
                    width: 1920
                    placeholder: TRACED_SVG
                    formats: [AUTO, WEBP]
                  )
                }
              }
              diapositive {
                childImageSharp {
                  gatsbyImageData(
                    width: 1920
                    placeholder: TRACED_SVG
                    formats: [AUTO, WEBP]
                  )
                }
              }
            }
            layout
          }
        }
      }
    }
    form: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "//content/frontpage/site/form.md/" }
      }
    ) {
      edges {
        node {
          frontmatter {
            title
            fields {
              text
            }
            ccField
            submit
            submitResponse
            submitExpandedResponse
            mailTo
          }
        }
      }
    }
    social: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "//content/frontpage/site/social.md/" }
      }
    ) {
      edges {
        node {
          frontmatter {
            text {
              line
            }
            btn {
              text
              link
              images {
                normal {
                  relativePath
                }
                inverse {
                  relativePath
                }
              }
            }
            hashtag {
              link
              alt
              image {
                relativePath
              }
            }
          }
        }
      }
    }
    credits: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "//content/frontpage/site/credits.md/" }
      }
    ) {
      edges {
        node {
          frontmatter {
            title
            authorsText
            authors {
              name
              link
            }
            partnersText
            partners {
              name
              link
            }
          }
          html
        }
      }
    }
  }
`;
