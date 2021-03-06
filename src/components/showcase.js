import React from 'react'

import { Card, CardBody, CardTitle, CardSubtitle, Button, Row, Col } from 'reactstrap';

import axios from "axios"

import { meta } from './meta';

const _meta = meta();

function service(path) {
  return _meta.serviceUri + path;
}

function site(name, path) {
  return "https://" + name + "." + _meta.domain + path;
}

class UserButton extends React.Component {
  state = { loading: false, error: false, user: {} }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.fetch();
  }

  render() {
    const user = this.state.user

    return (
      <>
        {this.state.loading || this.state.error ? (<span></span>) : (
          <a role="button" className="nav-link p-0 border rounded border-primary" href={`${user.profile}`}>
            <div className="media">
              <img src={`${user.picture || 'icon/empty.png'}`} className="rounded-circle p-1" style={{ width: '3.8rem', height: '3.8rem' }} ></img>
              <div className="media-body">
                <h6 className="m-0 mt-1">{`${user.name || ''}`}</h6>
                <div className="small">
                  <tt className="text-muted">username:&nbsp;</tt><span>{`${user.sub || ''}`}</span><br/>
                  <tt className="text-muted">password:&nbsp;</tt><span>{`${user.password || ''}`}</span>
                </div>

              </div>
            </div>
          </a>
        )}
      </>
    )
  }

  fetch() {
    this.setState({ loading: true })
    axios.get(this.props.url)
      .then(res => {
        const user = res.data
        this.setState({
          loading: false, user: user
        })
      })
      .catch(error => {
        this.setState({ loading: false, error })
      })
  }
}

class Generator extends React.Component {
  render() {
    return (
      <div className="mt-3">
        <Row>
          <Col>
            <UserButton url={ service("/user/sarah.connor") } />&nbsp;
          </Col>
          <Col>
            <UserButton url={ service("/_sketch/user/harry.potter%3bsketch") } />&nbsp;
          </Col>
          <Col>
            <UserButton url={ service("/_gods/user/zeus") } />&nbsp;
          </Col>
        </Row>
        <Row>
          <Col>
            <UserButton url={ service("/_faker/user/jim") } />&nbsp;
          </Col>
          <Col>
            <UserButton url={ service("/_chance/user/julia") } />&nbsp;
          </Col>
          <Col>
            <UserButton url={ service("/_casual/user/~james") } />&nbsp;
          </Col>
        </Row>
      </div>
    );
  }
}

const AuthButton = ({ icon, title, href, children }) => (
  <a role="button" className="nav-link p-0 border rounded border-primary" href={href}>
    <div className="media">
      <img src={icon} className="p-1" style={{ width: '3.8rem', height: '3.8rem' }} ></img>
      <div className="media-body">
        <h6 className="m-0 mt-2">{title}</h6>
          {children}
      </div>
    </div>
  </a>
)

class Integration extends React.Component {
  render() {
    return (
      <div className="mt-3">
        <Row>
          <Col>
            <AuthButton href="/test/oidc" icon="/icon/openid.svg" title="OpenID Connect">
              <span class="small">Direct&nbsp;OpenID&nbsp;Connect demo</span>
            </AuthButton>&nbsp;
          </Col>
          <Col>
          <AuthButton href="/test/auth0" icon="/icon/auth0.svg" title="Auth0">
              <span class="small">Auth0&nbsp;Social&nbsp;Connections demo</span>
          </AuthButton>&nbsp;
          </Col>
        </Row>
        <Row>
          <Col>
          <AuthButton href="/test/azure" icon="/icon/azure-ad.svg" title="Azure AD B2C">
              <span class="small">Azure&nbsp;Active&nbsp;Directoy&nbsp;B2C demo</span>
          </AuthButton>&nbsp;
          </Col>
          <Col>
            <AuthButton href="/test/okta" icon="/icon/okta.svg" title="Okta">
              <span class="small">Okta&nbsp;OpenID&nbsp;Connect demo</span>
            </AuthButton>&nbsp;
          </Col>
        </Row>
      </div>
    );
  }
}

const SampleButton = ({ icon, title, href, children }) => (
  <a role="button" className="nav-link p-0 border rounded border-primary" href={href}>
    <div className="media">
      <img src={icon} className="p-1" style={{ width: '3.8rem', height: '3.8rem' }} ></img>
      <div className="media-body">
        <h6 className="m-0 mt-2">{title}</h6>
          {children}
      </div>
    </div>
  </a>
)

class Sample extends React.Component {
  render() {
    return (
      <div className="mt-3">
        <Row>
          <Col>
            <SampleButton href="https://4xyj8lw394.codesandbox.io/" icon="/icon/persona.svg" title="User Example">
              <span class="small">Sample user service usage.</span>
            </SampleButton>&nbsp;
          </Col>
          <Col>
          <SampleButton href="https://8z77681269.codesandbox.io/" icon="/icon/openid.svg" title="OIDC Example">
              <span class="small">Sample OpenID Connect login.</span>
          </SampleButton>&nbsp;
          </Col>
        </Row>
        <Row>
          <Col>
          <SampleButton href="https://phantauth-sample-passport.now.sh/" icon="/icon/passportjs.svg" title="Passport Example">
              <span class="small">Sample Passport login.</span>
          </SampleButton>&nbsp;
          </Col>
          <Col>
          <SampleButton href="https://phantauth-sample.back4app.io/" icon="/icon/parse.svg" title="Parse Server Example">
              <span class="small">Sample Parse Server login.</span>
          </SampleButton>&nbsp;
          </Col>
        </Row>
      </div>
    );
  }
}

const DomainButton = ({ icon, title, href, children }) => (
  <a role="button" className="nav-link p-0 border rounded border-primary" href={href}>
    <div className="media">
      <img src={icon} className="p-1" style={{ width: '3.8rem', height: '3.8rem' }} ></img>
      <div className="media-body">
        <h6 className="m-0 mt-2">{title}</h6>
          {children}
      </div>
    </div>
  </a>
)
 
  
class Domain extends React.Component {
  render() {
    return (
      <div className="mt-3">
        <Row>
          <Col>
            <DomainButton href={service("/_")} icon="/logo/phantauth-logo.svg" title="PhantAuth Domain">
              <span class="small">Collection of ready to use tenants</span>
            </DomainButton>&nbsp;
          </Col>
          <Col>
          <DomainButton href={ site("shared", "/") } icon="/logo/phantauth-shared.svg" title="PhantAuth Shared">
              <span class="small">Free, shared DNS domain for tenants</span>
          </DomainButton>&nbsp;
          </Col>
        </Row>
      </div>
    );
  }
}

const DonateButton = ({ icon, title, href, children }) => (
  <a role="button" className="nav-link p-0 border rounded border-primary" href={href}>
    <div className="media">
      <img src={icon} className="p-1" style={{ width: '3.8rem', height: '3.8rem' }} ></img>
      <div className="media-body">
        <h6 className="m-0 mt-2">{title}</h6>
          {children}
      </div>
    </div>
  </a>
)
 
  
class Donate extends React.Component {
  render() {
    return (
      <div className="mt-3">
        <Row>
          <Col>
            <DonateButton href="https://ko-fi.com/Q5Q0T7C7" icon="/icon/kofi.png" title="Ko-fi">
              <span class="small">Donate PhantAuth on Ko-fi</span>
            </DonateButton>&nbsp;
          </Col>
          <Col>
            <DonateButton href="https://liberapay.com/szkiba/donate" icon="/icon/liberapay.svg" title="Liberapay">
              <span class="small">Donate PhantAuth on Liberapay</span>
            </DonateButton>&nbsp;
          </Col>
          <Col>
            <DonateButton href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=VXLCJ3EZRAE7G&source=url" icon="/icon/paypal.svg" title="PayPal">
              <span class="small">Donate PhantAuth on PayPal</span>
            </DonateButton>&nbsp;
          </Col>
        </Row>
      </div>
    );
  }
}

export {Integration, Generator, Sample, Domain, Donate}
