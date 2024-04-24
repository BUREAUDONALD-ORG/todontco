import React from "react";
import Helmet from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

import "../styles/app.scss";

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query layoutQuery {
      head: allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "//content/frontpage/site/head.md/" }
        }
      ) {
        edges {
          node {
            frontmatter {
              title
              tags {
                tagName
              }
              description
              openGraphImage {
                relativePath
              }
            }
          }
        }
      }
    }
  `);

  let head = data.head.edges[0].node.frontmatter;

  return (
    <div className="layout__wrapper">
      <Helmet
        title={head.title}
        meta={[
          {
            name: "keywords",
            content: head.tags
              .map((tag) => {
                return tag.tagName;
              })
              .join(", "),
          },
          {
            name: "description",
            content: head.description,
          },
          {
            name: "title",
            property: "og:title",
            content: head.title,
          },
          {
            name: "image",
            property: "og:image",
            content: "https://todont.co/" + head.openGraphImage.relativePath,
          },
          {
            name: "description",
            property: "og:description",
            content: head.description,
          },
        ]}
        link={[
          {
            rel: "icon",
            type: "image/png",
            href: "img/favicon.png",
          },
        ]}
      />
      <div className="layout__app">{children}</div>
    </div>
  );
};

export default Layout;
