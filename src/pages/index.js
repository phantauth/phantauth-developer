import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Layout from '../components/layout'
import SEO from '../components/seo'
import {Integration, Generator, Sample, Domain, Donate} from '../components/showcase';
import {meta} from '../components/meta';

import {
  Col, Row, Card, CardTitle, CardText, Jumbotron, CardDeck
} from 'reactstrap'

const _meta = meta();

function site(name, path) {
  return "https://" + name + "." + _meta.domain + path;
}

function domain(path) {
  return "https://" + _meta.domain + path;
}


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
      <p className="lead">PhantAuth was designed to simplify testing for applications using OpenID Connect authentication by making use of random generated users.</p>    </Jumbotron>
    <FeatureList>
      <Feature icon="/icon/openid.svg" title="OpenID Connect Provider" >
        <p>
          The OpenID Connect Provider of PhantAuth supports the flows listed in the OpenID Connect specifications (Hybrid, Implicit, Authorization Code), as well as the Resource Owner Password grant type, specified in the OAuth 2.0 specifications. PhantAuth as an OpenID Connect Provider can be integrated with a variety of web applications, mobil applications, and  backend applications. The integration can be either direct, as in the case of the OpenID Connect Provider, or through an authentication integration service, as in the case of Auth0 or Azure Active Directory B2C. To learn more, please go to chapter <a href="/doc/integration">Integration</a>.
        </p>
        Examples:
        <Integration/>
        <p>
          Every library/framework with OpenID Connect support will also support PhantAuth with some configuration parameters (e.g. authorization URL, token URL). Some of them directly support PhantAuth, without the above mentioned parameters.
          To check frameworks directly support PhantAuth, please go to chapter <a href="/doc/integration#framework-support">Framework Support</a>.
        </p>
      </Feature>
      <Feature icon="/icon/random-profile.svg" title="Random User Generator">
        <p>
        The random user generator of PhantAuth can also be used separately, independent of the OpenID Connect Provider. You can generate an optional number of test users. In the knowledge of their user name, the data of the generated users can be regenerated at any time (OpenID Connect <em>sub</em> claim). The generated users have a unique, operational, disposable email address, a profile picture selected from one of the multiple pools of pictures, and the usual profile data. Custom email addresses and profile pictures may also be added. The random user generator of PhantAuth can be fully customized. Additionally, you can link an external generator to the application. For details,please go to chapter <a href="/doc/generator">Generator</a>.
        </p>
        Examples:
        <Generator/>
      </Feature>
      </FeatureList>
      <FeatureList>
      <Feature icon="/logo/phantauth-shared.svg" title="Customizable Tenants">
        <p>
        The PhantAuth is extremely versatile and customizable. You can use your own random user service, or generate users from an external .csv file or Google Sheet. You can use a set of Bootstrap themes to tailor the look and feel of the profile, morover, you can fundamentally change the same look and feel by the use of your own HTML templates. To find out more, please go to chapter <a href="/doc/tenant">Tenant</a>.
        </p>
        <p>
        To customize the application, you need to use one or more so-called tenants. A tenant can be consiered as an independent PhantAuth service. A tenant has its own random user generator endpoints and OpenID Connect endpoints.
        </p>
        <p>
        The tenants can be organised into so-called domains. Practically, a domain is a DNS zone, which contains the settings of the given tenant(s). The tenants as well as the domain can be configured by the use of DNS TXT records.
        </p>
        <p>
        In addition to the default tenant, the PhantAuth domain contains some sample tenants, which are primarily designed to demonstrate customizability, a range of hosting possibilities, and the links to external services. In most cases, using the <a href={ domain("/") }>default tenant</a> is enough.
        </p>
        <p>
        Anyone can create the domain and the tenants. Sharing the tenants is facilitated by the <a href={ site("shared", "/")}>PhantAuth Shared Domain</a>. A shared domain is connected to the <a href="http://phantauth.cf">phantuath.cf</a> DNS zone, in which anyone can create tenant configuration nodes by the use of the <a href="https://freedns.afraid.org/">FreeDNS</a> service.
        </p>
        <Domain/>
      </Feature>
      </FeatureList>
      <FeatureList>
      <Feature icon="/icon/codesandbox.svg" title="CodeSandbox Samples">
        <p>
        The use of the random user generator and the direct integration of  the OpenID Connect is demonstrated through a set of CodeSandbox samples. The sample applications are run directly from CodeSandbox, so the source code is easy to view, edit, and test.
        </p>
        <Sample/>
      </Feature>
      <Feature icon="/icon/donate.svg" title="Pricing">
        <p>
        PhantAuth is a free <a href="https://github.com/phantauth">open-source</a> non-profit application. If you find this service useful and can afford, please make a small donation as a contribution to the operation costs (domain registration, service hosting, etc.)
        </p>
        <Donate/>
      </Feature>
    </FeatureList>
  </Layout>
)

export default IndexPage
