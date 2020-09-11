import React, { Component } from 'react'
import { connect } from 'react-redux'

class LeaderBoard extends Component {

  render() {
    const {users} = this.props
    return (
      <div className='leaderBoard'>
        <div className='wrap'>
        {users.map((user) => (
        <div key={user.id} className='ranks'>
          <div className='avatar'>
            <img alt='avatar' src={user.avatarURL} />
          </div>
          <div className='container'>
            <div className='left'>
              <div className='name'>
                <h2>{user.name}</h2>
              </div>
              <div className='details'>
                <p className='first'>Answered questions <span>{Object.keys(user.answers).length}</span></p>
                <p>Created questions <span>{user.questions.length}</span></p>
              </div>
            </div>
            <div className='right'>
              <span><h3 className='header'>Score</h3></span>
              <span className='score'> {Object.keys(user.answers).length + user.questions.length} </span>
            </div>
          </div>
        </div>
        ))}
        </div>
      </div>
    )
  }
}

function mapStateToProps ({users}) {
  const score = u =>
    u.questions.length + Object.keys(u.answers).length;

  return {
    users: Object.values(users).sort((a, b) => score(b) - score(a))
  }
}

export default connect(mapStateToProps)(LeaderBoard)
