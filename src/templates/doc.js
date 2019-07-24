import React, { Component } from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout'
import SEO from '../components/seo'
import Helmet from 'react-helmet';
import {meta} from '../components/meta';

const _meta = meta();

function domain(str) {
  return str.replace(/phantauth.net/g, _meta.domain);
}

class SideBar extends Component {
  render() {
    return (
      <aside className="sidebar"><div className="sidebar-nav sticky-top">
          {
            this.props.nodes.map(node =>
              (node.frontmatter.path == this.props.page.frontmatter.path ) ?
                 <div>
                   <div><a href={node.frontmatter.path}>{node.frontmatter.title}</a></div>
                   <div dangerouslySetInnerHTML={{ __html: domain(this.props.page.tableOfContents) }}/>
                 </div> :
                 <div><a href={node.frontmatter.path}>{node.frontmatter.title}</a></div>
              )
          }
        </div>
      </aside>
    );
  }
}

class Template extends Component {
  render() {
    const { markdownRemark: page } = this.props.data;
    const { allMarkdownRemark: all } = this.props.data;
    return (
      <Layout>
      <SEO title={page.frontmatter.title} />
      <Helmet>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/docsify-themeable@0/dist/css/theme-simple.css"/>
      </Helmet>
      <main className="sticky">
          <SideBar nodes = {all.nodes} page = {page}/>
          <section className="content"><article className="markdown-section" dangerouslySetInnerHTML={{ __html: domain(page.html) }} /></section>
      </main>
      </Layout>
    );
  }
}

export default Template
export const pageQuery = graphql`
  query DocsByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
      }
      tableOfContents(heading: "", maxDepth: 2, pathToSlugField: "frontmatter.path")
    }
    allMarkdownRemark(sort: { order: ASC, fields: [frontmatter___index] }) {
      nodes {
        frontmatter {
          title
          path
        }
      }
    }    
  }
`
