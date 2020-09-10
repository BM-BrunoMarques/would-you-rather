import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleSaveAnswer } from '../actions/questions'
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
    const { Qid, author, question, authUser } = this.props
    const answered = Object.keys(authUser.answers).includes(Qid)

    return (
      <div className='questDetails'>
        <div className='header'>
          {answered === true
            ? `Asked by ${author.name}`
            : `${author.name} asks:`}
        </div>
        <div className='contains'>
          <div>
            <img src={author.avatarURL} />
          </div>
          <div>
            <div>
              <h2>Would you rather...</h2>

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
          </div>
        </div>
      </div>

    )
  }
}

function mapStateToProps (state, props) {
  const { id } = props.match.params

  return {
    Qid: id,
    question: state.questions[id],
    author: state.users[state.questions[id].author],
    authUser: state.users[state.authedUser]
  }
}

export default connect(mapStateToProps)(QuestionDetails)
