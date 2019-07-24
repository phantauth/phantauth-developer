const path = require('path');
exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;
  const docTemplate = path.resolve(`src/templates/doc.js`);
  return graphql(`{
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___title] }
        limit: 1000
      ) {
        edges {
          node {
            excerpt(pruneLength: 250)
            html
            tableOfContents(
              pathToSlugField: "frontmatter.path"
              maxDepth: 2
            )
            id
            frontmatter {
              path
              title
            }
          }
        }
      }
    }`)
    .then(result => {
      if (result.errors) {
        return Promise.reject(result.errors);
      }
      result.data.allMarkdownRemark.edges
        .forEach(({ node }) => {
          createPage({
            path: node.frontmatter.path,
            component: docTemplate,
            context: {}
          });
        });
    });
}
