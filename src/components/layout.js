import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import Header from './header'
import '../../static/bootstrap-phantauth.min.css';
import './layout.css'

import {Container} from 'reactstrap'

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Header siteTitle={data.site.siteMetadata.title} />
        <Container fluid>
          {children}
        </Container>
        <script src="https://embed.small.chat/THA6J1QSJGH31C4J9F.js" async></script>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
