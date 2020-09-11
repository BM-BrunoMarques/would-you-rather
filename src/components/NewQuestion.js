import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import {handleSaveQuestionNew} from '../actions/shared'
import { Redirect } from 'react-router-dom'

class NewQuestion extends Component {
  state = {
    optionOne: '',
    optionTwo: '',
    toHome: false,
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

    this.setState({
      optionOne: '',
      optionTwo: '',
      toHome: true
    })

  }

  render() {
    const {optionOne, optionTwo, toHome} = this.state
    let disabled = [optionOne, optionTwo].includes('')

    if (toHome === true) {
      return <Redirect to='/' />
    }

    return (
      <div className='wrap'>
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
                  <input type="text" placeholder='Enter Option One Text Here...' name='optionOne' value={this.state.optionOne} onChange={this.inputChange} />
                </label>
              </div>
              <h2>OR</h2>
              <div className="radio">
                <label>
                  <input type="text" placeholder='Enter Option Two Text Here...' name='optionTwo' value={this.state.optionTwo} onChange={this.inputChange} />
                </label>
              </div>
              <button disabled={disabled === true} onClick={this.handleSubmit}>Submit</button>
            </form>

          </div>
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
