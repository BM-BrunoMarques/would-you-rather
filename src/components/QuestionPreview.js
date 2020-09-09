import React, { Component } from 'react';
import 'react-tabs/style/react-tabs.css';
import { connect } from 'react-redux'

class QuestionPreview extends Component {

  render() {
    console.log(this.props)
    const {question, author, id} = this.props
    console .log('here', question, author)

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
              ...{question.optionOne.text.slice(0,15)}...
              
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
