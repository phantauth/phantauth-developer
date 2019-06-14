import React from 'react'

import '../../static/bootstrap-phantauth.min.css';
import {meta} from './meta';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

const _meta = meta();

class Header extends React.Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <>{ _meta.domain == "phantauth.net" ? (<span></span>) : (
        <div id="sandbox" className="sandbox bg-warning text-center" role="alert" aria-live="assertive" aria-atomic="true">
        <div className="small">You are viewing the PhantAuth <b>Sandbox</b>!</div>
        </div>)
      }
      <Navbar color="primary" expand="lg" dark sticky="top">
        <NavbarBrand href="/"><img src="/logo/phantauth-logo-white.svg" className="logo"/>&nbsp;{this.props.siteTitle}</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/api">API</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/uptime">Uptime</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/feedback">Feedback</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://spectrum.chat/phantauth">Community</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
      </Navbar>
      </>
    );
  }
}

export default Header
