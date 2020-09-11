import React, { Component, Fragment } from 'react';
import { Link , withRouter} from "react-router-dom";
import { connect } from 'react-redux'
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from "reactstrap";

class NavMenuBar extends Component {

  render() {
    const {authUser} = this.props
    return (
      <div className='NavMenu'>

        <Navbar bg="light" variant="light">
          <Nav className="menus">
            <NavbarBrand tag={Link} to="/"> Home </NavbarBrand>
            <NavLink tag={Link} to='/NewQuestion'> NewQuestion </NavLink>
            <NavLink tag={Link} to='/LeaderBoard'> LeaderBoard </NavLink>
          </Nav>
          <Nav className="profile">
          <span>Hello, {authUser.name}</span>
          <div className='avatar'><img src={authUser.avatarURL} /></div>
          <NavLink onClick={this.handleLogOut} tag={Link} to='#'> Log Out </NavLink>
          </Nav>
        </Navbar>



      </div>
    )
  }
}

function mapStateToProps({users, authedUser}) {
  return {
    authUser: users[authedUser]
  }
}

export default connect(mapStateToProps)(NavMenuBar)
