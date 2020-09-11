import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { Nav, Navbar, NavbarBrand, NavLink } from "reactstrap";
import { handleUnsetAuthedUser } from '../actions/authedUser'

class NavMenuBar extends Component {

  handleLogOut = (e) => {
    const {dispatch} = this.props
    dispatch(handleUnsetAuthedUser())
  }

  render() {
    const {authUser} = this.props

    return (
      <div className='NavMenu'>

        <Navbar bg="light" variant="light">
          <Nav className="menus">
            <NavbarBrand tag={Link} to="/"> Home </NavbarBrand>
            <NavLink tag={Link} to='/add'> NewQuestion </NavLink>
            <NavLink tag={Link} to='/leaderboard'> LeaderBoard </NavLink>
          </Nav>
          {authUser && (
            <Nav className="profile">
              <span>Hello, {authUser.name}</span>
              <div className='avatar'><img alt='avatar' src={authUser.avatarURL} /></div>
              <NavLink onClick={this.handleLogOut} tag={Link} to='#'> Log Out </NavLink>
            </Nav>)
          }
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
