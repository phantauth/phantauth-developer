import React from 'react'

import { Card, CardBody, CardTitle, CardSubtitle, Button, Row, Col } from 'reactstrap';

import axios from "axios"

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
              <img src={`${user.picture}`} className="rounded-circle p-1" style={{ width: '3.8rem', height: '3.8rem' }} ></img>
              <div className="media-body">
                <h6 className="m-0 mt-1">{`${user.name}`}</h6>
                <div className="small">
                  <tt className="text-muted">username:&nbsp;</tt><span>{`${user.sub}`}</span><br/>
                  <tt className="text-muted">password:&nbsp;</tt><span>{`${user.password}`}</span>
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
            <UserButton url="https://phantauth.ga/user" />&nbsp;
          </Col>
          <Col>
            <UserButton url="https://phantauth.ga/_sketch/user/%3bsketch" />&nbsp;
          </Col>
          <Col>
            <UserButton url="https://phantauth.ga/_gods/user/" />&nbsp;
          </Col>
        </Row>
        <Row>
          <Col>
            <UserButton url="https://phantauth.ga/_faker/user" />&nbsp;
          </Col>
          <Col>
            <UserButton url="https://phantauth.ga/_chance/user" />&nbsp;
          </Col>
          <Col>
            <UserButton url="https://phantauth.ga/_casual/user" />&nbsp;
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
          <Col>
          <AuthButton href="/test/azure" icon="/icon/azure-ad.svg" title="Azure AD B2C">
              <span class="small">Azure&nbsp;Active&nbsp;Directoy&nbsp;B2C demo</span>
          </AuthButton>&nbsp;
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
            <DomainButton href="https://phantauth.ga/_" icon="/logo/phantauth-logo.svg" title="PhantAuth Domain">
              <span class="small">Collection of ready to use PhantAuth Tenants</span>
            </DomainButton>&nbsp;
          </Col>
          <Col>
          <DomainButton href="https://shared.phantauth.ga" icon="/logo/phantauth-shared.svg" title="PhantAuth Shared">
              <span class="small">Free, shared DNS domain for custom PhantAuth tenants</span>
          </DomainButton>&nbsp;
          </Col>
        </Row>
      </div>
    );
  }
}


export {Integration, Generator, Domain}
