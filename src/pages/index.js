import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Layout from '../components/layout'
import SEO from '../components/seo'
import {Integration, Generator, Sample, Domain, Donate} from '../components/showcase';

import {
  Col, Row, Card, CardTitle, CardText, Jumbotron, CardDeck
} from 'reactstrap'

const Feature = ({ icon, title, children }) => (
  <>
  <Card body className="noborder">
    <CardTitle className="h5"><img src={icon} style={{ width: "5rem" }}/> &nbsp;{title}</CardTitle>
    <CardText>
      {children}
    </CardText>
  </Card>
  <div class="w-100 d-none d-lg-block d-md-block d-sm-block d-xl-none"></div>
  </>
)

Feature.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
}

const FeatureList = ({ children }) => (
  <div className="features">
    <CardDeck>
      {children}
    </CardDeck>
  </div>
)

FeatureList.propTypes = {
  children: PropTypes.node.isRequired,
}

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`PhantAuth`, `OpenID Connect`, `Random User`]} />
    <Jumbotron className="no-background">
      <h1 className="display-6"><img src="/logo/phantauth-logo.svg"></img>PhantAuth</h1>
      <p className="lead">Random&nbsp;User&nbsp;Generator + OpenID&nbsp;Connect&nbsp;Provider</p>
      <p>Like Lorem Ipsum, but for user accounts and authentication.</p>
    </Jumbotron>
    <FeatureList>
      <Feature icon="/icon/openid.svg" title="OpenID Connect Provider" >
        <p>
        OpenID Connect identity provider for random generated users. You can integrate PhantAuth as standard OpenID Connect provider
        to any web site or mobile application.
        </p>
        Examples:
        <Integration/>
      </Feature>
      <Feature icon="/icon/random-profile.svg" title="Random User Generator">
        <p>
        Generate unlimited number of test users. Generated users will have a unique, working disposable email address.
        Alternatively you can specify real email address as well.
        </p>
        Examples:
        <Generator/>
      </Feature>
      </FeatureList>
      <FeatureList>
      <Feature icon="/icon/codesandbox.svg" title="CodeSandbox Samples">
        <p>
        Samples are runs directly from CodeSandbox so can view/edit/run the sample code on CodeSandbox.
        </p>
        <Sample/>
      </Feature>
      <Feature icon="/logo/phantauth-shared.svg" title="Customizable Tenants">
        <p>
        PhantAuth customizable using tenants. Each tenant works as an independent service.
        </p>
        <Domain/>
      </Feature>
      </FeatureList>
      <FeatureList>
      <Feature icon="/icon/donate.svg" title="Pricing">
        <p>
        PhantAuth is free, opensource, non-profit service.
        </p>
        <Donate/>
      </Feature>
    </FeatureList>
  </Layout>
)

export default IndexPage
