import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

class QuestionPreview extends Component {

  render() {
    const {question, author, id} = this.props

    return (
      <div className='preview container'>
        <div className='header'>
          {author.name} asks:
        </div>
        <div>
          <div>
            <img src={author.avatarURL} />
          </div>
          <div>
            <div>
              <h2>Would you rather</h2>
              ...{question.optionOne.text.slice(0,14)}...
              <Link to={`/question/${id}`} >
                <button> View Poll </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


function mapStateToProps (state, {id}) {
  return {
    question: state.questions[id],
    author: state.users[state.questions[id].author]
  }
}



export default connect(mapStateToProps)(QuestionPreview)
