import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleSaveAnswer } from '../actions/shared'
import { Link, withRouter } from 'react-router-dom'

class QuestionDetails extends Component {
  state = {
    selectedOption: ''
  }

  formSelected = (e) => {
    this.setState({
      selectedOption: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { Qid, dispatch } = this.props
    const answer = this.state.selectedOption

    dispatch(handleSaveAnswer(Qid, answer))
  }

  render() {
    console.log(this.props)
    const { Qid, author, question, authUser, answers, authAnswer, total, percent} = this.props
    const answered = Object.keys(authUser.answers).includes(Qid)

    return (
      <div className='wrap'>
        <div className='questDetails'>
        <div className='header'>
{answered === false
            ? `${author.name} asks:`
            : `Asked by ${author.name}`
}
        </div>
        <div className='contains'>
          <div className='avatar'>
            <img src={author.avatarURL} />
          </div>
          <div className='content'>
{answered === false
            ? <div>
                <h4>Would you rather...</h4>
                <form onSubmit={this.handleSubmit}>
                  <div className="radio">
                    <label>
                      <input type="radio" name="vote" value="optionOne" onChange={this.formSelected} />
                      {question.optionOne.text}
                    </label>
                  </div>
                  <div className="radio">
                    <label>
                      <input type="radio" name="vote" value="optionTwo" onChange={this.formSelected} />
                      {question.optionTwo.text}
                    </label>
                  </div>
                  <button disabled={this.state.selectedOption === ''} onClick={this.handleSubmit}>Submit</button>
                </form>
              </div>
            : <div>
                <h3>Results:</h3>
                {Object.keys(answers).map((k, ind) => (
                  <div key={k} className={authAnswer === k ? 'selected' : null}>
                    <p>Would you rather {answers[k].text}?</p>
                    <div className='pollbar'><div className='percent' style={{width: `${percent[ind].toFixed(0)}%`}}> <span>{percent[ind].toFixed(0)}%</span> </div></div>
                    {answers[k].votes.length} out of {total} Votes

                  </div>
                ))}
              </div>
}
          </div>
        </div>
        </div>
      </div>

    )
  }
}

function mapStateToProps (state, props) {
  const { id } = props.match.params
  const question = state.questions[id]
  const authUser = state.users[state.authedUser]

  const {optionOne, optionTwo} = question
  const answers = {optionOne, optionTwo}

  const total = optionOne.votes.length + optionTwo.votes.length;
  let percent = [optionOne.votes.length * 100 / total, optionTwo.votes.length * 100 / total]

  return {
    Qid: id,
    question,
    author: state.users[question.author],
    authUser,

    authAnswer: authUser.answers[id],
    answers,

    total,
    percent
  }
}

export default connect(mapStateToProps)(QuestionDetails)
