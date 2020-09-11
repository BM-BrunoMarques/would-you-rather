import React, { Component } from 'react';
import { connect } from 'react-redux'
import { handleSetAuthedUser } from '../actions/authedUser'

class LoginPage extends Component {

  state={
    user:''
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const {dispatch} = this.props
    dispatch(handleSetAuthedUser(this.state.user))
  }

  selectChange = (e) => {
    console.log(e.target.value)
    this.setState({
      user: e.target.value
    })
  }

  render() {
    const { users } = this.props
    const {user} = this.state
    let disabled = user === ''
    return (
      <div className='logIn'>
        <div className='header'>
          <h4>Welcome to the Would You Rather App!</h4>
          <p>Please sign in to continue</p>
        </div>
        <div className='logo'><img alt='avatar' src='https://miro.medium.com/max/700/1*meCFnZ5MK_7Fu1ogYfBvNQ.png' /></div>
        <div>
          <span> Sign In </span>
          <form onSubmit={this.handleSubmit}>
            <div className="radio">
              <label>
                <select name='user' value={this.state.user} onChange={this.selectChange}>
                      <option disabled value=''> Select a user </option>
                  {Object.keys(users).map((u) => (
                      <option value={u} key={u}> {users[u].name}</option>
                  ))}
                </select>
              </label>
            </div>
            <button disabled={disabled === true} onClick={this.handleSubmit}>Log In</button>
          </form>
          </div>
        </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps)(LoginPage)
