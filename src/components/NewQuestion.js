import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import {handleSaveQuestionNew} from '../actions/shared'

class NewQuestion extends Component {
  state = {
    optionOne: '',
    optionTwo: ''
  }


  inputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { dispatch } = this.props
    const {optionOne, optionTwo} = this.state

    const question = {
      optionOneText:optionOne,
      optionTwoText:optionTwo,
    }

    dispatch(handleSaveQuestionNew(question))
  }

  render() {
    const {optionOne, optionTwo} = this.state
    let disabled = [optionOne, optionTwo].includes('')
    return (
      <div className='newQuestion'>
        <div className='header'>
          Create New Question
        </div>
        <div className='container'>
          Complete the question:
          <h3>Would you rather...</h3>
          <form onSubmit={this.handleSubmit}>
            <div className="radio">
              <label>
                <input type="text" name='optionOne' value={this.state.optionOne} onChange={this.inputChange} />
              </label>
            </div>
            <h2>OR</h2>
            <div className="radio">
              <label>
                <input type="text" name='optionTwo' value={this.state.optionTwo} onChange={this.inputChange} />
              </label>
            </div>
            <button disabled={disabled === true} onClick={this.handleSubmit}>Submit</button>
          </form>

        </div>
      </div>
    )
  }
}

function mapStateToProps (state, props) {
  return {
  }
}

export default connect(mapStateToProps)(NewQuestion)
